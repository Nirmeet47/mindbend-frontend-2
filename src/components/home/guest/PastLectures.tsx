'use client';

import React, { useEffect, useRef, useState } from 'react';
import './PastLectures.css';

interface Lecturer {
  id: number;
  name: string;
  designation: string;
  image: string;
  color: string; // Border color for each card
}

const lectureData: Lecturer[] = [
  {
    id: 1,
    name: 'Aman Dhattarwal',
    designation: 'YouTuber',
    image: '/lecturers/aman.jpg',
    color: '#FFD700', // Gold
  },
  {
    id: 2,
    name: 'Yogendrasinh Vadev',
    designation: 'Air Marshal',
    image: '/lecturers/yogendra.jpg',
    color: '#00BFFF', // Blue
  },
  {
    id: 3,
    name: 'Sandeep Jain',
    designation: 'Founder, GeeksforGeeks',
    image: '/lecturers/sandeep.jpg',
    color: '#8B4513', // Brown
  },
  {
    id: 4,
    name: 'Shradha Khapra',
    designation: 'YouTuber',
    image: '/lecturers/shradha.jpg',
    color: '#4169E1', // Royal Blue
  },
];

const PastLectures: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(index));
              }, index * 150); // Staggered animation delay
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px',
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="past-lectures-section">
      <div className="past-lectures-container">
        <div className="section-header">
          <h2 className="section-title">Past Lectures</h2>
        </div>

        <div className="lectures-grid">
          {lectureData.map((lecturer, index) => (
            <div
              key={lecturer.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`lecture-card ${visibleCards.has(index) ? 'visible' : ''}`}
            >
              <div
                className="card-border"
                style={{
                  '--border-color': lecturer.color
                } as React.CSSProperties}
              >
                <div className="card-inner">
                  <div className="image-container">
                    <img
                      src={lecturer.image}
                      alt={lecturer.name}
                      className="lecturer-image"
                    />
                  </div>
                  <div className="card-info">
                    <h3 className="lecturer-name">{lecturer.name}</h3>
                    <p className="lecturer-designation">{lecturer.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="explore-button-container">
          <button className="explore-button">
            <span>Explore</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PastLectures;
