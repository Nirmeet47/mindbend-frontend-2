'use client';

import React, { useState, useEffect } from 'react';
import './CategorySlider.css';

interface EventCard {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    color: string;
}

interface SlideCategory {
    id: number;
    title: string;
    subtitle: string;
    tagline: string;
    backgroundImage: string;
    cards: EventCard[];
    animationDirection?: 'left' | 'right'; // Animation direction for cards
}

const slidesData: SlideCategory[] = [
    {
        id: 1,
        title: 'Workshops',
        subtitle: '',
        tagline: '',
        backgroundImage: '/slides/workshops-coming-soon-bg.jpg',
        animationDirection: 'left', // Slide in from left
        cards: [
            {
                id: 1,
                title: 'Coming Soon',
                category: 'Workshop',
                image: '/events/workshop-1.jpg',
                description: 'Stay tuned for updates',
                color: '#00D9FF',
            },
            {
                id: 2,
                title: 'Coming Soon',
                category: 'Workshop',
                image: '/events/workshop-2.jpg',
                description: 'Stay tuned for updates',
                color: '#FF6B35',
            },
            {
                id: 3,
                title: 'Coming Soon',
                category: 'Workshop',
                image: '/events/workshop-3.jpg',
                description: 'Stay tuned for updates',
                color: '#7FFF00',
            },
            {
                id: 4,
                title: 'Coming Soon',
                category: 'Workshop',
                image: '/events/workshop-4.jpg',
                description: 'Stay tuned for updates',
                color: '#00D9FF',
            },
        ],
    },
    {
        id: 2,
        title: 'Past Sponsors',
        subtitle: '',
        tagline: '',
        backgroundImage: '/slides/sponsors-bg.jpg',
        animationDirection: 'right', // Slide in from right
        cards: [
            {
                id: 1,
                title: 'YAMAHA',
                category: 'Sponsor',
                image: '/sponsors/yamaha.png',
                description: 'Premium Partner',
                color: '#E60012',
            },
            {
                id: 2,
                title: 'HONDA',
                category: 'Sponsor',
                image: '/sponsors/honda.png',
                description: 'Gold Sponsor',
                color: '#CC0000',
            },
            {
                id: 3,
                title: 'EaseMyTrip',
                category: 'Sponsor',
                image: '/sponsors/easemytrip.png',
                description: 'Travel Partner',
                color: '#00A8E8',
            },
            {
                id: 4,
                title: 'WEC',
                category: 'Sponsor',
                image: '/sponsors/wec.png',
                description: 'Technology Partner',
                color: '#0066CC',
            },
            {
                id: 5,
                title: 'Sponsor',
                category: 'Sponsor',
                image: '/sponsors/sponsor-5.png',
                description: 'Supporting Partner',
                color: '#FFD700',
            },
            {
                id: 6,
                title: 'Sponsor',
                category: 'Sponsor',
                image: '/sponsors/sponsor-6.png',
                description: 'Supporting Partner',
                color: '#4169E1',
            },
        ],
    },
    {
        id: 3,
        title: 'WORKSHOPS',
        subtitle: 'TECHNICAL',
        tagline: 'INNOVATE - BUILD - LEARN',
        backgroundImage: '/slides/workshops-bg.jpg',
        cards: [
            {
                id: 1,
                title: 'AI & Machine Learning',
                category: 'Workshop',
                image: '/events/ai-workshop.jpg',
                description: 'Deep dive into AI and ML fundamentals',
                color: '#FF6B6B',
            },
            {
                id: 2,
                title: 'Web Development',
                category: 'Workshop',
                image: '/events/web-dev.jpg',
                description: 'Build modern web applications',
                color: '#4ECDC4',
            },
            {
                id: 3,
                title: 'Robotics',
                category: 'Workshop',
                image: '/events/robotics.jpg',
                description: 'Hands-on robotics and automation',
                color: '#FFE66D',
            },
            {
                id: 4,
                title: 'Blockchain',
                category: 'Workshop',
                image: '/events/blockchain.jpg',
                description: 'Decentralized technology workshop',
                color: '#A8E6CF',
            },
        ],
    },
    {
        id: 4,
        title: 'COMPETITIONS',
        subtitle: 'THRILLING',
        tagline: 'INNOVATE - COMPETE - CONQUER',
        backgroundImage: '/slides/competitions-bg.jpg',
        cards: [
            {
                id: 1,
                title: 'Hackathon',
                category: 'Competition',
                image: '/events/hackathon.jpg',
                description: '24-hour coding marathon',
                color: '#FF6B9D',
            },
            {
                id: 2,
                title: 'Code Sprint',
                category: 'Competition',
                image: '/events/code-sprint.jpg',
                description: 'Speed coding challenge',
                color: '#C44569',
            },
            {
                id: 3,
                title: 'Robo Wars',
                category: 'Competition',
                image: '/events/robowars.jpg',
                description: 'Battle of the bots',
                color: '#F8B500',
            },
            {
                id: 4,
                title: 'Tech Quiz',
                category: 'Competition',
                image: '/events/quiz.jpg',
                description: 'Test your tech knowledge',
                color: '#6C5CE7',
            },
        ],
    },
    {
        id: 5,
        title: 'LECTURES',
        subtitle: 'INSIGHTFUL',
        tagline: 'THINK - INSPIRE - INNOVATE',
        backgroundImage: '/slides/lectures-bg.jpg',
        cards: [
            {
                id: 1,
                title: 'Aman Dhattarwal',
                category: 'Lecture',
                image: '/lecturers/aman.jpg',
                description: 'YouTuber & Educator',
                color: '#FFD700',
            },
            {
                id: 2,
                title: 'Yogendrasinh Vadev',
                category: 'Lecture',
                image: '/lecturers/yogendra.jpg',
                description: 'Air Marshal',
                color: '#00BFFF',
            },
            {
                id: 3,
                title: 'Sandeep Jain',
                category: 'Lecture',
                image: '/lecturers/sandeep.jpg',
                description: 'Founder, GeeksforGeeks',
                color: '#8B4513',
            },
            {
                id: 4,
                title: 'Shradha Khapra',
                category: 'Lecture',
                image: '/lecturers/shradha.jpg',
                description: 'YouTuber & Educator',
                color: '#4169E1',
            },
        ],
    },
];

const CategorySlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
        setTimeout(() => setIsAnimating(false), 800);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
        setTimeout(() => setIsAnimating(false), 800);
    };

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 800);
    };

    return (
        <section className="category-slider">
            <div className="slider-container">
                {slidesData.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'prev' : 'next'
                            }`}
                        style={{
                            backgroundImage: `url(${slide.backgroundImage})`,
                        }}
                    >
                        <div className="slide-overlay"></div>

                        <div className="slide-content">
                            {slide.subtitle || slide.tagline ? (
                                <div className="slide-header">
                                    <p className="slide-subtitle">{slide.subtitle}</p>
                                    <h2 className="slide-title">{slide.title}</h2>
                                    <p className="slide-tagline">{slide.tagline}</p>
                                </div>
                            ) : (
                                <div className="slide-header-simple">
                                    <h2 className="slide-title-simple">{slide.title}</h2>
                                </div>
                            )}

                            <div
                                className={`cards-grid ${slide.animationDirection === 'left' ? 'slide-from-left' :
                                        slide.animationDirection === 'right' ? 'slide-from-right' : ''
                                    }`}
                            >
                                {slide.cards.map((card, cardIndex) => (
                                    <div
                                        key={card.id}
                                        className="event-card"
                                        style={{
                                            animationDelay: `${cardIndex * 0.1}s`,
                                        }}
                                    >
                                        <div
                                            className="card-border"
                                            style={{
                                                '--card-color': card.color,
                                            } as React.CSSProperties}
                                        >
                                            <div className="card-inner">
                                                <div className="card-image-container">
                                                    <img
                                                        src={card.image}
                                                        alt={card.title}
                                                        className="card-image"
                                                    />
                                                </div>
                                                <div className="card-info">
                                                    <span className="card-category">{card.category}</span>
                                                    <h3 className="card-title">{card.title}</h3>
                                                    <p className="card-description">{card.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Explore Button */}
                            <div className="explore-button-container">
                                <button className="explore-button">
                                    <span>Explore</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <button
                className="nav-button prev-button"
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button
                className="nav-button next-button"
                onClick={nextSlide}
                aria-label="Next slide"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="dot-indicators">
                {slidesData.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategorySlider;
