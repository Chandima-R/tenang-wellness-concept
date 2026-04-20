'use client';
import {useRef} from 'react';
import {gsap} from 'gsap';

export default function Magnetic({ children, strength = 0.35, className = '' }) {
    const ref = useRef(null);

    const onMove = e => {
        const el   = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        gsap.to(el, {
            x: (e.clientX - cx) * strength,
            y: (e.clientY - cy) * strength,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    const onLeave = () => {
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
            style={{ display: 'inline-block' }}
        >
            {children}
        </div>
    );
}
