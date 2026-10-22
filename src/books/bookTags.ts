export type TagGroup = {
  name: string
  tags: string[]
}

export const tagGroups: TagGroup[] = [
  {
    name: 'Audience',
    tags: ['Middle grade', 'Young adult', 'New adult', 'Adult'],
  },
  {
    name: 'Genre',
    tags: [
      'Fantasy',
      'Romantasy',
      'Romance',
      'Dark romance',
      'Science fiction',
      'Thriller',
      'Mystery',
      'Horror',
      'Historical fiction',
      'Contemporary',
      'Dystopian',
      'Literary fiction',
      'Classic',
      'Mythology retelling',
      'Non-fiction',
    ],
  },
  {
    name: 'Tropes and characters',
    tags: [
      'Enemies to lovers',
      'Friends to lovers',
      'Slow burn',
      'Forced proximity',
      'Fake dating',
      'Love triangle',
      'Second chance',
      'Forbidden love',
      'Grumpy x sunshine',
      'Toxic relationship',
      'Morally grey MMC',
      'Strong FMC',
      'Dual POV',
      'Found family',
      'Chosen one',
      'Unreliable narrator',
      'Redemption arc',
      'Antihero',
    ],
  },
  {
    name: 'Mood',
    tags: [
      'Dark',
      'Cozy',
      'Emotional',
      'Heartbreaking',
      'Funny',
      'Fast-paced',
      'Slow-paced',
      'Atmospheric',
      'Thought-provoking',
    ],
  },
  {
    name: 'Content notes',
    tags: [
      'Spicy',
      'Violence',
      'Abuse',
      'Death',
      'Grief',
      'Mental health',
      'Self-harm',
    ],
  },
]
