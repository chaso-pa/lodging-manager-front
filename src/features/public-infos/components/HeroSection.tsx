import { Badge, Box, Button, Card, Container, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import type { PublicInfo } from '@/lib/api/types';

export function HeroSection({ info }: { info: PublicInfo }) {
  return (
    <Container size='lg' py='xl'>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl' verticalSpacing='xl'>
        <Stack gap='md' justify='center'>
          <Text size='sm' c='dimmed'>
            {info.location}
          </Text>
          <Title order={1}>{info.headline}</Title>
          <Text c='dimmed' size='lg'>
            {info.subheadline}
          </Text>

          <Group gap='sm' mt='sm'>
            <Button size='md' component='a' href='#availability'>
              空き確認
            </Button>
            <Button size='md' variant='light' component='a' href='#stay'>
              詳細を見る
            </Button>
          </Group>

          <Group gap='xs' mt='md'>
            {info.highlights.map((h) => (
              <Badge key={h} variant='light'>
                {h}
              </Badge>
            ))}
          </Group>
        </Stack>

        <Box>
          <Card radius='lg' p='sm'>
            <Image radius='md' src='https://picsum.photos/1200/800' alt='民泊の雰囲気イメージ' h={360} fit='cover' />
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
