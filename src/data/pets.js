/**
 * TAGS defines the available categories for filtering.
 * Each object contains a unique ID, a display Label, and a UI Emoji.
 */
export const TAGS = [
  { id: 'cat',     label: 'Cats',     emoji: '🐱' },
  { id: 'dog',     label: 'Dogs',     emoji: '🐶' },
  { id: 'bunny',   label: 'Bunnies',  emoji: '🐰' },
  { id: 'reptile', label: 'Reptiles', emoji: '🦎' },
  { id: 'bird',    label: 'Birds',    emoji: '🐦' },
  { id: 'fish',    label: 'Fish',     emoji: '🐠' },
  { id: 'rat',     label: 'Rats',     emoji: '🐭' },
];

/**
 * PETS is the main data array. 
 * Ensure 'tag' matches an ID in the TAGS array for the filtering logic to work.
 */
export const PETS = [
  // --- CATS ---
  {
    id: 1, name: 'Luna', tag: 'cat', age: '2 yrs', breed: 'Siamese',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'Downtown Shelter, Toronto',
    temperament: 'Calm, curious', fee: '$120',
    personality: 'Luna is a gentle soul who loves to curl up on laps and watch the world go by.',
    diet: 'Wet food twice daily, fresh water always available.',
    shelter: 'Toronto Downtown Animal Rescue, Booth 4A',
    camId: 'SkYbmNjPNbg',
  },
  {
    id: 7, name: 'Cleo', tag: 'cat', age: '5 yrs', breed: 'Maine Coon',
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'Westside Cat Haven, Toronto',
    temperament: 'Playful, chatty', fee: '$95',
    personality: 'Cleo is a social butterfly who announces her presence loudly.',
    diet: 'High-protein dry food with occasional wet food treats.',
    shelter: 'Westside Cat Haven, Unit 2',
    camId: 'xbIq_OmRZDU',
  },
  {
    id: 14, name: 'Oreo', tag: 'cat', age: '3 yrs', breed: 'Tuxedo Cat',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'North York Paws, Toronto',
    temperament: 'Shy but affectionate', fee: '$110',
    personality: 'Oreo takes a little time to warm up, but is endlessly cuddly once comfortable.',
    diet: 'Prefers dry kibble, dislikes fish-based foods.',
    shelter: 'North York Paws Rescue Centre',
    camId: 'ScCHMBBhN6s',
  },

  // --- DOGS ---
  {
    id: 2, name: 'Milo', tag: 'dog', age: '3 yrs', breed: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'Scarborough SPCA, Toronto',
    temperament: 'Friendly, energetic', fee: '$200',
    personality: 'Milo is the ultimate family dog — he loves everyone, including kids and other dogs.',
    diet: 'Large-breed dry food, 2 cups twice daily.',
    shelter: 'Scarborough SPCA, Kennel Block B',
    camId: 'N4hMkBM3cCQ',
  },
  {
    id: 8, name: 'Buster', tag: 'dog', age: '2 yrs', breed: 'Beagle',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'East End Animal Hub, Toronto',
    temperament: 'Mischievous, loyal', fee: '$175',
    personality: 'Buster is nose-first into everything. Needs a securely fenced yard.',
    diet: 'Portion-controlled dry food — Beagles overeat easily.',
    shelter: 'East End Animal Hub, Room 3',
    camId: 'UbxUSsFHMg4',
  },

  // --- BUNNIES ---
  {
    id: 17, name: 'Clover', tag: 'bunny', age: '1 yr', breed: 'Holland Lop',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'Bunny Burrow Rescue, Toronto',
    temperament: 'Gentle, curious', fee: '$65',
    personality: 'Clover is a floppy-eared sweetheart who loves to binky around her pen.',
    diet: 'Unlimited timothy hay, leafy greens daily.',
    shelter: 'Bunny Burrow Rescue, Hutch 1',
    camId: 'zzS5ENr4fpk',
  },

  // --- REPTILES ---
  {
    id: 3, name: 'Ziggy', tag: 'reptile', age: '1 yr', breed: 'Bearded Dragon',
    image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=700&auto=format&fit=crop&q=80',
    vaccinated: 'N/A', location: 'Reptile Refuge, Toronto',
    temperament: 'Docile, alert', fee: '$90',
    personality: 'Ziggy is a relaxed beardie who enjoys basking and watching activity.',
    diet: 'Leafy greens, Dubia roaches, and calcium supplements.',
    shelter: 'Reptile Refuge Toronto, Tank 4',
    camId: 'wTfKbXPUfNk',
  },

  // --- BIRDS ---
  {
    id: 4, name: 'Kiwi', tag: 'bird', age: '4 yrs', breed: 'Sun Conure',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'Wings & Things, Toronto',
    temperament: 'Loud, affectionate', fee: '$350',
    personality: 'Kiwi is a velcro bird who needs to be with his flock (that means you).',
    diet: 'Pellet-based diet with fresh fruits and veggies.',
    shelter: 'Wings & Things Bird Sanctuary, Aviary 2',
    camId: '7wdULpFZEEY',
  },

  // --- FISH ---
  {
    id: 5, name: 'Nemo', tag: 'fish', age: '6 mo', breed: 'Clownfish',
    image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?w=700&auto=format&fit=crop&q=80',
    vaccinated: 'N/A', location: 'Aqua Rescue, Toronto',
    temperament: 'Territorial, active', fee: '$30',
    personality: 'Nemo patrols his anemone like it is his kingdom.',
    diet: 'Marine flake food twice daily.',
    shelter: 'Aqua Rescue Toronto, Tank 12',
    camId: 'pCmFSiX8MoI',
  },

  // --- RATS ---
  {
    id: 6, name: 'Peanut', tag: 'rat', age: '1 yr', breed: 'Dumbo Rat',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=700&auto=format&fit=crop&q=80',
    vaccinated: '✅ Up to date', location: 'Small Paws Rescue, Toronto',
    temperament: 'Social, clever', fee: '$25',
    personality: 'Peanut loves puzzles and stealing your earrings. Rats need company!',
    diet: 'Rat block pellets and fresh vegetables.',
    shelter: 'Small Paws Rescue, Cage Row B',
    camId: 'SeSXfA9J4DI',
  }
];