import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import styles from './style.module.css';
import { IMAGES } from '../../constants';

interface StreamProps {
    onScanningChange: (isScanning: boolean) => void;
    onSpeedChange: (speed: number) => void;
}

export interface StreamHandle {
    toggleAnimation: () => void;
    resetPosition: () => void;
    changeDirection: () => void;
}

const Stream = forwardRef<StreamHandle, StreamProps>(({ onScanningChange, onSpeedChange }, ref) => {
    const cardLineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(true);

    // State refs for animation loop
    const state = useRef({
        position: 0,
        velocity: 120,
        direction: -1,
        isDragging: false,
        lastTime: 0,
        lastMouseX: 0,
        mouseVelocity: 0,
        containerWidth: 0,
        cardLineWidth: 0,
        minVelocity: 30,
        friction: 0.95,
        isAnimating: true // Synced with state
    });

    // Helper to generate ascii code
    const generateCode = (width: number, height: number) => {
        const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const pick = (arr: string[]) => arr[randInt(0, arr.length - 1)];
        // Simplified library for performance
        const library = [
            "const SCAN_WIDTH = 8;", "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
            "class Particle { constructor(x) { this.x = x; } }", "function tick(t) { requestAnimationFrame(tick); }",
            "const ctx = canvas.getContext('2d');", "state.intensity += 0.1;", "if (x > w) x = 0;"
        ];

        // Fill
        let out = "";
        const rowCount = height;
        const colCount = width;

        for (let r = 0; r < rowCount; r++) {
            let line = "";
            while (line.length < colCount) {
                line += pick(library) + " ";
            }
            out += line.slice(0, colCount) + "\n";
        }
        return out;
    };

    // Initialize dimensions
    useEffect(() => {
        const calcDims = () => {
            if (containerRef.current && cardLineRef.current) {
                state.current.containerWidth = containerRef.current.offsetWidth;
                const cardCount = cardLineRef.current.children.length;
                // Card width 400 + gap 60
                state.current.cardLineWidth = (400 + 60) * cardCount;
            }
        };

        calcDims();
        window.addEventListener('resize', calcDims);
        return () => window.removeEventListener('resize', calcDims);
    }, []);

    // Animation Loop
    useEffect(() => {
        let animationFrame: number;

        const updateCardClipping = () => {
            if (!containerRef.current) return;

            const scannerX = window.innerWidth / 2;
            const scannerWidth = 8;
            const scannerLeft = scannerX - scannerWidth / 2;
            const scannerRight = scannerX + scannerWidth / 2;
            let anyScanningActive = false;

            document.querySelectorAll(`.${styles.cardWrapper}`).forEach((val) => {
                const wrapper = val as HTMLElement;
                const rect = wrapper.getBoundingClientRect();
                const cardLeft = rect.left;
                const cardRight = rect.right;
                const cardWidth = rect.width;

                const normalCard = wrapper.querySelector(`.${styles.cardNormal}`) as HTMLElement;
                const asciiCard = wrapper.querySelector(`.${styles.cardAscii}`) as HTMLElement;

                if (!normalCard || !asciiCard) return;

                if (cardLeft < scannerRight && cardRight > scannerLeft) {
                    anyScanningActive = true;
                    const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                    // const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                    const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
                    // For ascii, we reveal it as we scan. 
                    // Actually checking the reference css:
                    // normalCard clip-right is effectively hiding the right side.
                    // asciiCard clip-left is hiding the left side.

                    // We want: 
                    // Left of scanner: Normal Card visible (clip-right: 0%?? No check logic)
                    // Right of scanner: Normal Card visible? 
                    // Under scanner: ASCII?

                    // Re-reading reference logic:
                    // normalClipRight = (scannerIntersectLeft / cardWidth) * 100; 
                    // asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

                    // If card is crossing scanner from right to left (standard flow):
                    // Left side of card passes scanner first.

                    // Let's stick to reference logic copy-paste where possible
                    const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                    const asciiClip = (scannerIntersectRight / cardWidth) * 100;

                    normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
                    asciiCard.style.setProperty("--clip-left", `${asciiClip}%`);

                    /* 
                     // Scan effect div - DISABLED to reduce flashing
                    if (!wrapper.hasAttribute("data-scanned") && scannerIntersectLeft > 0) {
                        wrapper.setAttribute("data-scanned", "true");
                         const scanEffect = document.createElement("div");
                        // ...
                    } 
                    */

                } else {
                    if (cardRight < scannerLeft) {
                        // Card is to the left of scanner (passed it)
                        normalCard.style.setProperty("--clip-right", "100%"); // Fully clipped? Wait.
                        // If normal card is fully clipped, it's invisible?
                        // Reference says: clip-right: 100%. Inset(0 0 0 100%) maps to full visibility?
                        // inset(top right bottom left).
                        // Reference CSS: clip-path: inset(0 0 0 var(--clip-right, 0%)); 
                        // Wait, 4th arg is LEFT. Reference param name is clip-right but usage is 4th arg (left)?
                        // "clip-path: inset(0 0 0 var(--clip-right, 0%));" -> This clips from the LEFT.

                        // If 100%, it clips everything from left to right. i.e. Invisible.
                        // So if card is to the left, it is invisible? That implies we only see cards BEFORE scanner?
                        // Let's look closer at reference: 
                        // "card-normal { clip-path: inset(0 0 0 var(--clip-right, 0%)); }"

                        // If set to 100%, normal card is hidden.
                        // ASCII card uses: inset(0 calc(100% - var(--clip-left, 0%)) 0 0); -> Clips from RIGHT.

                        // So: 
                        // Before scanner (Right side of screen): Normal Card visible.
                        // After scanner (Left side of screen): ASCII Card visible.

                        // So if cardRight < scannerLeft (Passed scanner completely):
                        normalCard.style.setProperty("--clip-right", "100%"); // Normal Hidden
                        asciiCard.style.setProperty("--clip-left", "100%"); // ASCII Visible (clip-right=0 via calc)

                    } else if (cardLeft > scannerRight) {
                        // Card is to the right of scanner (Not reached yet)
                        normalCard.style.setProperty("--clip-right", "0%"); // Normal Visible
                        asciiCard.style.setProperty("--clip-left", "0%"); // ASCII Hidden
                    }
                    wrapper.removeAttribute("data-scanned");
                }

                // 3D Effect Calculation
                const cardCenter = cardLeft + cardWidth / 2;
                const normalizePos = (cardCenter - scannerX) / (window.innerWidth / 2); // -1 to 1 at edges

                // Gentler 3D curve
                const rotateY = normalizePos * -15; // Reduced rotation
                const translateZ = -Math.abs(normalizePos) * 100; // Reduced depth push

                // Apply transform to the wrapper
                wrapper.style.transform = `perspective(1000px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;

                // Adjust opacity for depth feel
                wrapper.style.opacity = `${1 - Math.abs(normalizePos) * 0.3}`;

            });

            onScanningChange(anyScanningActive);
        };

        const animate = (time: number) => {
            const s = state.current;
            const deltaTime = (time - s.lastTime) / 1000;
            s.lastTime = time;

            if (s.isAnimating && !s.isDragging) {
                if (s.velocity > s.minVelocity) {
                    s.velocity *= s.friction;
                } else {
                    s.velocity = Math.max(s.minVelocity, s.velocity);
                }

                s.position += s.velocity * s.direction * deltaTime;

                // Wrap logic
                if (s.position < -s.cardLineWidth) {
                    s.position = s.containerWidth;
                } else if (s.position > s.containerWidth) {
                    s.position = -s.cardLineWidth;
                }

                if (cardLineRef.current) {
                    cardLineRef.current.style.transform = `translateX(${s.position}px)`;
                }
                updateCardClipping();
                onSpeedChange(Math.round(s.velocity));
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []); // Check deps

    // Interaction Handlers
    const startDrag = (clientX: number) => {
        const s = state.current;
        s.isDragging = true;
        s.isAnimating = false;
        s.lastMouseX = clientX;
        s.mouseVelocity = 0;

        if (cardLineRef.current) {
            const transform = window.getComputedStyle(cardLineRef.current).transform;
            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                s.position = matrix.m41;
            }
            cardLineRef.current.classList.add(styles.cardLineDragging);
        }
    };

    const onDrag = (clientX: number) => {
        const s = state.current;
        if (!s.isDragging) return;

        const deltaX = clientX - s.lastMouseX;
        s.position += deltaX;
        s.mouseVelocity = deltaX * 60;
        s.lastMouseX = clientX;

        if (cardLineRef.current) {
            cardLineRef.current.style.transform = `translateX(${s.position}px)`;
        }
    };

    const endDrag = () => {
        const s = state.current;
        if (!s.isDragging) return;

        s.isDragging = false;
        if (cardLineRef.current) {
            cardLineRef.current.classList.remove(styles.cardLineDragging);
        }

        if (Math.abs(s.mouseVelocity) > s.minVelocity) {
            s.velocity = Math.abs(s.mouseVelocity);
            s.direction = s.mouseVelocity > 0 ? 1 : -1;
        } else {
            s.velocity = 120;
        }
        s.isAnimating = true;
    };

    // Ascii Update Loop
    useEffect(() => {
        const interval = setInterval(() => {
            document.querySelectorAll(`.${styles.asciiContent}`).forEach((el) => {
                if (Math.random() < 0.15) {
                    el.textContent = generateCode(60, 20); // Approx width/height
                }
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => startDrag(e.clientX);
    const handleMouseMove = (e: MouseEvent) => onDrag(e.clientX); // Global listener approach better for drag
    const handleMouseUp = () => endDrag();

    // Attach global listeners for drag
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Initial Code Gen
    const initialCodes = useRef<string[]>([]);
    if (initialCodes.current.length === 0) {
        initialCodes.current = new Array(30).fill(0).map(() => generateCode(60, 20));
    }

    // Extended images to ensure enough for scrolling
    // If IMAGES is small, repeat it.
    const DISPLAY_ITEMS = [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES].slice(0, 30);

    useImperativeHandle(ref, () => ({
        toggleAnimation: () => {
            state.current.isAnimating = !state.current.isAnimating;
            setIsAnimating(state.current.isAnimating);
            // If resuming, clear drag flag just in case
            if (state.current.isAnimating) state.current.isDragging = false;
        },
        resetPosition: () => {
            state.current.position = state.current.containerWidth;
            state.current.velocity = 120;
            state.current.direction = -1;
            state.current.isAnimating = true;
            state.current.isDragging = false;
            setIsAnimating(true);

            if (cardLineRef.current) {
                cardLineRef.current.classList.remove(styles.cardLineDragging);
                cardLineRef.current.style.transform = `translateX(${state.current.position}px)`;
            }
        },
        changeDirection: () => {
            state.current.direction *= -1;
        }
    }));

    return (
        <div
            className={styles.cardStream}
            ref={containerRef}
            onMouseDown={handleMouseDown}
        >
            <div className={styles.cardLine} ref={cardLineRef} id="cardLine">
                {DISPLAY_ITEMS.map((item, i) => (
                    <div className={styles.cardWrapper} key={i}>
                        <div className={`${styles.card} ${styles.cardNormal}`}>
                            <img src={item.image} alt={item.title} className={styles.cardImage} />
                            {/* Overlay Title for info */}
                            <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10 }}>
                                <h3 style={{ margin: 0, fontSize: 24, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{item.title}</h3>
                                <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>{item.subtitle}</p>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.cardAscii}`}>
                            <div className={styles.asciiContent}>
                                {initialCodes.current[i]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Stream;
