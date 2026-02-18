import { Group } from '@mantine/core';
import type { ReactNode } from 'react';

type RowActionsProps = {
  children: ReactNode;
};

export const RowActions = ({ children }: RowActionsProps) => {
  return <Group gap='xs'>{children}</Group>;
};
