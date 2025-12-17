'use client';
import React, { useEffect, useState } from 'react';
import './TechnicalBackground.css';

const TechnicalBackground = () => {
    const [is3D, setIs3D] = useState(false);
    const [isBoost, setIsBoost] = useState(false);
    const [isInspect, setIsInspect] = useState(false);
    const [cpuPercent, setCpuPercent] = useState(0);
    const [symbolValues, setSymbolValues] = useState<string[]>(Array(6).fill('0'));

    useEffect(() => {
        let percent = 0;
        const intervalId = setInterval(() => {
            // Update Symbols
            const newSymbols = Array(6).fill(0).map(() => Math.floor(Math.random() * 2).toString());
            setSymbolValues(newSymbols);

            // Update CPU
            percent++;
            if (percent >= 100) {
                setCpuPercent(100);
            } else {
                setCpuPercent(percent);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let timeouts: any[] = [];

        const runSequence = () => {
            const t1 = setTimeout(() => setIs3D(true), 500);
            const t2 = setTimeout(() => setIsBoost(true), 2500);
            const t3 = setTimeout(() => setIsInspect(true), 4500);
            const t4 = setTimeout(() => {
                setIs3D(false);
                setIsBoost(false);
                setIsInspect(false);
            }, 10000);

            timeouts = [t1, t2, t3, t4];
        };

        runSequence();
        const intervalId = setInterval(runSequence, 15000);

        return () => {
            clearInterval(intervalId);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <>
            {/* BACKGROUND LAYER - VISUALS ONLY */}
            <div className="tech-visual-layer">
                <div className="tech-container">
                    <div className={`container-ring ${is3D ? 'rotate-container-ring' : ''} ${isInspect ? 'animation-container-ring' : ''}`}>
                        {/* SVG RING */}
                        <svg className="ringMain" viewBox="0 0 100 100" type="image/svg+xml" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="4" className="c1"></circle>
                            <circle cx="50" cy="50" r="5" className="c2"></circle>
                            <circle cx="50" cy="50" r="7" className="c3 c3-1-red"></circle>
                            <circle cx="50" cy="50" r="8.5" className="c3 c3-2"></circle>
                            <circle cx="50" cy="50" r="10" className="c3 c3-3"></circle>
                            <circle cx="50" cy="50" r="27" className="c4"></circle>
                            <circle cx="50" cy="50" r="28" className="c5"></circle>
                            <circle cx="50" cy="50" r="29" className="c6"></circle>
                            <circle cx="50" cy="50" r="43" className="c7"></circle>
                            <circle cx="50" cy="50" r="45" className="c8"></circle>
                            <circle cx="50" cy="50" r="46" className="c9"></circle>
                            <circle cx="50" cy="50" r="48" className="c10"></circle>
                            <circle cx="50" cy="50" r="49" className="c11"></circle>
                        </svg>

                        {/* CPU */}
                        <div className={`cpu ${is3D ? 'cpu-3d' : ''}`}>
                            <p>CPU</p>
                            <p>{cpuPercent}%</p>
                        </div>

                        {/* SKEW SQUARES */}
                        <div className={`rotate-skew ${is3D ? 'skew-square-3d' : ''} ${isBoost ? 'skew-square-scale' : ''}`}>
                            <div className="skew-square">
                                {Array.from({ length: 18 }).map((_, i) => (
                                    <div key={i} className={`square-${i + 1} ${isBoost ? 'skew-square-boost' : ''}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* RECTANGLES */}
                        <div className={`rectangle ${is3D ? 'rectangle-3d' : ''}`}>
                            {Array.from({ length: 23 }).map((_, i) => (
                                <div key={i} className={`rectangle-${i + 2}`}></div>
                            ))}
                        </div>

                        {/* SYMBOLS */}
                        <div className={`symbol ${is3D ? 'symbol-3d' : ''}`}>
                            {symbolValues.map((val, i) => (
                                <div key={i} className={`symbol-${i + 1}`}><p>{val}</p></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FOREGROUND LAYER - CONTROLS */}
            <div className="tech-interface-layer">
                <div onClick={() => setIs3D(!is3D)}><p>3D MODE</p></div>
                <div onClick={() => setIsBoost(!isBoost)}><p>BOOST</p></div>
                <div onClick={() => setIsInspect(!isInspect)}><p>INSPECT</p></div>
            </div>
        </>
    );
};

export default TechnicalBackground;
