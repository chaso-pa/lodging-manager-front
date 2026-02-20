import { Group } from '@mantine/core';
import type { ReactNode } from 'react';

type RowActionsProps = {
  children: ReactNode;
};

export const RowActions = ({ children }: RowActionsProps) => {
  return (
    <Group gap='sm' wrap='wrap'>
      {children}
    </Group>
  );
};
