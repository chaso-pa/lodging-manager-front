import { Card, Text } from '@mantine/core';
import { fetchPublicInfo } from '@/lib/api/public';

const renderList = (items?: string[]) => {
  if (!items || items.length === 0) {
    return <Text c='dimmed'>Not provided</Text>;
  }

  return items.map((item, index) => (
    <Text key={`${item}-${index}`} size='sm'>
      • {item}
    </Text>
  ));
};

export default async function HomePage() {
  const info = await fetchPublicInfo();

  return (
    <main style={{ padding: '2rem' }}>
      <Card withBorder radius='md' padding='lg' style={{ maxWidth: 720, margin: '0 auto' }}>
        <Text fw={700} size='lg' mb='sm'>
          {info.name ?? 'Public Listing'}
        </Text>
        <Text mb='md' c='dimmed'>
          {info.description ?? 'No description available.'}
        </Text>

        <Text fw={600} mb='xs'>
          Location
        </Text>
        <Text size='sm' mb='md'>
          {info.location ?? 'Not provided'}
        </Text>

        <Text fw={600} mb='xs'>
          Access
        </Text>
        <Text size='sm' mb='md'>
          {info.access ?? 'Not provided'}
        </Text>

        <Text fw={600} mb='xs'>
          House Rules
        </Text>
        <div style={{ marginBottom: '1rem' }}>{renderList(info.house_rules)}</div>

        <Text fw={600} mb='xs'>
          Amenities
        </Text>
        <div style={{ marginBottom: '1rem' }}>{renderList(info.amenities)}</div>

        <Text fw={600} mb='xs'>
          Check-in / Check-out
        </Text>
        <Text size='sm' mb='md'>
          {info.checkin_time ?? 'Not provided'} / {info.checkout_time ?? 'Not provided'}
        </Text>

        <Text fw={600} mb='xs'>
          Notes
        </Text>
        <Text size='sm'>{info.notes ?? 'Not provided'}</Text>
      </Card>
    </main>
  );
}
