import { Card, Container, Stack } from '@mantine/core';
import type { ReactNode } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';

type FormShellProps = {
  title: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
};

export const FormShell = ({ title, description, right, children }: FormShellProps) => {
  return (
    <Container size='sm'>
      <Stack gap='md'>
        <PageHeader title={title} description={description} right={right} />
        <Card withBorder radius='lg' padding='lg'>
          {children}
        </Card>
      </Stack>
    </Container>
  );
};
