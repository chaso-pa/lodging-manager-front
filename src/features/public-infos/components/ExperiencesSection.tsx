import { Card, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconGift, IconPizza, IconTelescope } from '@tabler/icons-react';
import type { PublicInfo } from '@/lib/api/types';

export function ExperiencesSection({ info }: { info: PublicInfo }) {
  const iconFor = (k: PublicInfo['experiences'][number]['icon']) => {
    if (k === 'telescope') return <IconTelescope size={18} />;
    if (k === 'pizza') return <IconPizza size={18} />;
    return <IconGift size={18} />;
  };

  return (
    <Container id='experiences' size='lg' py='xl'>
      <Group justify='space-between' align='flex-end' mb='md'>
        <Stack gap={2}>
          <Title order={2}>体験</Title>
          <Text c='dimmed'>“泊まる”だけじゃない。繋がりと体験を。</Text>
        </Stack>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg'>
        {info.experiences.map((e) => (
          <Card key={e.title} radius='lg' p='lg'>
            <Group gap='sm' mb='sm'>
              <ThemeIcon radius='xl' variant='light'>
                {iconFor(e.icon)}
              </ThemeIcon>
              <Text fw={700}>{e.title}</Text>
            </Group>
            <Text c='dimmed' size='sm'>
              {e.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
