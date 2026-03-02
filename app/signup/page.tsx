'use client';

import { useState } from 'react';
import Link from 'next/link'; // Link 컴포넌트를 import 합니다.
import styles from './signup.module.css';

export default function SignupPage() {
  const [userType, setUserType] = useState('user');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      <p className={styles.subtitle}>가입할 회원 유형을 선택해주세요.</p>
      
      <div className={styles.userTypeSelector}>
        <button 
          className={`${styles.userTypeButton} ${userType === 'user' ? styles.active : ''}`}
          onClick={() => setUserType('user')}
        >
          일반 회원
        </button>
        <button 
          className={`${styles.userTypeButton} ${userType === 'owner' ? styles.active : ''}`}
          onClick={() => setUserType('owner')}
        >
          소유주/임대인
        </button>
        <button 
          className={`${styles.userTypeButton} ${userType === 'agent' ? styles.active : ''}`}
          onClick={() => setUserType('agent')}
        >
          공인중개사
        </button>
      </div>

      {/* 각 회원 유형에 대한 설명과 가입 페이지로 이동하는 버튼을 추가합니다. */}
      <div className={styles.infoBox}>
        {userType === 'user' && (
          <div>
            <h2>일반 회원 가입</h2>
            <p>일반 회원으로 가입하여 서비스를 이용하세요.</p>
            <Link href="/register/user" className={styles.registrationButton}>
              일반 회원으로 가입하기
            </Link>
          </div>
        )}

        {userType === 'owner' && (
          <div>
            <h2>소유주/임대인 회원 가입</h2>
            <p>임대인으로 가입하여 매물을 직접 등록하고 관리하세요.</p>
            <Link href="/register/owner" className={styles.registrationButton}>
              소유주/임대인으로 가입하기
            </Link>
          </div>
        )}

        {userType === 'agent' && (
          <div>
            <h2>공인중개사 회원 가입</h2>
            <p>공인중개사로 가입하여 전문적인 중개 서비스를 제공하세요.</p>
            <Link href="/register/agent" className={styles.registrationButton}>
              공인중개사로 가입하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
