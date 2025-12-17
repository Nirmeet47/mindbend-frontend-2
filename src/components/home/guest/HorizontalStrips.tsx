import React, { lazy, Suspense } from 'react';
import './HorizontalStrips.css';
import { WorkshopsBG, SponsorsBG, LecturesBG } from '../backgrounds/ThreeBackgrounds';

interface Card {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    color: string;
}

const workshopsData: Card[] = [
    { id: 1, title: 'Coming Soon', category: 'Workshop', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', description: 'Stay tuned for updates', color: '#00D9FF' },
    { id: 2, title: 'Coming Soon', category: 'Workshop', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', description: 'Stay tuned for updates', color: '#FF6B35' },
    { id: 3, title: 'Coming Soon', category: 'Workshop', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', description: 'Stay tuned for updates', color: '#7FFF00' },
    { id: 4, title: 'Coming Soon', category: 'Workshop', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', description: 'Stay tuned for updates', color: '#00D9FF' },
];

const sponsorsData: Card[] = [
    { id: 1, title: 'YAMAHA', category: 'Sponsor', image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800', description: 'Premium Partner', color: '#E60012' },
    { id: 2, title: 'HONDA', category: 'Sponsor', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800', description: 'Gold Sponsor', color: '#CC0000' },
    { id: 3, title: 'EaseMyTrip', category: 'Sponsor', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', description: 'Travel Partner', color: '#00A8E8' },
    { id: 4, title: 'WEC', category: 'Sponsor', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', description: 'Technology Partner', color: '#0066CC' },
    { id: 5, title: 'Sponsor', category: 'Sponsor', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', description: 'Supporting Partner', color: '#FFD700' },
    { id: 6, title: 'Sponsor', category: 'Sponsor', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', description: 'Supporting Partner', color: '#4169E1' },
];

const lecturesData: Card[] = [
    { id: 1, title: 'Aman Dhattarwal', category: 'Lecture', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', description: 'YouTuber & Educator', color: '#FFD700' },
    { id: 2, title: 'Yogendrasinh Vadev', category: 'Lecture', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800', description: 'Air Marshal', color: '#00BFFF' },
    { id: 3, title: 'Sandeep Jain', category: 'Lecture', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800', description: 'Founder, GeeksforGeeks', color: '#8B4513' },
    { id: 4, title: 'Shradha Khapra', category: 'Lecture', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800', description: 'YouTuber & Educator', color: '#4169E1' },
];

// SVG Decorations
const TechDecorationTopLeft = ({ color }: { color: string }) => (
    <svg className="tech-decoration tech-decoration-tl" viewBox="0 0 64 64" fill="none">
        <defs>
            <linearGradient id={`grad-tl-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
        </defs>
        <path d="M0 64V16L16 0H64" stroke={`url(#grad-tl-${color})`} strokeWidth="2" />
        <circle cx="16" cy="16" r="2" fill={color} className="tech-pulse" />
        <path d="M6 16H26" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
        <path d="M16 6V26" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    </svg>
);

const TechDecorationTopRight = ({ color }: { color: string }) => (
    <svg className="tech-decoration tech-decoration-tr" viewBox="0 0 48 48" fill="none">
        <defs>
            <linearGradient id={`grad-tr-${color}`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
        </defs>
        <path d="M0 0H32L48 16V32" stroke={`url(#grad-tr-${color})`} strokeWidth="2" />
        <rect x="42" y="6" width="3" height="3" fill={color} />
    </svg>
);

const TechDecorationBottomLeft = ({ color }: { color: string }) => (
    <svg className="tech-decoration tech-decoration-bl" viewBox="0 0 48 48" fill="none">
        <path d="M0 32V48H16" stroke={color} strokeWidth="2" />
        <path d="M0 32L16 48" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
);

const TechDecorationBottomRight = ({ color }: { color: string }) => (
    <svg className="tech-decoration tech-decoration-br" viewBox="0 0 80 80" fill="none">
        <defs>
            <linearGradient id={`grad-br-${color}`} x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
        </defs>
        <path d="M80 0V48L64 64H32L16 80H0" stroke={`url(#grad-br-${color})`} strokeWidth="2" />
        <g transform="translate(60, 60)">
            <circle cx="0" cy="0" r="12" stroke={color} strokeWidth="1" strokeOpacity="0.8" strokeDasharray="10 5" className="tech-rotate" />
            <circle cx="0" cy="0" r="6" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.2" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" className="tech-pulse" />
        </g>
    </svg>
);

interface StripProps {
    title: string;
    cards: Card[];
    direction: 'left' | 'right';
    effect?: 'scanline' | 'flicker' | 'matrix';
    variant?: 'cards' | 'logos';
}

const HorizontalStrip: React.FC<StripProps> = ({ title, cards, direction, effect = 'scanline', variant = 'cards' }) => {
    const duplicatedCards = [...cards, ...cards, ...cards];

    return (
        <div className="horizontal-strip">
            {/* 3D Background Injection based on effect type */}
            {effect === 'scanline' && <WorkshopsBG />}
            {effect === 'flicker' && <SponsorsBG />}
            {effect === 'matrix' && <LecturesBG />}

            <div className="strip-header">
                <h2 className={`strip-title effect-${effect}`} data-text={title}>{title}</h2>
            </div>

            <div className="strip-container">
                <div className={`strip-track ${direction === 'left' ? 'scroll-left' : 'scroll-right'}`}>
                    {duplicatedCards.map((card, index) => (
                        <div key={`${card.id}-${index}`} className={variant === 'logos' ? "strip-logo-card" : "strip-card"}>
                            {variant === 'logos' ? (
                                /* LOGO ONLY VARIANT */
                                <div className="logo-wrapper">
                                    <img src={card.image} alt={card.title} className="sponsor-logo" />
                                </div>
                            ) : (
                                /* STANDARD CARD VARIANT */
                                <>
                                    {/* Sparkle Background - Around Card */}
                                    <div className="sparkle-bg" style={{ '--card-color': card.color } as React.CSSProperties}></div>

                                    <div className="card-border" style={{ '--card-color': card.color } as React.CSSProperties}>
                                        {/* Tech Decorations */}
                                        <TechDecorationTopLeft color={card.color} />
                                        <TechDecorationTopRight color={card.color} />
                                        <TechDecorationBottomLeft color={card.color} />
                                        <TechDecorationBottomRight color={card.color} />

                                        {/* Gradient Border Lines */}
                                        <div className="border-line border-line-top"></div>
                                        <div className="border-line border-line-right"></div>
                                        <div className="border-line border-line-bottom"></div>
                                        <div className="border-line border-line-left"></div>

                                        <div className="card-inner">
                                            <div className="card-image-container">
                                                <img src={card.image} alt={card.title} className="card-image" />
                                                <div className="image-overlay"></div>
                                            </div>
                                            <div className="card-info">
                                                <span className="card-category">{card.category}</span>
                                                <h3 className="card-title">{card.title}</h3>
                                                <p className="card-description">{card.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="explore-button-container">
                <button className="explore-button">
                    <span>Explore</span>
                    <div className="button-shine"></div>
                </button>
            </div>
        </div>
    );
};

const HorizontalStrips: React.FC = () => {
    return (
        <section className="horizontal-strips-section">
            <HorizontalStrip title="Workshops" cards={workshopsData} direction="left" effect="scanline" />
            <HorizontalStrip title="Past Sponsors" cards={sponsorsData} direction="right" effect="flicker" variant="logos" />
            <HorizontalStrip title="Past Lectures" cards={lecturesData} direction="left" effect="matrix" />
        </section>
    );
};

export default HorizontalStrips;
