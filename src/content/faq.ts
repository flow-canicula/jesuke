export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ: FaqEntry[] = [
  {
    id: 'faq-custom-vs-flash',
    question: 'What is the difference between custom work and flash?',
    answer:
      'Flash pieces are finished designs ready to be tattooed as-is or with minor sizing adjustments — they are available on a first-come basis. Custom work starts from your idea: we develop the concept together before a stencil is cut. Both approaches get the same care and linework.',
  },
  {
    id: 'faq-how-to-book',
    question: 'How do I book a piece?',
    answer:
      'Use the commission inquiry form. Describe your idea, approximate size, and placement — no need for a precise brief at this stage. If the project is a fit, you will hear back within a week to discuss details and a deposit. You can also reach out directly on Facebook.',
  },
  {
    id: 'faq-deposit',
    question: 'Is a deposit required?',
    answer:
      'Yes. A non-refundable deposit secures your session and covers drawing time. The deposit amount is confirmed when you receive a quote and is deducted from the final session cost.',
  },
  {
    id: 'faq-reference-images',
    question: 'Can I bring reference images?',
    answer:
      'References help communicate mood, composition, and linework weight — use them freely. Paste links to images in the inquiry form. Note that the finished piece will always be original work; existing tattoo designs or licensed art are not reproduced.',
  },
  {
    id: 'faq-healing',
    question: 'What does the healing process look like?',
    answer:
      'Fresh ink needs two to four weeks to fully settle. Expect some peeling and slight colour shift in the first ten days — this is normal. Keep it out of direct sun, do not submerge it in water, and follow the aftercare sheet provided at the end of your session.',
  },
  {
    id: 'faq-guest-spots',
    question: 'Do you do guest spots?',
    answer:
      'Jesuke works from a fixed location. Sessions happen where the setting is right and the person is right — safety and trust are non-negotiable. Visiting clients are welcome. Reach out first.',
  },
  {
    id: 'faq-location',
    question: 'Where is Jesuke located?',
    answer:
      'Jesuke is based in Metro Manila and Bulacan, Philippines. Sessions are available by appointment — submit a commission inquiry to arrange.',
  },
  {
    id: 'faq-metro-manila',
    question: 'Do you accept clients from Metro Manila?',
    answer:
      'Yes. Clients from Metro Manila, NCR, and the surrounding regions are welcome. Bulacan is a short drive from most parts of Metro Manila. Book through the commission inquiry form to get started.',
  },
];
