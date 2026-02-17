import { Box, Container, Divider, SimpleGrid, Stack, Text } from '@mantine/core';

export function PublicFooter() {
  return (
    <Box component='footer' py='xl'>
      <Container size='lg'>
        <Divider my='md' />
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg'>
          <Stack gap={4}>
            <Text fw={700}>連絡</Text>
            <Text size='sm' c='dimmed'>
              お問い合わせはログイン後、または予約サイト経由でお願いします。
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text fw={700}>アクセス</Text>
            <Text size='sm' c='dimmed'>
              長野県佐久市（詳細は予約確定後に案内）
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text fw={700}>注意</Text>
            <Text size='sm' c='dimmed'>
              家主居住型のため、共用部のマナーにご協力ください。
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
