'use client';

import { Box, Skeleton, Stack } from '@mantine/core';
import { CTASection } from '@/features/public-infos/components/CTASection';
import { ExperiencesSection } from '@/features/public-infos/components/ExperiencesSection';
import { GallerySection } from '@/features/public-infos/components/GallerySection';
import { HeroSection } from '@/features/public-infos/components/HeroSection';
import { PublicFooter } from '@/features/public-infos/components/PublicFooter';
import { PublicHeader } from '@/features/public-infos/components/PublicHeader';
import { StayInfoSection } from '@/features/public-infos/components/StayInfoSection';
import { TrustBar } from '@/features/public-infos/components/TrustBar';
import { usePublicInfo } from '@/features/public-infos/hooks/usePublicInfo';

export default function PublicLandingPage() {
  const { data: info, isLoading, error } = usePublicInfo();

  if (isLoading) {
    return (
      <Box p='xl'>
        <Stack gap='md'>
          <Skeleton height={28} w='40%' />
          <Skeleton height={18} w='60%' />
          <Skeleton height={16} />
          <Skeleton height={200} />
          <Skeleton height={16} />
          <Skeleton height={16} />
        </Stack>
      </Box>
    );
  }

  if (error || !info) {
    return <Box p='xl'>Failed to load public info.</Box>;
  }

  return (
    <Box>
      <PublicHeader name={info.name} />
      <HeroSection info={info} />
      <TrustBar info={info} />
      <ExperiencesSection info={info} />
      <StayInfoSection info={info} />
      <GallerySection />
      <CTASection />
      <PublicFooter />
    </Box>
  );
}
