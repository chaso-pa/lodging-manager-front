import { Box, Text } from '@mantine/core';
import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export const FormField = ({ label, description, error, required, children }: FormFieldProps) => {
  return (
    <Box>
      <Text fw={600} size='sm'>
        {label}
        {required ? (
          <Text component='span' c='red'>
            {' '}
            *
          </Text>
        ) : null}
      </Text>
      {description && (
        <Text c='dimmed' size='xs' mb={4}>
          {description}
        </Text>
      )}
      {children}
      {error && (
        <Text c='red' size='xs' mt={4}>
          {error}
        </Text>
      )}
    </Box>
  );
};
