'use server';

import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { adminDb, adminStorage } from '@/lib/firebase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Property } from '@/types';

// Zod 스키마로 폼 데이터 유효성 검사 규칙 정의
const FormSchema = z.object({
  title: z.string().min(5, { message: "제목은 5자 이상 입력해야 합니다." }),
  propertyType: z.enum(['apartment', 'villa', 'house', 'officetel', 'store']),
  transactionType: z.enum(['sale', 'rent']),
  price: z.coerce.number().int().positive({ message: "매매가는 0보다 커야 합니다." }).optional(),
  deposit: z.coerce.number().int().nonnegative({ message: "보증금은 0 이상이어야 합니다." }).optional(),
  rent: z.coerce.number().int().nonnegative({ message: "월세는 0 이상이어야 합니다." }).optional(),
  area: z.coerce.number().positive({ message: "면적은 0보다 커야 합니다." }),
  bedrooms: z.coerce.number().int().nonnegative({ message: "침실 수는 0 이상이어야 합니다." }),
  bathrooms: z.coerce.number().int().nonnegative({ message: "욕실 수는 0 이상이어야 합니다." }),
  address: z.string().min(10, { message: "주소는 10자 이상 입력해야 합니다." }),
  description: z.string().min(20, { message: "상세 설명은 20자 이상 입력해야 합니다." }),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File))
    .min(1, "최소 1개 이상의 이미지를 업로드해야 합니다.")
    .refine((files: File[]) => files.every(file => file.size > 0), "유효하지 않은 파일이 포함되어 있습니다.")
});

// Zod 스키마로부터 필드 에러 타입을 추론하여 State 타입을 구체화
type FormFieldErrors = z.inferFlattenedErrors<typeof FormSchema>['fieldErrors'];

export type State = {
  errors?: FormFieldErrors & {
    _form?: string[];
  };
  message?: string | null;
};

// 이미지 파일을 Firebase Storage에 업로드하고 URL 배열을 반환하는 함수
async function uploadImages(images: File[]): Promise<string[]> {
  const imageUrls: string[] = [];
  if (images.length === 0) return imageUrls;

  const bucket = adminStorage.bucket();

  for (const image of images) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const randomString = Math.random().toString(36).substring(2);
    const filename = `properties/${Date.now()}-${randomString}-${image.name}`;
    const file = bucket.file(filename);

    await file.save(buffer, {
      metadata: { contentType: image.type },
    });
    
    imageUrls.push(file.publicUrl());
  }

  return imageUrls;
}

// 매물 생성을 위한 서버 액션
export async function createProperty(prevState: State, formData: FormData): Promise<State> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      message: '인증되지 않은 사용자입니다. 로그인이 필요합니다.',
      errors: { _form: ['로그인이 필요합니다.'] }
    };
  }
  const agentId = session.user.id;

  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    propertyType: formData.get('propertyType'),
    transactionType: formData.get('transactionType'),
    price: formData.get('price'),
    deposit: formData.get('deposit'),
    rent: formData.get('rent'),
    area: formData.get('area'),
    bedrooms: formData.get('bedrooms'),
    bathrooms: formData.get('bathrooms'),
    address: formData.get('address'),
    description: formData.get('description'),
    amenities: formData.getAll('amenities'),
    images: formData.getAll('images'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '입력 내용을 다시 확인해주세요.',
    };
  }

  const { images, ...data } = validatedFields.data;

  try {
    const imageUrls = await uploadImages(images);

    const newProperty: Omit<Property, 'id'> = {
      agentId,
      ...data,
      price: data.transactionType === 'sale' ? data.price ?? 0 : 0,
      deposit: data.transactionType === 'rent' ? data.deposit ?? 0 : 0,
      rent: data.transactionType === 'rent' ? data.rent ?? 0 : 0,
      images: imageUrls,
      amenities: data.amenities || [],
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await adminDb.collection('properties').add(newProperty);
    
    // 성공 후 관련 경로의 캐시를 무효화합니다.
    revalidatePath('/');
    revalidatePath('/my-properties');

  } catch (e) {
    console.error(e);
    return {
      message: '서버 오류가 발생하여 매물 등록에 실패했습니다. 잠시 후 다시 시도해주세요.',
      errors: { _form: ['데이터베이스 처리 중 오류가 발생했습니다.'] }
    };
  }

  // 성공 시, 홈페이지로 리디렉션합니다.
  redirect('/');
}
