export type FlashPiece = {
  id: string;
  index: string;
  title: string;
  description: string;
  size: string;
  placement: string;
  sessions: number;
  alt: string;
  // TODO: replace placeholder with real image path in public/work/
  image: string;
  imageWidth: number;
  imageHeight: number;
  featured: boolean;
};

export const FLASH: FlashPiece[] = [
  {
    id: 'flash-001',
    index: '001',
    title: 'Wind-torn swordsman',
    description:
      'A figure mid-turn, trailing ink like smoke — single-session blackwork.',
    size: 'Forearm',
    placement: 'Outer forearm',
    sessions: 1,
    alt: 'Blackwork tattoo of a wind-swept swordsman figure, ink trailing behind in motion',
    image: '/work/placeholder.svg',
    imageWidth: 800,
    imageHeight: 1000,
    featured: true,
  },
  {
    id: 'flash-002',
    index: '002',
    title: 'Spirit fox',
    description: 'A quiet fox curled into the shoulder, clean linework.',
    size: 'Palm-sized',
    placement: 'Shoulder',
    sessions: 1,
    alt: 'Fine-line blackwork tattoo of a fox curled into a resting position',
    image: '/work/placeholder.svg',
    imageWidth: 800,
    imageHeight: 800,
    featured: true,
  },
  {
    id: 'flash-003',
    index: '003',
    title: 'Storm crane',
    description: 'A crane banking into a gust, wings fully extended.',
    size: 'Quarter sleeve',
    placement: 'Upper arm',
    sessions: 2,
    alt: 'Bold blackwork tattoo of a crane in flight through turbulent winds',
    image: '/work/placeholder.svg',
    imageWidth: 800,
    imageHeight: 1200,
    featured: true,
  },
  {
    id: 'flash-004',
    index: '004',
    title: 'Lantern bearer',
    description:
      'A cloaked figure holding a single lantern against an empty background.',
    size: 'Fist-sized',
    placement: 'Calf',
    sessions: 1,
    alt: 'Blackwork tattoo of a cloaked figure holding a lantern in darkness',
    image: '/work/placeholder.svg',
    imageWidth: 800,
    imageHeight: 1000,
    featured: false,
  },
  {
    id: 'flash-005',
    index: '005',
    title: 'Tide dragon',
    description: 'A serpentine form coiling through white-capped waves.',
    size: 'Half sleeve',
    placement: 'Forearm to elbow',
    sessions: 3,
    alt: 'Large blackwork tattoo of a dragon coiling through ocean waves',
    image: '/work/placeholder.svg',
    imageWidth: 800,
    imageHeight: 1400,
    featured: false,
  },
  {
    id: 'flash-006',
    index: '006',
    title: 'Paper crane fold',
    description: 'A single origami crane, rendered as contour geometry.',
    size: 'Matchbox',
    placement: 'Wrist',
    sessions: 1,
    alt: 'Minimal blackwork tattoo of an origami crane shown as clean geometric contour lines',
    image: '/work/placeholder.svg',
    imageWidth: 600,
    imageHeight: 600,
    featured: false,
  },
  {
    id: 'flash-007',
    index: '007',
    title: 'Masked wanderer',
    description:
      'A traveller in a wide-brimmed hat, face obscured, road behind.',
    size: 'Forearm',
    placement: 'Inner forearm',
    sessions: 2,
    alt: 'Blackwork tattoo of a lone traveller with a wide hat, face unseen, walking a path',
    image: '/work/placeholder.svg',
    imageWidth: 800,
    imageHeight: 1000,
    featured: false,
  },
  {
    id: 'flash-008',
    index: '008',
    title: 'Moon hare',
    description: 'A hare silhouetted against a full moon, ears erect.',
    size: 'Palm-sized',
    placement: 'Shin',
    sessions: 1,
    alt: 'Blackwork tattoo of a hare in silhouette against a full moon',
    image: '/work/placeholder.svg',
    imageWidth: 800,
    imageHeight: 800,
    featured: false,
  },
];

export const FEATURED = FLASH.filter((p) => p.featured);
