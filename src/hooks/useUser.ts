import { useDocument } from '@nandorojo/swr-firestore';
import { useAuth } from './useAuth';

export function useUser() {
  const { user } = useAuth();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useDocument<any>(`users/${user?.uid}`, {
    listen: false,
  });

  return { userData, userLoading, userError };
}
