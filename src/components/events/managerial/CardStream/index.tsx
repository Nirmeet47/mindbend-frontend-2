import React, { useState, useRef } from 'react';
import styles from './style.module.css';
import BackgroundParticles from './BackgroundParticles';
import Scanner from './Scanner';
import Stream, { StreamHandle } from './Stream';

const CardStream: React.FC = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [speed, setSpeed] = useState(120);
    const [isPlaying, setIsPlaying] = useState(true);
    const streamRef = useRef<StreamHandle>(null);

    const togglePlay = () => {
        if (streamRef.current) {
            streamRef.current.toggleAnimation();
            setIsPlaying((prev) => !prev);
        }
    };

    const reset = () => {
        if (streamRef.current) {
            streamRef.current.resetPosition();
            setIsPlaying(true);
        }
    };

    const changeDirection = () => {
        if (streamRef.current) {
            streamRef.current.changeDirection();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button className={styles.controlBtn} onClick={togglePlay}>
                    {isPlaying ? "⏸️ Pause" : "▶️ Play"}
                </button>
                <button className={styles.controlBtn} onClick={reset}>
                    🔄 Reset
                </button>
                <button className={styles.controlBtn} onClick={changeDirection}>
                    ↔️ Direction
                </button>
            </div>

            <div className={styles.speedIndicator}>
                Speed: <span>{speed}</span> px/s
            </div>

            <BackgroundParticles />
            <Scanner active={isScanning} />

            {/* Scanner visual line */}
            <div className={styles.scanner}></div>

            <Stream
                ref={streamRef}
                onScanningChange={setIsScanning}
                onSpeedChange={setSpeed}
            />

            <div className={styles.inspirationCredit}>
                Inspired by <a href="https://evervault.com/" target="_blank" rel="noreferrer">@evervault.com</a>
            </div>
        </div>
    );
};

export default CardStream;
