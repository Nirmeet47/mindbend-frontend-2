"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type EncryptedTextProps = {
  text: string;
  className?: string;
  /** Total duration to fully reveal the text (ms). */
  duration?: number;
  /** Re-run the animation on hover. */
  animateOnHover?: boolean;
  /** Characters used during the scramble. */
  charset?: string;
  /** Text color for revealed characters. */
  revealedColor?: string;
  /** Primary color for scrambled characters. */
  scrambleColorA?: string;
  /** Secondary color for scrambled characters. */
  scrambleColorB?: string;
};

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,.<>/?';

export function EncryptedText({
  text,
  className,
  duration = 1400,
  animateOnHover = false,
  charset = DEFAULT_CHARSET,
  revealedColor = 'rgb(103 232 249)', // tailwind cyan-300
  scrambleColorA = 'rgb(110 231 183)', // tailwind emerald-300
  scrambleColorB = 'rgb(34 211 238)', // tailwind cyan-400
}: EncryptedTextProps) {
  const [output, setOutput] = useState(text);
  const [revealCount, setRevealCount] = useState(text.length);
  const animId = useRef(0);
  const startTime = useRef<number | null>(null);
  const running = useRef(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }, []);

  const randChar = useCallback(() => {
    const i = Math.floor(Math.random() * charset.length);
    return charset[i] ?? 'X';
  }, [charset]);

  const renderFrame = useCallback(
    (now: number) => {
      if (startTime.current == null) startTime.current = now;
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Reveal left-to-right, but preserve spaces immediately.
      const total = text.length;
      const nextRevealCount = Math.floor(progress * total);
      setRevealCount(nextRevealCount);

      let next = '';
      for (let i = 0; i < total; i++) {
        const ch = text[i] ?? '';
        if (ch === ' ') {
          next += ' ';
          continue;
        }

        if (i < nextRevealCount) {
          next += ch;
        } else {
          // Keep punctuation stable near the end, scramble letters/numbers.
          const isWordChar = /[A-Za-z0-9]/.test(ch);
          next += isWordChar ? randChar() : ch;
        }
      }

      setOutput(next);

      if (progress < 1) {
        animId.current = window.requestAnimationFrame(renderFrame);
      } else {
        running.current = false;
        setOutput(text);
      }
    },
    [duration, randChar, text]
  );

  const start = useCallback(() => {
    if (prefersReducedMotion) {
      setOutput(text);
      setRevealCount(text.length);
      return;
    }
    if (running.current) return;

    running.current = true;
    startTime.current = null;
    window.cancelAnimationFrame(animId.current);

    setRevealCount(0);

    // Seed with scrambled text before anim starts.
    const seeded = text
      .split('')
      .map((ch) => (ch === ' ' ? ' ' : /[A-Za-z0-9]/.test(ch) ? randChar() : ch))
      .join('');
    setOutput(seeded);

    animId.current = window.requestAnimationFrame(renderFrame);
  }, [prefersReducedMotion, randChar, renderFrame, text]);

  useEffect(() => {
    start();
    return () => window.cancelAnimationFrame(animId.current);
  }, [start]);

  // Optional hover restart
  const onMouseEnter = animateOnHover ? start : undefined;

  return (
    <span className={['whitespace-pre-wrap', className].filter(Boolean).join(' ')} onMouseEnter={onMouseEnter}>
      {output.split('').map((ch, i) => {
        if (ch === ' ') {
          return (
            <span key={i}>
              {' '}
            </span>
          );
        }

        const isRevealed = i < revealCount;
        const color = isRevealed ? revealedColor : i % 2 === 0 ? scrambleColorA : scrambleColorB;
        const opacity = isRevealed ? 1 : 0.75;

        return (
          <span key={i} style={{ color, opacity }}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}
