import { Center, Group, Loader, Text } from '@mantine/core';

type LoadingStateProps = {
  variant?: 'page' | 'inline';
  text?: string;
};

export const LoadingState = ({ variant = 'page', text }: LoadingStateProps) => {
  if (variant === 'inline') {
    return (
      <Group gap='sm'>
        <Loader size='sm' />
        {text && <Text size='sm'>{text}</Text>}
      </Group>
    );
  }

  return (
    <Center py='xl'>
      <Group gap='sm'>
        <Loader size='sm' />
        {text && <Text size='sm'>{text}</Text>}
      </Group>
    </Center>
  );
};
