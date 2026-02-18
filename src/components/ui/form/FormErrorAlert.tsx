import { Alert, Text } from '@mantine/core';

type FormErrorAlertProps = {
  title?: string;
  message?: string;
};

export const FormErrorAlert = ({
  title = '入力内容を確認してください',
  message
}: FormErrorAlertProps) => {
  if (!message) {
    return null;
  }

  return (
    <Alert color='red' radius='md' title={title}>
      <Text size='sm' c='dimmed'>
        {message}
      </Text>
    </Alert>
  );
};
