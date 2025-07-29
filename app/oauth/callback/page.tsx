import { Suspense } from 'react';
import OAuthCallback from './OAuthCallback';

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-white">로딩 중...</div>
      }
    >
      <OAuthCallback />
    </Suspense>
  );
}
