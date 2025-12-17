"use client"
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import './LatestPosts.css';
import { LatestUpdatesBG } from '../backgrounds/ThreeBackgrounds';

interface Post {
    id: number;
    user: string;
    time: string;
    image: string;
    caption: string;
}

const postsData: Post[] = [
    { id: 1, user: "MindBend", time: "2h ago", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "REGISTRATION PORTAL IS NOW LIVE! Join the action, sign up now at mindbend.com" },
    { id: 2, user: "MindBend", time: "5h ago", image: "https://images.unsplash.com/photo-1505373877841-8d43f7166778?w=800", caption: "NATIONAL CONFERENCE: Progress, Prosperity, Preservation - Sustainably Forever." },
    { id: 3, user: "MindBend", time: "1d ago", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", caption: "MEGA EVENT: MINDBEND IPL AUCTION. Prize Pool INR 15,000." },
    { id: 4, user: "MUN Club", time: "1d ago", image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800", caption: "SVNIT MUN 2025: Round 1 Delegate Registration OPEN." },
    { id: 5, user: "Tech Club", time: "2d ago", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800", caption: "Get ready for the biggest techno-managerial fest of Gujarat! #Mindbend2025" },
    { id: 6, user: "Robo Club", time: "3d ago", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", caption: "RoboWars registration closing soon. Don't miss out." },
    { id: 7, user: "Coding Club", time: "4d ago", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800", caption: "Hackathon themes announced! Check the website." },
];

const LatestPosts = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Tilt State
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % postsData.length);
            // Reset tilt on auto slide
            setTilt({ x: 0, y: 0 });
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Handle Mouse Move for Tilt Effect
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        if (!isHovering) setIsHovering(true);

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Slightly reduced max rotation for classier feel (max 10deg)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
        setIsPaused(false);
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
        setIsHovering(true);
    }

    const getCardClass = (index: number) => {
        const total = postsData.length;
        let diff = (index - activeIndex + total) % total;
        if (diff > total / 2) diff -= total;

        if (diff === 0) return 'card-active';
        if (diff === -1) return 'card-prev';
        if (diff === 1) return 'card-next';
        if (diff === -2) return 'card-prev-2';
        if (diff === 2) return 'card-next-2';

        return 'card-hidden';
    };

    return (
        <section className="latest-posts-section">
            {/* Background Elements */}
            <LatestUpdatesBG />

            <div className="latest-posts-header">
                <h2 className="posts-title" data-text="LATEST_UPDATES">LATEST_UPDATES</h2>
            </div>

            <div className="carousel-3d-container">
                {postsData.map((post, index) => {
                    const cardClass = getCardClass(index);
                    const isActive = cardClass === 'card-active';

                    // Dynamic Style for Tilt
                    // IMPORTANT: We remove the 'transition' on transform when hovering to make tilt instant.
                    // We keep it when NOT hovering so it transitions back to 0 smoothly.
                    const style: React.CSSProperties = isActive ? {
                        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`,
                        transition: isHovering ? 'none' : 'transform 0.5s ease', // Magic fix for lag
                    } : {};

                    return (
                        <div
                            key={post.id}
                            className={`carousel-card-wrapper ${cardClass}`}
                            onClick={() => setActiveIndex(index)}
                            ref={isActive ? cardRef : null}
                            onMouseMove={isActive ? handleMouseMove : undefined}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={style}
                        >
                            <div className="tech-card">
                                <div className="user-badge">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                                    {post.user}
                                </div>
                                <div className="post-time">{post.time}</div>

                                <div className="card-img-container">
                                    <img
                                        src={post.image}
                                        alt="Post"
                                        className="card-img"
                                        style={isActive ? {
                                            transform: `scale(1.1) translateX(${tilt.y * -0.8}px) translateY(${tilt.x * -0.8}px)`, // Enhanced parallax
                                            transition: isHovering ? 'none' : 'transform 0.5s ease',
                                        } : {}}
                                    />
                                    <div className="scanline-overlay"></div>
                                </div>

                                <div className="card-content">
                                    <p className="caption">{post.caption}</p>
                                    <button className="read-more-btn">Explore</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="carousel-dots">
                {postsData.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default LatestPosts;
