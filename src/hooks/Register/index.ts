import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { registerRequested } from 'store/auth/authSlice';

export function useRegister() {
  const dispatch = useDispatch();

  const onRegister = useCallback(
    async (values: any, actions: any) => {
      actions.setSubmitting(true);
      await dispatch(registerRequested(values));

      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
    },
    [dispatch]
  );

  return { onRegister };
}
