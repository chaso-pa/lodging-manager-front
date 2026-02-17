import { Box, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export const Section = ({ children, title, description }: SectionProps) => {
  return (
    <Stack gap='md' py='md'>
      {(title || description) && (
        <Box>
          {title && <Title order={3}>{title}</Title>}
          {description && (
            <Text c='dimmed' size='sm'>
              {description}
            </Text>
          )}
        </Box>
      )}
      <Box>{children}</Box>
    </Stack>
  );
};
