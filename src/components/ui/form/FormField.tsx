import { Box, Text, VisuallyHidden } from '@mantine/core';
import { cloneElement, isValidElement, useId, type ReactNode } from 'react';

type FormFieldProps = {
  id?: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export const FormField = ({ id, label, description, error, required, children }: FormFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const resolvedChild = isValidElement(children)
    ? cloneElement(children, {
        id: children.props.id ?? inputId,
        'aria-describedby': children.props['aria-describedby'] ?? describedBy,
        'aria-invalid': error ? true : children.props['aria-invalid']
      } as Record<string, unknown>)
    : children;

  return (
    <Box>
      <Text fw={600} size='sm' component='label' htmlFor={inputId}>
        {label}
        {required ? (
          <Text component='span' c='red'>
            {' '}
            *
          </Text>
        ) : null}
        {required ? <VisuallyHidden>required</VisuallyHidden> : null}
      </Text>
      {description && (
        <Text c='dimmed' size='xs' mb={4} id={descriptionId}>
          {description}
        </Text>
      )}
      {resolvedChild}
      {error && (
        <Text c='red' size='xs' mt={4} id={errorId}>
          {error}
        </Text>
      )}
    </Box>
  );
};
