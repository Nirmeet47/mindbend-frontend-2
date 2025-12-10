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

export const IMAGES = [
  {
    id: 1,
    image: getImgSrc(img1),
    title: 'DALAL',
    subtitle: 'STREET',
    description: LOREM_IPSUM,
  },
  {
    id: 2,
    image: getImgSrc(img2),
    title: 'MANAGEMENT',
    subtitle: 'MATRIX',
    description: LOREM_IPSUM,
  },
  {
    id: 3,
    image: getImgSrc(img3),
    title: 'SURVIVAL',
    subtitle: 'SYMPHONY',
    description: LOREM_IPSUM,
  },
  {
    id: 4,
    image: getImgSrc(img4),
    title: 'IPL',
    subtitle: 'AUCTION',
    description: LOREM_IPSUM,
  },
  {
    id: 5,
    image: getImgSrc(img5),
    title: 'JEWEL OF',
    subtitle: 'JUMANJI',
    description: LOREM_IPSUM,
  },
  {
    id: 6,
    image: getImgSrc(img6),
    title: 'BOLLYWOOD',
    subtitle: 'MEME-O-LOGY',
    description: LOREM_IPSUM,
  },
  {
    id: 7,
    image: getImgSrc(img7),
    title: 'SUIT',
    subtitle: 'UP!',
    description: LOREM_IPSUM,
  },
  {
    id: 8,
    image: getImgSrc(img8),
    title: 'BUDGET',
    subtitle: 'BATTLEGROUNDS',
    description: LOREM_IPSUM,
  },
  {
    id: 9,
    image: getImgSrc(img9),
    title: 'AD',
    subtitle: 'VENTURE',
    description: LOREM_IPSUM,
  },
  {
    id: 10,
    image: getImgSrc(img10),
    title: 'CAN YOU BE',
    subtitle: 'THE KING',
    description: LOREM_IPSUM,
  },
  {
    id: 11,
    image: getImgSrc(img11),
    title: 'TIMELESS',
    subtitle: 'TALES ARENA',
    description: LOREM_IPSUM,
  },
];
