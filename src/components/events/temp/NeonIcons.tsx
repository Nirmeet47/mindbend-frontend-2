import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NeonIconProps {
    icon: LucideIcon;
    color?: string;
    size?: number;
    className?: string;
}

const NeonIcon: React.FC<NeonIconProps> = ({ icon: Icon, color = '#00F0FF', size = 24, className = '' }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Outer Glow Layer */}
            <div
                className="absolute inset-0 blur-md opacity-50"
                style={{ color: color }}
            >
                <Icon size={size} />
            </div>

            {/* Inner Bright Layer */}
            <div
                className="relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                style={{ color: color }}
            >
                <Icon size={size} />
            </div>
        </div>
    );
};

export default NeonIcon;
