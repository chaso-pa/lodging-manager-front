import type { ReactNode } from 'react';

import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';

type TableStateProps = {
  isLoading: boolean;
  error?: unknown;
  isEmpty: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRetry?: () => void;
  children: ReactNode;
};

export const TableState = ({
  isLoading,
  error,
  isEmpty,
  emptyTitle = 'データがありません',
  emptyDescription,
  onRetry,
  children
}: TableStateProps) => {
  if (isLoading) {
    return <LoadingState text='Loading...' />;
  }

  if (error) {
    const message = error instanceof Error ? error.message : undefined;
    return <ErrorState description={message} retry={onRetry} />;
  }

  if (isEmpty) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return <>{children}</>;
};
