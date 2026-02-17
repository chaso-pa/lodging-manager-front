import { Divider, Group, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  right?: ReactNode;
};

export const PageHeader = ({ title, description, right }: PageHeaderProps) => {
  return (
    <Stack gap='sm' py='md'>
      <Group justify='space-between' align='flex-start' gap='md' wrap='wrap'>
        <Stack gap={4}>
          <Title order={2}>{title}</Title>
          {description && (
            <Text c='dimmed' size='sm'>
              {description}
            </Text>
          )}
        </Stack>
        {right && <Group gap='sm'>{right}</Group>}
      </Group>
      <Divider />
    </Stack>
  );
};
