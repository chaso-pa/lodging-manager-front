import { Alert, Button, Group, Stack, Text } from '@mantine/core';

type ErrorStateProps = {
  title?: string;
  description?: string;
  retry?: () => void;
  backHref?: string;
};

export const ErrorState = ({
  title = 'エラーが発生しました',
  description,
  retry,
  backHref
}: ErrorStateProps) => {
  return (
    <Alert color='red' radius='md' title={title}>
      <Stack gap='sm'>
        {description && (
          <Text size='sm' c='dimmed'>
            {description}
          </Text>
        )}
        {(retry || backHref) && (
          <Group gap='sm'>
            {retry && (
              <Button size='xs' onClick={retry}>
                再試行
              </Button>
            )}
            {backHref && (
              <Button size='xs' variant='light' component='a' href={backHref}>
                戻る
              </Button>
            )}
          </Group>
        )}
      </Stack>
    </Alert>
  );
};
