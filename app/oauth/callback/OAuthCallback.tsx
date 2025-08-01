'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      router.push('/todos');
    } else {
      console.error('accessToken not found in query params');
      router.push('/auth');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      로그인 처리 중...
    </div>
  );
}
