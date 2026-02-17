import { Box, Center, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  return (
    <Center py='xl'>
      <Stack align='center' gap='sm'>
        <ThemeIcon size={48} radius='xl' variant='light'>
          <Box>{icon ?? 'i'}</Box>
        </ThemeIcon>
        <Stack align='center' gap={4}>
          <Text fw={600}>{title}</Text>
          {description && (
            <Text c='dimmed' size='sm' ta='center'>
              {description}
            </Text>
          )}
        </Stack>
        {action && <Group>{action}</Group>}
      </Stack>
    </Center>
  );
};
