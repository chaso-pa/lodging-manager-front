import { Card, Container, List, ListItem, SimpleGrid, Text, Title } from '@mantine/core';
import type { PublicInfo } from '@/lib/api/types';

export function StayInfoSection({ info }: { info: PublicInfo }) {
  return (
    <Container id='stay' size='lg' py='xl'>
      <Title order={2} mb='md'>
        宿泊情報
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing='lg'>
        <Card radius='lg' p='lg'>
          <Text fw={700} mb='sm'>
            設備
          </Text>
          <List spacing='xs' size='sm'>
            {info.amenities.map((a: string) => (
              <ListItem key={a}>{a}</ListItem>
            ))}
          </List>
        </Card>

        <Card radius='lg' p='lg'>
          <Text fw={700} mb='sm'>
            ハウスルール
          </Text>
          <List spacing='xs' size='sm'>
            {info.houseRules.map((r) => (
              <ListItem key={r}>{r}</ListItem>
            ))}
          </List>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
