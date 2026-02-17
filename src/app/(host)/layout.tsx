import { HostShell } from '@/components/layout/HostShell';

export default function HostLayout({ children }: { children: React.ReactNode }) {
  return <HostShell>{children}</HostShell>;
}
