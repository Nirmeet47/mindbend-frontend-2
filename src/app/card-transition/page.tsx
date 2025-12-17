'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Trophy, Clock, Star, MapPin } from 'lucide-react';
import Image from 'next/image';

interface EventCard {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  location: string;
  rating: number;
  participants: number;
  description: string;
  prize: string;
  duration: string;
  teamSize: string;
}

const eventCards: EventCard[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    title: 'Hackathon 2025',
    subtitle: 'Code. Create. Conquer.',
    category: 'Technical',
    date: 'Jan 15-17, 2025',
    location: 'Tech Hub',
    rating: 4.8,
    participants: 500,
    description: 'Join the ultimate 48-hour coding marathon where innovation meets competition. Build groundbreaking solutions, collaborate with brilliant minds, and compete for amazing prizes. This is your chance to showcase your technical prowess and turn ideas into reality.',
    prize: '₹1,50,000',
    duration: '48 hours',
    teamSize: '2-4 members',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    title: 'Business Conclave',
    subtitle: 'Lead. Innovate. Excel.',
    category: 'Management',
    date: 'Jan 20-22, 2025',
    location: 'Convention Center',
    rating: 4.9,
    participants: 350,
    description: 'Experience the most prestigious business competition of the year. Tackle real-world case studies, pitch innovative business ideas, and network with industry leaders. Sharpen your strategic thinking and leadership skills in this intensive three-day event.',
    prize: '₹2,00,000',
    duration: '3 days',
    teamSize: '3-5 members',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    title: 'Cultural Fest',
    subtitle: 'Celebrate. Perform. Inspire.',
    category: 'Cultural',
    date: 'Feb 1-3, 2025',
    location: 'Open Air Theatre',
    rating: 4.7,
    participants: 800,
    description: 'Immerse yourself in a spectacular celebration of art, music, and culture. Witness breathtaking performances, participate in creative competitions, and experience diversity like never before. This three-day extravaganza promises unforgettable memories.',
    prize: '₹75,000',
    duration: '3 days',
    teamSize: '1-6 members',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800',
    title: 'Sports Championship',
    subtitle: 'Compete. Triumph. Glory.',
    category: 'Sports',
    date: 'Feb 10-12, 2025',
    location: 'Sports Complex',
    rating: 4.6,
    participants: 600,
    description: 'Gear up for the most electrifying sports tournament featuring multiple disciplines. From cricket to basketball, showcase your athletic prowess and team spirit. Compete against the best, push your limits, and bring home the championship trophy.',
    prize: '₹1,00,000',
    duration: '3 days',
    teamSize: '5-11 members',
  },
];

export default function CardTransitionAnimation() {
  const [selectedCard, setSelectedCard] = useState<EventCard | null>(null);

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <AnimatePresence mode="wait">
          {!selectedCard ? (
            <CardListView
              key="list"
              cards={eventCards}
              onCardClick={setSelectedCard}
            />
          ) : (
            <DetailView
              key="detail"
              card={selectedCard}
              onBack={() => setSelectedCard(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

function CardListView({ cards, onCardClick }: { cards: EventCard[]; onCardClick: (card: EventCard) => void }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tappedId, setTappedId] = useState<number | null>(null);

  const handleCardClick = (card: EventCard) => {
    setTappedId(card.id);
    setTimeout(() => {
      onCardClick(card);
      setTappedId(null);
    }, 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-slate-600 mt-1">Tap any event to explore details</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layoutId={`card-container-${card.id}`}
              onClick={() => handleCardClick(card)}
              onHoverStart={() => setHoveredId(card.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: tappedId === card.id ? 1.08 : hoveredId === card.id ? 1.02 : 1,
              }}
              transition={{ 
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              whileTap={{ scale: 1.08 }}
            >
              <motion.div
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow: tappedId === card.id 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    : hoveredId === card.id
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Card Image */}
                <motion.div
                  layoutId={`card-image-${card.id}`}
                  className="relative h-48 overflow-hidden bg-slate-100"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <motion.div
                    layoutId={`card-category-${card.id}`}
                    className="absolute top-4 left-4"
                  >
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
                      {card.category}
                    </span>
                  </motion.div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-slate-700">{card.rating}</span>
                  </div>
                </motion.div>

                {/* Card Content */}
                <div className="p-6">
                  <motion.h3
                    layoutId={`card-title-${card.id}`}
                    className="text-2xl font-bold text-slate-900 mb-1"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`card-subtitle-${card.id}`}
                    className="text-sm text-slate-600 mb-4"
                  >
                    {card.subtitle}
                  </motion.p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{card.date.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{card.location}</span>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{card.participants} participants</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">View Details →</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DetailView({ card, onBack }: { card: EventCard; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h2 className="text-lg font-semibold text-slate-900">Event Details</h2>
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        layoutId={`card-image-${card.id}`}
        className="relative h-[50vh] overflow-hidden bg-slate-100 mt-16"
        transition={{
          duration: 0.75,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      >
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        
        {/* Category Badge */}
        <motion.div
          layoutId={`card-category-${card.id}`}
          className="absolute top-6 left-6"
          transition={{ duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-slate-700 shadow-lg">
            {card.category}
          </span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* Title Section */}
          <motion.h1
            layoutId={`card-title-${card.id}`}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-3"
            transition={{ duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {card.title}
          </motion.h1>
          <motion.p
            layoutId={`card-subtitle-${card.id}`}
            className="text-xl text-slate-600 mb-8"
            transition={{ duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {card.subtitle}
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <StatCard icon={<Calendar />} label="Date" value={card.date} />
            <StatCard icon={<Clock />} label="Duration" value={card.duration} />
            <StatCard icon={<Users />} label="Team Size" value={card.teamSize} />
            <StatCard icon={<Trophy />} label="Prize Pool" value={card.prize} />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">About Event</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              {card.description}
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Event Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Exciting competitions and challenges',
                'Networking with industry experts',
                'Workshops and skill sessions',
                'Certificate of participation',
                'Attractive prizes and goodies',
                'Food and refreshments included',
              ].map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05, duration: 0.4 }}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span className="text-slate-700">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Register Now
            </button>
            <button className="flex-1 px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all duration-300">
              Share Event
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl border border-slate-200">
      <div className="text-blue-600 mb-2">{icon}</div>
      <p className="text-xs text-slate-600 mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}
