import { Card, Group, Stack } from '@mantine/core';
import type { ReactNode } from 'react';

type FilterBarProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export const FilterBar = ({ left, right }: FilterBarProps) => {
  return (
    <Card withBorder radius='md' padding='sm'>
      <Stack gap='sm'>
        <Group justify='space-between' align='flex-start' wrap='wrap' gap='sm'>
          <Group gap='sm' align='flex-start'>
            {left}
          </Group>
          <Group gap='sm' align='flex-start'>
            {right}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};
