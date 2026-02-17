import { Anchor, Box, Button, Container, Group, ThemeIcon, Title } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';

export function PublicHeader({ name }: { name: string }) {
  return (
    <Box component='header' py='md'>
      <Container size='lg'>
        <Group justify='space-between'>
          <Group gap='sm'>
            <ThemeIcon radius='xl' variant='light'>
              <IconHome size={18} />
            </ThemeIcon>
            <Title order={4}>{name}</Title>
          </Group>
          <Group gap='md'>
            <Anchor href='#experiences' underline='never'>
              体験
            </Anchor>
            <Anchor href='#stay' underline='never'>
              宿泊情報
            </Anchor>
            <Anchor href='#availability' underline='never'>
              空き確認
            </Anchor>
            <Button size='sm' variant='light' component='a' href='/login'>
              ログイン
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
