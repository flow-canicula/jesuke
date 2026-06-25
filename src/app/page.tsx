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
  title: 'Anime & Manga Tattoo Artist — Philippines',
  description:
    'Jesuke is the Philippines\' premier anime, manga & manhwa tattoo artist. Custom blackwork and fine-line pieces in Bulacan. Book a commission or browse the catalogue.',
  keywords: [
    'anime tattoo',
    'manga tattoo',
    'manhwa tattoo',
    'anime tattoo Philippines',
    'anime tattoo Manila',
    'anime tattoo Bulacan',
    'manga blackwork tattoo',
    'anime tattoo artist Philippines',
    'custom anime tattoo',
    'fine line anime tattoo',
    'blackwork anime tattoo',
    'Jesuke tattoo',
    'anime inspired tattoo',
  ],
});

export default function ArtistPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FlashIndex />
      <NameBanner basePath={process.env.NEXT_PUBLIC_BASE_PATH ?? ''} />
      <Process />
      <Faq />
      <CtaDoors />
      <JsonLd schema={[buildServiceSchema(), buildFaqSchema(FAQ)]} />
    </>
  );
}
