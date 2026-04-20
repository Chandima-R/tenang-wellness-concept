'use client';
import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export default function ParallaxImage({ children, speed = 0.3, className = '' }) {
    const outer = useRef(null);
    const inner = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const yAmt = speed * 35;
            gsap.fromTo(inner.current,
                { yPercent: -yAmt },
                { yPercent: yAmt, ease: 'none',
                    scrollTrigger: {
                        trigger: outer.current,
                        start: 'top bottom', end: 'bottom top',
                        scrub: true,
                    }
                }
            );
        }, outer);
        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={outer} className={`overflow-hidden ${className}`}>
            <div ref={inner} style={{ width: '100%', height: '115%', marginTop: '-7.5%' }}>
                {children}
            </div>
        </div>
    );
}
