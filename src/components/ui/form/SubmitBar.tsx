import { Button, Group } from '@mantine/core';

type SubmitBarProps = {
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
};

export const SubmitBar = ({
  submitLabel = '保存',
  cancelLabel = 'キャンセル',
  onCancel,
  isSubmitting,
  disabled
}: SubmitBarProps) => {
  return (
    <Group justify='flex-end' gap='sm'>
      {onCancel && (
        <Button variant='default' onClick={onCancel} disabled={isSubmitting}>
          {cancelLabel}
        </Button>
      )}
      <Button type='submit' disabled={disabled} loading={isSubmitting}>
        {submitLabel}
      </Button>
    </Group>
  );
};
