import { StaticImageData } from 'next/image';

// Import local images directly
import img1 from '../../static/1.png';
import img2 from '../../static/2.png';
import img3 from '../../static/3.png';
import img4 from '../../static/4.png';
import img5 from '../../static/5.png';
import img6 from '../../static/6.png';
import img7 from '../../static/7.png';
import img8 from '../../static/8.png';
import img9 from '../../static/9.png';
import img10 from '../../static/10.png';
import img11 from '../../static/11.png';

export const PLANE_WIDTH = 5.5; // Slightly larger than original 5, but not 7.5
export const PLANE_HEIGHT = 3.5; 
export const GAP = 0.5;
export const TOTAL_WIDTH = PLANE_WIDTH + GAP;

// Bending strength for vertex shader
// Lower value = Larger Radius (Flatter curve)
// Higher value = Smaller Radius (More curved)
export const X_AXIS_BEND_STRENGTH = 0.05; // Even flatter for larger radius effect 

// Helper to get image source string
const getImgSrc = (img: StaticImageData | any) => {
  return img.src || img;
};

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export interface EventData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  type?: 'technical' | 'managerial';
  isTeamEvent?: boolean;
  prizeMoney?: number;
  entryFee?: number;
  psLink?: string;
  unstopLink?: string;
  whatsappNo?: string;
  whatsappGrpLink?: string;
  prizeDistribution?: {
    first: number;
    second: number;
    third: number;
  };
  maxTeamSize?: number;
  minTeamSize?: number;
  registrationDeadline?: string;
  eventDate?: string;
  venue?: string;
  rules?: string[];
  hideEvent?: boolean;
  stopRegistration?: boolean;
}

