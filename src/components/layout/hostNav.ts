export type HostNavItem = {
  label: string;
  href: string;
};

export const hostNavItems: HostNavItem[] = [
  { label: 'タスク実行', href: '/tasks/instances' },
  { label: 'タスク定義', href: '/tasks/templates' },
  { label: '予約申請一覧', href: '/pre-reservations' }
];
