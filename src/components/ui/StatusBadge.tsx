import { Badge } from '@mantine/core';

type StatusBadgeProps = {
  kind: 'reservation' | 'task';
  status: string;
};

const reservationStatusMap: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'yellow' },
  confirmed: { label: 'Confirmed', color: 'teal' },
  cancelled: { label: 'Cancelled', color: 'gray' },
  rejected: { label: 'Rejected', color: 'red' }
};

const taskStatusMap: Record<string, { label: string; color: string }> = {
  todo: { label: 'Todo', color: 'blue' },
  done: { label: 'Done', color: 'teal' },
  skipped: { label: 'Skipped', color: 'gray' }
};

export const StatusBadge = ({ kind, status }: StatusBadgeProps) => {
  const map = kind === 'reservation' ? reservationStatusMap : taskStatusMap;
  const entry = map[status];

  if (!entry) {
    return (
      <Badge variant='light' color='gray'>
        {status}
      </Badge>
    );
  }

  return (
    <Badge variant='light' color={entry.color}>
      {entry.label}
    </Badge>
  );
};
