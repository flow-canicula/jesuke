import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { FlashIndex } from '@/components/sections/FlashIndex';
import { Process } from '@/components/sections/Process';
import { Faq } from '@/components/sections/Faq';
import { NameBanner } from '@/components/sections/NameBanner';
import { CtaDoors } from '@/components/sections/CtaDoors';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildServiceSchema, buildFaqSchema, buildLocalBusinessSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { FAQ } from '@/content/faq';

export const metadata: Metadata = buildMetadata({
  canonical: '/',
  title: 'Anime & Manga Tattoo Artist — Metro Manila & Bulacan, Philippines',
  description:
    'Jesuke is Metro Manila and Bulacan\'s anime, manga & manhwa tattoo artist. Custom blackwork and fine-line pieces. Book a commission or browse the flash catalogue.',
  keywords: [
    'anime tattoo',
    'manga tattoo',
    'manhwa tattoo',
    'anime tattoo Metro Manila',
    'anime tattoo Manila',
    'anime tattoo Bulacan',
    'anime tattoo Philippines',
    'Metro Manila anime tattoo artist',
    'anime tattoo artist Metro Manila',
    'manga tattoo Metro Manila',
    'manga blackwork tattoo',
    'anime tattoo artist Philippines',
    'custom anime tattoo',
    'fine line anime tattoo',
    'blackwork anime tattoo',
    'Jesuke tattoo',
    'anime inspired tattoo',
    'NCR anime tattoo',
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
      <JsonLd schema={[buildServiceSchema(), buildFaqSchema(FAQ), buildLocalBusinessSchema()]} />
    </>
  );
}
