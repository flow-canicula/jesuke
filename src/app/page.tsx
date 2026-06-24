import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { FlashIndex } from '@/components/sections/FlashIndex';
import { Process } from '@/components/sections/Process';
import { Faq } from '@/components/sections/Faq';
import { NameBanner } from '@/components/sections/NameBanner';
import { CtaDoors } from '@/components/sections/CtaDoors';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildServiceSchema, buildFaqSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { FAQ } from '@/content/faq';

export const metadata: Metadata = buildMetadata({
  canonical: '/',
  ogImage: '/og/default.png',
});

export default function ArtistPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FlashIndex />
      <NameBanner />
      <Process />
      <Faq />
      <CtaDoors />
      <JsonLd schema={[buildServiceSchema(), buildFaqSchema(FAQ)]} />
    </>
  );
}
