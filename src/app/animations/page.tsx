'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CardData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  color: string;
}

const cards: CardData[] = [
  {
    id: 1,
    title: 'Mountain Explorer',
    subtitle: 'Adventure awaits',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    description: 'Discover breathtaking mountain landscapes and embark on unforgettable adventures. Experience the thrill of reaching new heights and witness nature\'s magnificent beauty.',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    title: 'Ocean Dreams',
    subtitle: 'Dive into serenity',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    description: 'Immerse yourself in the tranquil beauty of ocean waves and pristine beaches. Let the rhythm of the sea wash away your worries and rejuvenate your spirit.',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 3,
    title: 'Urban Lights',
    subtitle: 'City vibes',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    description: 'Experience the electric energy of city life, where modern architecture meets vibrant culture. Every corner tells a story in this urban wonderland.',
    color: 'from-orange-500/20 to-pink-500/20',
  },
  {
    id: 4,
    title: 'Forest Escape',
    subtitle: 'Nature\'s embrace',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    description: 'Find peace among towering trees and discover the magic of untouched wilderness. Let nature\'s symphony guide you to inner tranquility.',
    color: 'from-green-500/20 to-emerald-500/20',
  },
];

export default function AnimationPage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 md:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
          Discover Experiences
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Tap any card to explore
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}`}
            onClick={() => setSelectedCard(card)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.02,
              y: -4,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
          >
            <motion.div
              className={`
                relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800
                shadow-lg hover:shadow-2xl transition-shadow duration-300
                h-80
              `}
            >
              {/* Card Image */}
              <motion.div
                layoutId={`image-${card.id}`}
                className="relative h-48 overflow-hidden"
              >
                <motion.img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`} />
              </motion.div>

              {/* Card Content */}
              <div className="p-6">
                <motion.h3
                  layoutId={`title-${card.id}`}
                  className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`subtitle-${card.id}`}
                  className="text-slate-600 dark:text-slate-400"
                >
                  {card.subtitle}
                </motion.p>
              </div>

              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Detail View Modal */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Detail Card */}
            <motion.div
              layoutId={`card-${selectedCard.id}`}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
                >
                  <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </motion.button>

                <div className="overflow-y-auto max-h-[90vh]">
                  {/* Hero Image */}
                  <motion.div
                    layoutId={`image-${selectedCard.id}`}
                    className="relative h-72 md:h-96 overflow-hidden"
                  >
                    <motion.img
                      src={selectedCard.image}
                      alt={selectedCard.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${selectedCard.color}`} />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>

                  {/* Content */}
                  <div className="p-8 md:p-12">
                    {/* Title */}
                    <motion.h2
                      layoutId={`title-${selectedCard.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
                    >
                      {selectedCard.title}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                      layoutId={`subtitle-${selectedCard.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="text-xl text-slate-600 dark:text-slate-400 mb-8"
                    >
                      {selectedCard.subtitle}
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-8"
                    />

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8"
                    >
                      {selectedCard.description}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="flex gap-4"
                    >
                      <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                        Explore Now
                      </button>
                      <button className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                        Learn More
                      </button>
                    </motion.div>

                    {/* Additional Info Cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="grid grid-cols-3 gap-4 mt-12"
                    >
                      {[
                        { label: 'Duration', value: '5 Days' },
                        { label: 'Difficulty', value: 'Moderate' },
                        { label: 'Rating', value: '4.9/5' },
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.05, duration: 0.3 }}
                          className="p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-center"
                        >
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                            {item.label}
                          </p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {item.value}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
