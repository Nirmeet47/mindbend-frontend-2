
export interface WorkshopData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    date: string;
    fee: string;
    image?: string;
}

export const WORKSHOPS: WorkshopData[] = [
    {
        id: 1,
        title: 'Generative AI',
        subtitle: 'Bootcamp',
        description: 'Dive deep into the world of LLMs and Generative Adversarial Networks. Build your own models.',
        date: 'March 15, 2025',
        fee: '₹499',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 2,
        title: 'Cyber Security',
        subtitle: 'Ethical Hacking',
        description: 'Learn the fundamentals of penetration testing and network defense strategies.',
        date: 'March 16, 2025',
        fee: '₹599',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 3,
        title: 'IoT & Robotics',
        subtitle: 'Hands-on',
        description: 'Build smart devices and integrate them with cloud platforms in this intensive session.',
        date: 'March 17, 2025',
        fee: '₹699',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'
    }
];
