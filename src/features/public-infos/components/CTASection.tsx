import { Button, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';

export function CTASection() {
  return (
    <Container id='availability' size='lg' py='xl'>
      <Card radius='xl' p='xl'>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing='lg'>
          <Stack gap='xs'>
            <Title order={3}>空き状況を確認する</Title>
            <Text c='dimmed'>まずは空いている日をチェック。友人の方は準予約も可能です。</Text>
          </Stack>

          <Group justify='flex-end' align='center' visibleFrom='md'>
            <Button size='md' variant='light' component='a' href='/availability'>
              空き確認へ
            </Button>
            <Button size='md' component='a' href='/login'>
              ログインして準予約
            </Button>
          </Group>
          <Stack gap='sm' hiddenFrom='md'>
            <Button size='md' variant='light' component='a' href='/availability' fullWidth>
              空き確認へ
            </Button>
            <Button size='md' component='a' href='/login' fullWidth>
              ログインして準予約
            </Button>
          </Stack>
        </SimpleGrid>
      </Card>
    </Container>
  );
}
