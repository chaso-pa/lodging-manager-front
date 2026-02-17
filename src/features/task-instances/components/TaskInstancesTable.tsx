'use client';

import { Button, Group, Table, Text } from '@mantine/core';
import { StatusBadge } from '@/components/ui/StatusBadge';

import type { TaskInstance } from '@/lib/api/types';

type TaskInstancesTableProps = {
  items: TaskInstance[];
  actingId: string | null;
  onDone: (task: TaskInstance) => void;
  onSkip: (task: TaskInstance) => void;
};

const truncateMemo = (memo?: string) => {
  if (!memo) {
    return '-';
  }
  return memo.length > 40 ? `${memo.slice(0, 40)}...` : memo;
};

const getTitle = (task: TaskInstance) => {
  return task.maintenance_task_id ?? task.reservation_id ?? task.id ?? 'Task';
};

export const TaskInstancesTable = ({ items, actingId, onDone, onSkip }: TaskInstancesTableProps) => (
  <Table striped highlightOnHover>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Title</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Memo</Table.Th>
        <Table.Th>Actions</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {items.map((task) => (
        <Table.Tr key={task.id ?? `${task.maintenance_task_id ?? 'task'}-${task.target_date ?? 'date'}`}>
          <Table.Td>
            <Text size='sm'>{getTitle(task)}</Text>
          </Table.Td>
          <Table.Td>
            <StatusBadge kind='task' status={task.status ?? 'unknown'} />
          </Table.Td>
          <Table.Td>
            <Text size='sm' c='dimmed'>
              {truncateMemo(task.memo)}
            </Text>
          </Table.Td>
          <Table.Td>
            <Group gap='xs'>
              <Button size='xs' onClick={() => onDone(task)} loading={actingId === task.id} disabled={!task.id}>
                Done
              </Button>
              <Button
                size='xs'
                color='gray'
                onClick={() => onSkip(task)}
                loading={actingId === task.id}
                disabled={!task.id}
              >
                Skipped
              </Button>
            </Group>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
);
