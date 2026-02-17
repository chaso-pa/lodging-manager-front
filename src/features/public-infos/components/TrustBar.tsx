import { Card, Container, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconClock, IconSparkles, IconStar } from '@tabler/icons-react';
import type { PublicInfo } from '@/lib/api/types';

export function TrustBar({ info }: { info: PublicInfo }) {
  return (
    <Container size='lg' pb='xl'>
      <Card radius='lg' p='lg'>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg'>
          <Group align='flex-start' wrap='nowrap'>
            <ThemeIcon radius='xl' variant='light'>
              <IconStar size={18} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={600}>家主居住型で安心</Text>
              <Text size='sm' c='dimmed'>
                困ったらすぐ相談できます。初めてでも過ごしやすい環境。
              </Text>
            </Stack>
          </Group>

          <Group align='flex-start' wrap='nowrap'>
            <ThemeIcon radius='xl' variant='light'>
              <IconSparkles size={18} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={600}>清潔な空間づくり</Text>
              <Text size='sm' c='dimmed'>
                運営チェックリストで、日々の整備と清掃を徹底しています。
              </Text>
            </Stack>
          </Group>

          <Group align='flex-start' wrap='nowrap'>
            <ThemeIcon radius='xl' variant='light'>
              <IconClock size={18} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={600}>チェックイン / アウト</Text>
              <Text size='sm' c='dimmed'>
                Check-in: {info.checkin} / Check-out: {info.checkout}
              </Text>
            </Stack>
          </Group>
        </SimpleGrid>
      </Card>
    </Container>
  );
}
