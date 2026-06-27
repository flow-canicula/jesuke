export type WorkCategory = 'healed' | 'junji' | 'waifu' | 'general' | 'designs' | 'stencils' | 'may-oct-2025' | 'old-designs' | 'blade-series' | 'ragnarok-series';

export const CATEGORY_LABEL: Record<WorkCategory, string> = {
  'healed':          'Healed results',
  'junji':           'Junji Ito',
  'waifu':           'Waifu',
  'general':         'Mixed work',
  'designs':         'Designs',
  'stencils':        'Stencils',
  'may-oct-2025':    'May – Oct 2025',
  'old-designs':     'Archive',
  'blade-series':    'Demon Slayer',
  'ragnarok-series': 'Record of Ragnarok',
};

export type TattooStyle = 'blackwork' | 'fine-line' | 'blackwork & fine-line';

export const STYLE_LABEL: Record<TattooStyle, string> = {
  'blackwork':           'Blackwork',
  'fine-line':           'Fine-line',
  'blackwork & fine-line': 'Blackwork · Fine-line',
};

export type FlashPiece = {
  id: string;
  index: string;
  alt: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  category: WorkCategory;
  featured: boolean;
  style: TattooStyle;
  placement?: string;
};

export const FLASH: FlashPiece[] = [
  // ── Healed results ──────────────────────────────────────────────
  {
    id: 'healed-001',
    index: '001',
    alt: 'Fully healed anime-style blackwork tattoo',
    image: '/work/healed/fully-healed-2.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: true,
    style: 'blackwork',
    placement: 'Outer forearm',
  },
  {
    id: 'healed-002',
    index: '002',
    alt: 'Fully healed fine-line anime tattoo',
    image: '/work/healed/fully-healed-3.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: true,
    style: 'fine-line',
    placement: 'Upper arm',
  },
  {
    id: 'healed-003',
    index: '003',
    alt: 'Healed anime tattoo — clean linework close-up',
    image: '/work/healed/fully-healed-4.jpg',
    imageWidth: 800,
    imageHeight: 1200,
    category: 'healed',
    featured: true,
    style: 'blackwork',
    placement: 'Calf',
  },
  {
    id: 'healed-004',
    index: '004',
    alt: 'Fully healed blackwork anime tattoo',
    image: '/work/healed/fully-healed-5.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: false,
    style: 'blackwork',
    placement: 'Shin',
  },
  {
    id: 'healed-005',
    index: '005',
    alt: 'Healed anime-style tattoo',
    image: '/work/healed/fully-healed-6.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: false,
    style: 'blackwork & fine-line',
    placement: 'Forearm',
  },
  {
    id: 'healed-006',
    index: '006',
    alt: 'Healed anime tattoo — large format',
    image: '/work/healed/fully-healed-7.jpg',
    imageWidth: 800,
    imageHeight: 1200,
    category: 'healed',
    featured: false,
    style: 'blackwork',
    placement: 'Thigh',
  },
  {
    id: 'healed-007',
    index: '007',
    alt: 'Small healed blackwork anime tattoo',
    image: '/work/healed/fully-healed-8.jpg',
    imageWidth: 600,
    imageHeight: 600,
    category: 'healed',
    featured: false,
    style: 'fine-line',
    placement: 'Wrist',
  },
  {
    id: 'healed-008',
    index: '008',
    alt: 'Healed manga-inspired tattoo',
    image: '/work/healed/fully-healed-9.jpg',
    imageWidth: 800,
    imageHeight: 1100,
    category: 'healed',
    featured: false,
    style: 'blackwork',
    placement: 'Inner forearm',
  },
  {
    id: 'healed-009',
    index: '009',
    alt: 'Healed anime blackwork tattoo',
    image: '/work/healed/fully-healed-10.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: false,
    style: 'blackwork',
    placement: 'Shoulder',
  },
  {
    id: 'healed-010',
    index: '010',
    alt: 'Healed fine-line anime tattoo',
    image: '/work/healed/fully-healed-11.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: false,
    style: 'fine-line',
    placement: 'Calf',
  },

  // ── Junji-style horror / dark manga ─────────────────────────────
  {
    id: 'junji-001',
    index: '011',
    alt: 'Horror manga-inspired blackwork tattoo',
    image: '/work/junji/junji-2.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'junji',
    featured: true,
    style: 'blackwork',
    placement: 'Outer forearm',
  },
  {
    id: 'junji-002',
    index: '012',
    alt: 'Dark manga blackwork tattoo',
    image: '/work/junji/junji-3.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'junji',
    featured: true,
    style: 'blackwork',
    placement: 'Upper arm',
  },
  {
    id: 'junji-003',
    index: '013',
    alt: 'Horror manga-style tattoo in blackwork',
    image: '/work/junji/junji-4.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'junji',
    featured: false,
    style: 'blackwork',
    placement: 'Thigh',
  },
  {
    id: 'junji-004',
    index: '014',
    alt: 'Dark manga portrait tattoo in heavy blackwork',
    image: '/work/junji/junji-5.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'junji',
    featured: false,
    style: 'blackwork',
    placement: 'Calf',
  },
  {
    id: 'junji-005',
    index: '015',
    alt: 'Blackwork tattoo in horror manga style',
    image: '/work/junji/junji-6.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'junji',
    featured: false,
    style: 'blackwork',
    placement: 'Shoulder',
  },

  // ── Waifu / female figure ────────────────────────────────────────
  {
    id: 'waifu-001',
    index: '016',
    alt: 'Anime-style tattoo of a female figure in flowing robes',
    image: '/work/waifu/waifu-1.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'waifu',
    featured: true,
    style: 'fine-line',
    placement: 'Thigh',
  },
  {
    id: 'waifu-002',
    index: '017',
    alt: 'Fine-line anime tattoo of a female figure',
    image: '/work/waifu/waifu-2.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'waifu',
    featured: true,
    style: 'fine-line',
    placement: 'Outer forearm',
  },
  {
    id: 'waifu-003',
    index: '018',
    alt: 'Anime-style tattoo of a female figure with flowing hair',
    image: '/work/waifu/waifu-3.jpg',
    imageWidth: 800,
    imageHeight: 1200,
    category: 'waifu',
    featured: false,
    style: 'blackwork & fine-line',
    placement: 'Upper arm',
  },
  {
    id: 'waifu-004',
    index: '019',
    alt: 'Anime blackwork tattoo — female figure in profile',
    image: '/work/waifu/waifu-4.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'waifu',
    featured: false,
    style: 'blackwork',
    placement: 'Calf',
  },
  {
    id: 'waifu-005',
    index: '020',
    alt: 'Fine-line anime-style tattoo of a female figure',
    image: '/work/waifu/waifu-5.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'waifu',
    featured: false,
    style: 'fine-line',
    placement: 'Shin',
  },

  // ── General / numbered ───────────────────────────────────────────
  {
    id: 'general-001',
    index: '021',
    alt: 'Anime blackwork tattoo by Jesuke',
    image: '/work/general/2.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'general',
    featured: false,
    style: 'blackwork',
    placement: 'Forearm',
  },
  {
    id: 'general-002',
    index: '022',
    alt: 'Anime blackwork tattoo by Jesuke',
    image: '/work/general/3.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'general',
    featured: false,
    style: 'blackwork',
    placement: 'Upper arm',
  },
  {
    id: 'general-003',
    index: '023',
    alt: 'Anime-style tattoo by Jesuke',
    image: '/work/general/4.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'general',
    featured: false,
    style: 'blackwork & fine-line',
    placement: 'Thigh',
  },
  {
    id: 'general-004',
    index: '024',
    alt: 'Anime blackwork tattoo scene by Jesuke',
    image: '/work/general/5.jpg',
    imageWidth: 800,
    imageHeight: 1200,
    category: 'general',
    featured: false,
    style: 'blackwork',
    placement: 'Back',
  },
  {
    id: 'general-005',
    index: '025',
    alt: 'Detailed anime blackwork tattoo by Jesuke',
    image: '/work/general/6.jpg',
    imageWidth: 800,
    imageHeight: 800,
    category: 'general',
    featured: false,
    style: 'blackwork',
    placement: 'Shoulder',
  },
];

