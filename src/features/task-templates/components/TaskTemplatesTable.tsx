'use client';

import { Button, ScrollArea, Switch, Table, Text } from '@mantine/core';
import { RowActions } from '@/components/ui/table/RowActions';

import type { TaskTemplate } from '@/lib/api/types';

type TaskTemplatesTableProps = {
  items: TaskTemplate[];
  updatingId: string | null;
  onToggle: (task: TaskTemplate) => void;
};

export const TaskTemplatesTable = ({ items, updatingId, onToggle }: TaskTemplatesTableProps) => (
  <ScrollArea>
    <Table striped highlightOnHover horizontalSpacing='md' verticalSpacing='sm' miw={820}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Frequency</Table.Th>
          <Table.Th>Due offset (hours)</Table.Th>
          <Table.Th>Active</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.map((task) => (
          <Table.Tr key={task.id ?? `${task.title ?? 'task'}-${task.frequency ?? 'freq'}`}>
            <Table.Td>
              <Text size='sm'>{task.title ?? 'Untitled'}</Text>
            </Table.Td>
            <Table.Td>
              <Text size='sm' c='dimmed'>
                {task.description ?? '-'}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size='sm'>{task.frequency ?? '-'}</Text>
            </Table.Td>
            <Table.Td>
              <Text size='sm'>{task.due_offset_hours ?? '-'}</Text>
            </Table.Td>
            <Table.Td>
              <Switch
                checked={!!task.is_active}
                onChange={() => onToggle(task)}
                disabled={!task.id}
                aria-label={`toggle-${task.id ?? task.title ?? 'task'}`}
              />
            </Table.Td>
            <Table.Td>
              <RowActions>
                <Button
                  size='xs'
                  variant='light'
                  onClick={() => onToggle(task)}
                  loading={updatingId === task.id}
                  disabled={!task.id}
                >
                  {task.is_active ? 'Deactivate' : 'Activate'}
                </Button>
              </RowActions>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </ScrollArea>
);
