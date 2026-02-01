'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button, Center, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useState } from 'react';

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
      <Paper w='100%' maw={420} p='xl' withBorder>
        <Stack gap='md'>
          <Title order={2}>Login</Title>
          {user ? (
            <>
              <Text size='sm'>Already signed in as {user.email ?? 'unknown user'}.</Text>
              <Button onClick={handleLogout} loading={submitting} disabled={loading}>
                Logout
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack gap='sm'>
                <TextInput
                  label='Email'
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  required
                  disabled={loading || submitting}
                />
                <PasswordInput
                  label='Password'
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  required
                  disabled={loading || submitting}
                />
                {error ? (
                  <Text size='sm' c='red'>
                    {error}
                  </Text>
                ) : null}
                <Button type='submit' loading={submitting} disabled={loading}>
                  Login
                </Button>
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
      </Paper>
    </Center>
  );
};

export default LoginPage;
