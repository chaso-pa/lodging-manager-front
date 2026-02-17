import { Card, Container, Group, Image, SimpleGrid, Text, Title } from '@mantine/core';

export function GallerySection() {
  return (
    <Container size='lg' py='xl'>
      <Group justify='space-between' align='flex-end' mb='md'>
        <Title order={2}>写真</Title>
        <Text c='dimmed' size='sm'>
          ※後で実写真に差し替え
        </Text>
      </Group>

      <SimpleGrid cols={{ base: 2, md: 3 }} spacing='md'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} radius='lg' p='xs'>
            <Image
              src={`https://picsum.photos/600/400?random=${i}`}
              alt={`gallery ${i}`}
              radius='md'
              h={160}
              fit='cover'
            />
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
