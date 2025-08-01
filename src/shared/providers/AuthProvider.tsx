'use client';

import { useAuthInterceptor } from '../lib/useAuthInterceptor';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthInterceptor();

  return <>{children}</>;
}