// ── May – October 2025 Tattoo Works ─────────────────────────────
// 52 photos from the May–October 2025 shoot.
// Alt text is intentionally generic — no franchise names (NO-FRANCHISE-NAMES rule).
const MAY_OCT_2025: FlashPiece[] = Array.from({ length: 52 }, (_, i) => {
  const n = i + 1;
  const idx = (FLASH.length + n).toString().padStart(3, '0');
  return {
    id: `may-oct-2025-${String(n).padStart(3, '0')}`,
    index: idx,
    alt: `Anime, manga, and manhwa tattoo by Jesuke — May–October 2025`,
    image: `/work/may-oct-2025/tattoo-${String(n).padStart(3, '0')}.jpg`,
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'may-oct-2025' as WorkCategory,
    featured: n <= 6,
    style: 'blackwork' as TattooStyle,
  };
});

FLASH.push(...MAY_OCT_2025);

// ── Old designs ──────────────────────────────────────────────────
// 55 design/illustration photos — earlier work before the current series.
const OLD_DESIGNS: FlashPiece[] = Array.from({ length: 55 }, (_, i) => {
  const n = i + 1;
  const idx = (FLASH.length + n).toString().padStart(3, '0');
  return {
    id: `old-designs-${String(n).padStart(3, '0')}`,
    index: idx,
    alt: `Anime, manga, and manhwa tattoo design by Jesuke — archive`,
    image: `/work/old-designs/design-${String(n).padStart(3, '0')}.jpg`,
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'old-designs' as WorkCategory,
    featured: false,
    style: 'blackwork' as TattooStyle,
  };
});

FLASH.push(...OLD_DESIGNS);

