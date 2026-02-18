'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button, Center, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { FormShell } from '@/components/ui/form/FormShell';
import { FormField } from '@/components/ui/form/FormField';
import { SubmitBar } from '@/components/ui/form/SubmitBar';
import { FormErrorAlert } from '@/components/ui/form/FormErrorAlert';

const LoginPage = () => {
  const { login, loginWithGoogle, loading, user, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setSubmitting(true);
    setError(null);

    try {
      await logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (submitting) {
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Center h='100vh' px='md'>
      <FormShell title='Login' description='メールアドレスとパスワードでログインします。'>
        <Stack gap='md'>
          {user ? (
            <>
              <FormErrorAlert message={error ?? undefined} />
              <Text size='sm'>Already signed in as {user.email ?? 'unknown user'}.</Text>
              <Button onClick={handleLogout} loading={submitting} disabled={loading}>
                Logout
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack gap='sm'>
                <FormErrorAlert message={error ?? undefined} />
                <FormField label='Email' required>
                  <TextInput
                    type='email'
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    required
                    disabled={loading || submitting}
                  />
                </FormField>
                <FormField label='Password' required>
                  <PasswordInput
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    required
                    disabled={loading || submitting}
                  />
                </FormField>
                <SubmitBar submitLabel='Login' isSubmitting={submitting} disabled={loading} />
                <Button
                  type='button'
                  variant='light'
                  onClick={handleGoogleLogin}
                  loading={submitting}
                  disabled={loading}
                >
                  Continue with Google
                </Button>
              </Stack>
            </form>
          )}
        </Stack>
      </FormShell>
    </Center>
  );
};

export default LoginPage;
