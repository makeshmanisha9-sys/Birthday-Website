/**
 * LUXURY BIRTHDAY EXPERIENCE - PERSONAL DATA CONFIGURATION
 * 
 * Centralized personal content featuring authentic memories, video edit, and letter for Sanjusree.
 */

export const birthdayData = {
  // Recipient Information
  recipient: {
    fullName: "Sanjusree",
    firstName: "Sanjusree",
    nickname: "Sanju",
    title: "To My Soul Sister & Best Friend, Sanjusree",
    birthdayDate: "A Day Dedicated to You",
    birthYear: "Celebrating You Today",
    location: "Under a Sky of Gold",
  },

  // Audio Configuration
  audio: {
    title: "Cinematic Ambient & Warm Piano",
    artist: "A Melody Composed For You",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=tender-ambient-piano-112191.mp3",
    fallbackEnabled: true,
  },

  // 1. Cinematic Intro
  intro: {
    quote1: "Some people make life beautiful...",
    quote2: "And today, we celebrate YOU, SANJUSREE.",
    subtitle: "A private interactive cinematic tribute curated with infinite love and gratitude.",
    enterButtonText: "ENTER THE SURPRISE",
  },

  // 2. The Birthday Reveal (3D Gift Box)
  giftBox: {
    tagline: "A SPECIAL TOKEN",
    hint: "Touch the bespoke vault to unwrap your celebration",
    openedTitle: "Unveiling A Heart of Pure Gold",
    quote: "“The world is infinitely kinder, brighter, and more radiant because your soul walks upon it, Sanjusree.”",
    description: "Today isn't just another calendar date. It is the anniversary of the day someone extraordinary was given to this world. May every dream you harbor quietly find its way into reality this year.",
    scrollPrompt: "Explore Our Memories",
  },

  // 3. The Memory Gallery (Floating Polaroids with Real Personal Photos)
  memories: [
    {
      id: "mem-saree",
      image: "/memories/photo-traditional-sarees.jpg",
      caption: "Pure grace, champagne gold & timeless elegance.",
      location: "Traditional Celebrations",
      date: "ROYAL MOMENTS",
      rotation: -2.5,
      note: "Draped in sarees, gold jhumkas, and radiant smiles. Standing beside you in our finest, realizing that true elegance comes from the warmth you carry within your heart, Sanju.",
    },
    {
      id: "mem-selfie",
      image: "/memories/photo-college-selfie.jpg",
      caption: "Cheek to cheek, no pretenses, just pure joy.",
      location: "College Days & Campus Sun",
      date: "UNBREAKABLE BOND",
      rotation: 2.8,
      note: "The lanyard around our necks, the afternoon sun in our eyes, and that unmistakable comfort of knowing I have you, Sanjusree, by my side through every class, every break, and every storm.",
    },
    {
      id: "mem-pout",
      image: "/memories/photo-playful-pout.jpg",
      caption: "Our dramatic poses & unfiltered laughter.",
      location: "Our Private World",
      date: "CANDID MADNESS",
      rotation: -3.2,
      note: "Because what is a true friendship without dramatic pouts, matching earrings, and laughing so hard that our stomachs hurt? With you, Sanju, I never have to hide who I am.",
    },
    {
      id: "mem-garden",
      image: "/memories/photo-campus-garden.jpg",
      caption: "Walking together under blossom trees.",
      location: "The Green Promenade",
      date: "SUNLIT PATHS",
      rotation: 2.1,
      note: "Surrounded by red blooms and lush greenery, talking about our dreams, our fears, and the future. Thank you for walking beside me on every step of this journey, Sanjusree.",
    },
  ],

  // 4. MY SPECIAL VIDEO EDIT – CINEMATIC SHOWCASE
  video: {
    title: "A Little Something I Made For You",
    subtitle: "Every second holds a little piece of appreciation.",
    url: "/videos/love.mp4",
    tagline: "CINEMATIC SHOWCASE • EXCLUSIVE PREMIERE",
    caption: "A montage of our laughs, our moments, and the magic of having you, Sanjusree, in my life.",
  },

  // 5. A Letter for You (Wax-Sealed Digital Parchment)
  letter: {
    salutation: "My Dearest Sanjusree,",
    paragraphs: [
      "There are very few people in this life who possess the rare ability to make you feel completely understood without having to utter a single word. You have been that person for me, Sanju, through every triumph, every quiet worry, and every mundane afternoon in between.",
      "Looking back at our photos—from our college selfies with lanyards to us dressed like queens in our traditional sarees—I am filled with so much gratitude. In you, I found not just a best friend, but a sister, a confidante, and a partner-in-crime whose loyalty never wavers.",
      "As you celebrate your birthday today, I want to remind you of things you often forget in your humility: your kindness isn't weakness—it's your superpower. Your smile brightens every room you walk into, and your presence is a comforting blessing to everyone lucky enough to know you.",
      "Never dim your light, Sanjusree. Never doubt your worth. May this year shower you with boundless happiness, fulfilling dreams, perfect health, and everything your gentle heart yearns for.",
    ],
    closing: "With endless love, admiration, and lifelong loyalty,",
    signature: "Your Forever Best Friend",
    postScript: "P.S. — Get ready for more crazy photo sessions, more saree days, and celebrating Sanju until the morning stars surrender!",
  },

  // 6. The Grand Finale
  finale: {
    headline: "HAPPY BIRTHDAY,",
    nameHighlight: "SANJUSREE",
    subheading: "May your upcoming year be as extraordinary, radiant, and timeless as you are, Sanjusree.",
    wishes: [
      { text: "Unbounded Joy & Pure Peace", icon: "Sparkles" },
      { text: "Endless Success in Every Dream", icon: "Compass" },
      { text: "Laughter That Leaves You Breathless", icon: "Heart" },
      { text: "A Bond That Lasts a Lifetime", icon: "Crown" },
    ],
    toastPrompt: "Raise a Champagne Toast to Sanjusree",
    replayButtonText: "Experience The Magic Again",
  },
};
