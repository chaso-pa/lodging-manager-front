import { notifications } from '@mantine/notifications';

const commonOptions = {
  position: 'top-right' as const,
  withCloseButton: true
};

export const notifySuccess = (title: string, message?: string) => {
  notifications.show({
    ...commonOptions,
    color: 'teal',
    title,
    message,
    autoClose: 2500
  });
};

export const notifyWarning = (title: string, message?: string) => {
  notifications.show({
    ...commonOptions,
    color: 'yellow',
    title,
    message,
    autoClose: 3500
  });
};

export const notifyError = (title: string, message?: string) => {
  notifications.show({
    ...commonOptions,
    color: 'red',
    title,
    message,
    autoClose: 6000
  });
};
