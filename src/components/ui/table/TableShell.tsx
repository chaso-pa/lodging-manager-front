import { Stack } from '@mantine/core';
import type { ReactNode } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';

type TableShellProps = {
  title: string;
  description?: string;
  right?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
};

export const TableShell = ({ title, description, right, filters, children }: TableShellProps) => {
  return (
    <Stack gap='md'>
      <PageHeader title={title} description={description} right={right} />
      {filters}
      {children}
    </Stack>
  );
};