export const IMAGES: EventData[] = [
  {
    id: 1,
    image: getImgSrc(img1),
    title: 'DALAL',
    subtitle: 'STREET',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: true,
    prizeMoney: 50000,
    entryFee: 100,
    venue: 'Block A, Room 301',
    eventDate: '2025-01-15',
    registrationDeadline: '2025-01-10',
    minTeamSize: 2,
    maxTeamSize: 4,
    prizeDistribution: { first: 25000, second: 15000, third: 10000 },
    rules: [
      'SQUAD SIZE: 2-4 OPERATIVES REQUIRED.',
      'NO EXTERNAL COMMS DEVICES ALLOWED IN SECURE ZONES.',
      'ALL DECISIONS BY THE HIGH COUNCIL (JUDGES) ARE FINAL.',
      'LATE ARRIVALS WILL BE DISQUALIFIED IMMEDIATELY.'
    ],
    psLink: '',
    unstopLink: '',
    whatsappNo: '+91 9876543210',
    whatsappGrpLink: '',
  },
  {
    id: 2,
    image: getImgSrc(img2),
    title: 'MANAGEMENT',
    subtitle: 'MATRIX',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: true,
    prizeMoney: 40000,
    entryFee: 100,
    venue: 'Block B, Auditorium',
    eventDate: '2025-01-16',
    registrationDeadline: '2025-01-11',
    minTeamSize: 3,
    maxTeamSize: 5,
    prizeDistribution: { first: 20000, second: 12000, third: 8000 },
    rules: [
      'TEAM SIZE: 3-5 MEMBERS REQUIRED.',
      'LAPTOPS AND CALCULATORS PERMITTED.',
      'JUDGE DECISIONS ARE BINDING.',
      'PUNCTUALITY IS MANDATORY.'
    ],
  },
  {
    id: 3,
    image: getImgSrc(img3),
    title: 'SURVIVAL',
    subtitle: 'SYMPHONY',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: true,
    prizeMoney: 35000,
    entryFee: 50,
    venue: 'Outdoor Arena',
    eventDate: '2025-01-17',
    registrationDeadline: '2025-01-12',
    minTeamSize: 2,
    maxTeamSize: 3,
    prizeDistribution: { first: 18000, second: 10000, third: 7000 },
    rules: [
      'TEAM SIZE: 2-3 MEMBERS.',
      'PHYSICAL FITNESS REQUIRED.',
      'FOLLOW ALL SAFETY PROTOCOLS.',
      'NO EXTERNAL HELP ALLOWED.'
    ],
  },
  {
    id: 4,
    image: getImgSrc(img4),
    title: 'IPL',
    subtitle: 'AUCTION',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: true,
    prizeMoney: 30000,
    entryFee: 100,
    venue: 'Sports Complex',
    eventDate: '2025-01-18',
    registrationDeadline: '2025-01-13',
    minTeamSize: 4,
    maxTeamSize: 6,
    prizeDistribution: { first: 15000, second: 10000, third: 5000 },
    rules: [
      'TEAM SIZE: 4-6 MEMBERS.',
      'CRICKET KNOWLEDGE ESSENTIAL.',
      'FAIR PLAY MANDATORY.',
      'TIME LIMITS STRICTLY ENFORCED.'
    ],
  },
  {
    id: 5,
    image: getImgSrc(img5),
    title: 'JEWEL OF',
    subtitle: 'JUMANJI',
    description: LOREM_IPSUM,
    type: 'technical',
    isTeamEvent: true,
    prizeMoney: 45000,
    entryFee: 150,
    venue: 'Tech Lab 1',
    eventDate: '2025-01-15',
    registrationDeadline: '2025-01-10',
    minTeamSize: 2,
    maxTeamSize: 4,
    prizeDistribution: { first: 22000, second: 13000, third: 10000 },
    rules: [
      'TEAM SIZE: 2-4 MEMBERS.',
      'CODING SKILLS REQUIRED.',
      'BRING YOUR OWN LAPTOP.',
      'NO PLAGIARISM ALLOWED.'
    ],
  },
  {
    id: 6,
    image: getImgSrc(img6),
    title: 'BOLLYWOOD',
    subtitle: 'MEME-O-LOGY',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: false,
    prizeMoney: 15000,
    entryFee: 50,
    venue: 'Media Room',
    eventDate: '2025-01-16',
    registrationDeadline: '2025-01-11',
    minTeamSize: 1,
    maxTeamSize: 1,
    prizeDistribution: { first: 8000, second: 4000, third: 3000 },
    rules: [
      'INDIVIDUAL EVENT.',
      'BOLLYWOOD KNOWLEDGE REQUIRED.',
      'CREATIVITY COUNTS.',
      'NO OFFENSIVE CONTENT.'
    ],
  },
  {
    id: 7,
    image: getImgSrc(img7),
    title: 'SUIT',
    subtitle: 'UP!',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: false,
    prizeMoney: 20000,
    entryFee: 75,
    venue: 'Fashion Arena',
    eventDate: '2025-01-17',
    registrationDeadline: '2025-01-12',
    minTeamSize: 1,
    maxTeamSize: 1,
    prizeDistribution: { first: 10000, second: 6000, third: 4000 },
    rules: [
      'INDIVIDUAL PARTICIPATION.',
      'FORMAL ATTIRE MANDATORY.',
      'CONFIDENCE IS KEY.',
      'TIME LIMIT: 3 MINUTES.'
    ],
  },
  {
    id: 8,
    image: getImgSrc(img8),
    title: 'BUDGET',
    subtitle: 'BATTLEGROUNDS',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: true,
    prizeMoney: 35000,
    entryFee: 100,
    venue: 'Finance Lab',
    eventDate: '2025-01-18',
    registrationDeadline: '2025-01-13',
    minTeamSize: 3,
    maxTeamSize: 4,
    prizeDistribution: { first: 18000, second: 10000, third: 7000 },
    rules: [
      'TEAM SIZE: 3-4 MEMBERS.',
      'FINANCIAL KNOWLEDGE REQUIRED.',
      'CALCULATORS ALLOWED.',
      'PRESENTATION SKILLS MATTER.'
    ],
  },
  {
    id: 9,
    image: getImgSrc(img9),
    title: 'AD',
    subtitle: 'VENTURE',
    description: LOREM_IPSUM,
    type: 'managerial',
    isTeamEvent: true,
    prizeMoney: 25000,
    entryFee: 75,
    venue: 'Creative Studio',
    eventDate: '2025-01-19',
    registrationDeadline: '2025-01-14',
    minTeamSize: 2,
    maxTeamSize: 5,
    prizeDistribution: { first: 12000, second: 8000, third: 5000 },
    rules: [
      'TEAM SIZE: 2-5 MEMBERS.',
      'CREATIVITY ESSENTIAL.',
      'PROPS ALLOWED.',
      'TIME LIMIT: 5 MINUTES.'
    ],
  },
  {
    id: 10,
    image: getImgSrc(img10),
    title: 'CAN YOU BE',
    subtitle: 'THE KING',
    description: LOREM_IPSUM,
    type: 'technical',
    isTeamEvent: false,
    prizeMoney: 30000,
    entryFee: 100,
    venue: 'Gaming Zone',
    eventDate: '2025-01-20',
    registrationDeadline: '2025-01-15',
    minTeamSize: 1,
    maxTeamSize: 1,
    prizeDistribution: { first: 15000, second: 10000, third: 5000 },
    rules: [
      'INDIVIDUAL EVENT.',
      'GAMING SKILLS REQUIRED.',
      'FAIR PLAY MANDATORY.',
      'NO CHEATING ALLOWED.'
    ],
  },
  {
    id: 11,
    image: getImgSrc(img11),
    title: 'TIMELESS',
    subtitle: 'TALES ARENA',
    description: LOREM_IPSUM,
    type: 'technical',
    isTeamEvent: true,
    prizeMoney: 40000,
    entryFee: 125,
    venue: 'Conference Hall',
    eventDate: '2025-01-21',
    registrationDeadline: '2025-01-16',
    minTeamSize: 2,
    maxTeamSize: 3,
    prizeDistribution: { first: 20000, second: 12000, third: 8000 },
    rules: [
      'TEAM SIZE: 2-3 MEMBERS.',
      'STORYTELLING SKILLS REQUIRED.',
      'PRESENTATION MATTERS.',
      'TIME LIMIT: 10 MINUTES.'
    ],
  },
];
