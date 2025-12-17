'use client';
import React, { useState, useEffect } from 'react';
import './Committee.css';
import { CommitteeBG } from '../backgrounds/ThreeBackgrounds';

interface Member {
    id: number;
    name: string;
    role: string;
    image: string;
    color: string;
}

interface CommitteeData {
    chairperson: Member;
    coChairpersons: Member[];
    ccrs: Member[];
}

const initialData: CommitteeData = {
    chairperson: {
        id: 1,
        name: 'Prof. (Dr.) Arvind Kumar Mungray',
        role: 'Chairperson',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        color: '#FFD700'
    },
    coChairpersons: [
        { id: 2, name: 'Dr. Kishor P. Upla', role: 'Co-Chairperson', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', color: '#00BFFF' },
        { id: 3, name: 'Dr. Sarita Kalla', role: 'Co-Chairperson', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', color: '#FF6B9D' },
        { id: 4, name: 'Dr. Vivek Kalyankar', role: 'Co-Chairperson', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', color: '#7FFF00' },
        { id: 5, name: 'Dr. Suresh Dahiya', role: 'Co-Chairperson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', color: '#9D4EDD' }
    ],
    ccrs: [
        { id: 6, name: 'Mr. Yug Rana', role: 'CCRS', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', color: '#FF6B35' }
    ]
};

const Committee: React.FC = () => {
    const [committeeData, setCommitteeData] = useState<CommitteeData | null>(null);

    useEffect(() => {
        // Simulating data fetching
        setCommitteeData(initialData);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        const cards = document.querySelectorAll('.hex-wrapper');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, [committeeData]); // Re-run when data is loaded

    if (!committeeData) return null;

    return (
        <section className="committee-section">
            <CommitteeBG />
            <div className="committee-container">
                {/* Header */}
                <div className="committee-header">
                    <div className="header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h2 className="committee-title" data-text="COMMITTEE">Committee</h2>
                </div>

                {/* Hexagonal Grid - Hierarchical Arrangement */}
                <div className="hexagon-grid">
                    {/* Chairperson Row */}
                    <div className="hex-row chairperson-row">
                        <div className="hex-wrapper hex-large">
                            <div className="hex-card" style={{ '--member-color': committeeData.chairperson.color } as React.CSSProperties}>
                                <div className="hex-border">
                                    <div className="hex-content">
                                        <div className="hex-image-container">
                                            <img src={committeeData.chairperson.image} alt={committeeData.chairperson.name} className="hex-image" />
                                        </div>
                                        <div className="hex-info">
                                            <h3 className="hex-name">{committeeData.chairperson.name}</h3>
                                            <p className="hex-role">{committeeData.chairperson.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Co-Chairpersons Row */}
                    <div className="hex-row co-chairs-row">
                        {committeeData.coChairpersons.map((member, index) => (
                            <div key={member.id} className="hex-wrapper hex-medium" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="hex-card" style={{ '--member-color': member.color } as React.CSSProperties}>
                                    <div className="hex-border">
                                        <div className="hex-content">
                                            <div className="hex-image-container">
                                                <img src={member.image} alt={member.name} className="hex-image" />
                                            </div>
                                            <div className="hex-info">
                                                <h3 className="hex-name">{member.name}</h3>
                                                <p className="hex-role">{member.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CCRS Row */}
                    <div className="hex-row ccrs-row">
                        {committeeData.ccrs.map((member, index) => (
                            <div key={member.id} className="hex-wrapper hex-regular" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="hex-card" style={{ '--member-color': member.color } as React.CSSProperties}>
                                    <div className="hex-border">
                                        <div className="hex-content">
                                            <div className="hex-image-container">
                                                <img src={member.image} alt={member.name} className="hex-image" />
                                            </div>
                                            <div className="hex-info">
                                                <h3 className="hex-name">{member.name}</h3>
                                                <p className="hex-role">{member.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="committee-footer">
                    <p>Site crafted by team MB</p>
                </div>
            </div>
        </section>
    );
};

export default Committee;
