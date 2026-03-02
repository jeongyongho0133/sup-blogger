'use client';

import { useState } from 'react';
import styles from './BottomSheet.module.css';

const BottomSheet = () => {
  const [isOpen, setIsOpen] = useState(true); // Default to open for demonstration

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.bottomSheet} ${isOpen ? styles.open : ''}`}>
      <div className={styles.handle} onClick={toggleSheet}></div>
      <div className={styles.content}>
        <h2>매물 정보</h2>
        <p>선택된 지역의 매물 목록 또는 요약 정보가 여기에 표시됩니다.</p>
        {/* Example list */}
        <ul>
          <li>아파트 A - 10억</li>
          <li>빌라 B - 5억</li>
          <li>오피스텔 C - 3억</li>
        </ul>
      </div>
    </div>
  );
};

export default BottomSheet;
