import { NextResponse } from 'next/server';

// Gemini Vision API 호출 함수
async function generateImageDescriptions(images: string[]): Promise<string[]> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Google Gemini API 키가 설정되지 않았습니다.');
  }

  const descriptions = [];
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;

  for (const base64Image of images) {
    const mimeType = base64Image.substring('data:'.length, base64Image.indexOf(';base64'));
    const imageData = base64Image.substring(base64Image.indexOf(',') + 1);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: "당신은 부동산 블로그 생성 어시스턴트입니다. 제공된 매물 사진을 객관적이고 사실적으로 묘사하세요. 감성적이거나 추측성 발언은 사용하지 마세요. 오직 보이는 것만 묘사하세요. 특징, 인테리어, 상태에 집중하세요. 서론 없이 바로 설명을 시작하세요. 예: '큰 창문이 있어 채광이 좋은 거실' 또는 '화이트톤의 깔끔한 주방'"
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageData
              }
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (response.ok && data.candidates && data.candidates[0].content.parts[0].text) {
        descriptions.push(data.candidates[0].content.parts[0].text.trim());
      } else {
        console.error('[GEMINI_API_RESPONSE_ERROR]', data);
        descriptions.push('이미지 설명을 생성하는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('[GEMINI_API_FETCH_ERROR]', error);
      descriptions.push('이미지 설명 생성 중 오류가 발생했습니다.');
    }
  }
  return descriptions;
}

export async function POST(request: Request) {
  try {
    const propertyData = await request.json();

    // 지도 생성 로직...
    let mapSection = `### 위치 정보\n\n**주소**: ${propertyData.address || '미제공'}`;
    if (process.env.KAKAO_MAPS_API_KEY && propertyData.address) {
      try {
        const geoResponse = await fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(propertyData.address)}`,
          { headers: { 'Authorization': `KakaoAK ${process.env.KAKAO_MAPS_API_KEY}` } }
        );
        const geoData = await geoResponse.json();
        if (geoData.documents && geoData.documents.length > 0) {
          const { x, y } = geoData.documents[0];
          const mapImageResponse = await fetch(
            `https://dapi.kakao.com/v2/staticmap?center=${x},${y}&level=4&marker=pos:${x},${y}&w=600&h=400`,
            { headers: { 'Authorization': `KakaoAK ${process.env.KAKAO_MAPS_API_KEY}` } }
          );
          if (mapImageResponse.ok) {
            const imageBuffer = await mapImageResponse.arrayBuffer();
            const base64Image = Buffer.from(imageBuffer).toString('base64');
            const imageMime = mapImageResponse.headers.get('Content-Type') || 'image/png';
            const dataUrl = `data:${imageMime};base64,${base64Image}`;
            mapSection = `### 위치 정보\n\n![매물 위치 지도](${dataUrl})\n\n**주소**: ${propertyData.address}`;
          }
        }
      } catch (mapError) {
        console.error('[KAKAO_MAP_API_ERROR]', mapError);
        mapSection += '\n\n*지도 생성 중 오류가 발생했습니다.*';
      }
    }

    // 이미지 설명 생성 로직
    let imagesSection = '\n### 매물 사진';
    if (process.env.GOOGLE_GEMINI_API_KEY && propertyData.images && propertyData.images.length > 0) {
        const descriptions = await generateImageDescriptions(propertyData.images);
        propertyData.images.forEach((imgBase64: string, index: number) => {
            imagesSection += `\n\n![매물 사진 ${index + 1}](${imgBase64})\n\n- ${descriptions[index] || '설명 생성 실패'}`;
        });
    } else {
        imagesSection += '\n\n*업로드된 사진이 없거나 이미지 분석을 위한 API 키가 설정되지 않았습니다.*';
    }

    const title = `
      ${propertyData.address || '미제공'} 인근 
      ${propertyData.propertyType || '미제공'} 
      ${propertyData.transactionType || '미제공'} 매물 정보
    `.replace(/\s+/g, ' ').trim();

    const body = `
${mapSection}

### 매물 기본 정보
- **거래 유형**: ${propertyData.transactionType || '미제공'}
- **매물 종류**: ${propertyData.propertyType || '미제공'}

### 가격 정보
- **매매가/보증금**: ${propertyData.price ? `${propertyData.price.toLocaleString()}원` : '미제공'}
- **월세**: ${propertyData.monthlyRent ? `${propertyData.monthlyRent.toLocaleString()}원` : '미제공'}

### 상세 스펙
- **공급/전용 면적**: ${propertyData.area?.supply && propertyData.area?.exclusive ? `${propertyData.area.supply}㎡ / ${propertyData.area.exclusive}㎡` : '미제공'}
- **층/총 층수**: ${propertyData.floor?.current && propertyData.floor?.total ? `${propertyData.floor.current}층 / ${propertyData.floor.total}층` : '미제공'}
- **방/욕실 수**: ${propertyData.rooms ? `${propertyData.rooms}개 / ${propertyData.bathrooms}개` : '미제공'}
- **주차 가능 여부**: ${propertyData.parking === undefined ? '미제공' : (propertyData.parking ? '가능' : '불가능')}
- **입주 가능일**: ${propertyData.moveInDate || '미제공'}

### 매물 상세 설명
${propertyData.description || '미제공'}

${imagesSection}
`;

    return NextResponse.json({ 
      success: true, 
      blogTitle: title,
      blogContent: body.trim(),
    });

  } catch (error) {
    console.error('[API_GENERATE_BLOG_ERROR]', error);
    return new NextResponse('블로그 생성 중 오류가 발생했습니다.', { status: 500 });
  }
}
