import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useDocument, Document } from '@nandorojo/swr-firestore';
import { useAuth } from './useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserDataProps } from '../types';

export function useDashboardUser() {
  const auth = useRequireAuth();
  const { user, signout } = useAuth();
  const router = useRouter();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useDocument<Document<UserDataProps>>(`users/${user?.uid}`, {
    listen: false,
  });

  useEffect(() => {
    if (user === false) {
      router.push('/auth/sign-in');
    }
  }, [user, router]);

  return { user, auth, userData, userLoading, userError, signout };
}