// ── Blade series ─────────────────────────────────────────────────
// 19 photos of a patterned-haori / blade-and-breath blackwork series.
// Described generically per NO-FRANCHISE-NAMES — no title or character named.
const BLADE_SERIES: FlashPiece[] = Array.from({ length: 19 }, (_, i) => {
  const n = i + 1;
  const idx = (FLASH.length + n).toString().padStart(3, '0');
  const alts = [
    'Blackwork tattoo of a blade-wielding figure in a patterned haori',
    'Fine-line tattoo of a figure wreathed in breath-style flames and shadow',
    'Anime blackwork tattoo — patterned coat and decisive sword stance',
    'Dark figure study tattoo — haori detail and motion lines',
    'Blackwork tattoo of a kneeling swordsman, breath-style effect',
    'Anime-style tattoo of two figures facing off, bold contour line',
    'Fine-line tattoo portrait — determined expression, strong jaw',
    'Blackwork tattoo of a figure mid-strike, cloak trailing behind',
    'Patterned haori blackwork tattoo — geometric repeat on fabric folds',
    'Anime tattoo of a figure ascending, breath-style energy lines',
    'Dark blackwork tattoo — silhouetted swordsman against a full moon',
    'Fine-line tattoo of a figure in repose, blade at rest',
    'Anime blackwork — back piece detail, haori and shoulder musculature',
    'Breath-style energy burst tattoo — radiating lines, no fill',
    'Tattoo of a masked figure, patterned garment, clean linework',
    'Blackwork tattoo of a crouching fighter, tension in every line',
    'Anime-style tattoo close-up — eye detail and hatched shadow',
    'Fine-line tattoo of intertwined figures, dynamic composition',
    'Blackwork tattoo of a lone figure walking a dark path',
  ] as const;
  return {
    id: `blade-series-${String(n).padStart(3, '0')}`,
    index: idx,
    alt: alts[(n - 1) % alts.length] ?? `Anime blackwork tattoo by Jesuke — blade series piece ${n}`,
    image: `/work/blade-series/blade-${String(n).padStart(3, '0')}.jpg`,
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'blade-series' as WorkCategory,
    featured: false,
    style: 'blackwork' as TattooStyle,
  };
});

FLASH.push(...BLADE_SERIES);

// ── Ancient arena / divine combatant series ──────────────────────
// 6 prized blackwork pieces — godlike figures and ancient arena scenes.
// Described generically per NO-FRANCHISE-NAMES — no title or character named.
const RAGNAROK_SERIES: FlashPiece[] = [
  {
    id: 'ragnarok-001',
    index: (FLASH.length + 1).toString().padStart(3, '0'),
    alt: 'Large blackwork tattoo of a powerful divine figure in a combative stance',
    image: '/work/ragnarok-series/ragnarok-001.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'ragnarok-series',
    featured: true,
    style: 'blackwork',
  },
  {
    id: 'ragnarok-002',
    index: (FLASH.length + 2).toString().padStart(3, '0'),
    alt: 'Blackwork tattoo of an ancient arena scene with dramatic scale',
    image: '/work/ragnarok-series/ragnarok-002.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'ragnarok-series',
    featured: true,
    style: 'blackwork',
  },
  {
    id: 'ragnarok-003',
    index: (FLASH.length + 3).toString().padStart(3, '0'),
    alt: 'Blackwork tattoo of two powerful figures clashing in a high-impact manga composition',
    image: '/work/ragnarok-series/ragnarok-003.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'ragnarok-series',
    featured: true,
    style: 'blackwork',
  },
  {
    id: 'ragnarok-004',
    index: (FLASH.length + 4).toString().padStart(3, '0'),
    alt: 'Large blackwork tattoo of a deity figure surrounded by elemental energy and motion lines',
    image: '/work/ragnarok-series/ragnarok-004.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'ragnarok-series',
    featured: true,
    style: 'blackwork',
  },
  {
    id: 'ragnarok-005',
    index: (FLASH.length + 5).toString().padStart(3, '0'),
    alt: 'Fine-line blackwork tattoo of a lone figure in a defiant stance',
    image: '/work/ragnarok-series/ragnarok-005.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'ragnarok-series',
    featured: true,
    style: 'blackwork & fine-line',
  },
  {
    id: 'ragnarok-006',
    index: (FLASH.length + 6).toString().padStart(3, '0'),
    alt: 'Blackwork portrait tattoo of a figure in a moment of resolve',
    image: '/work/ragnarok-series/ragnarok-006.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    category: 'ragnarok-series',
    featured: true,
    style: 'blackwork',
  },
];

FLASH.push(...RAGNAROK_SERIES);

export const FEATURED = FLASH.filter((p) => p.featured);

// Home page: ragnarok series first (most prized), then remaining featured — max 12.
export const HOME_FEATURED = [
  ...FLASH.filter((p) => p.category === 'ragnarok-series'),
  ...FLASH.filter((p) => p.featured && p.category !== 'ragnarok-series'),
].slice(0, 12);
