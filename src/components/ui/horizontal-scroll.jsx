'use client';
import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export default function HorizontalScroll({ children, panelCount }) {
    const sectionRef = useRef(null);
    const trackRef   = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const track   = trackRef.current;
        if (!section || !track) return;

        const ctx = gsap.context(() => {
            const totalWidth = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [panelCount]);

    return (
        <section
            ref={sectionRef}
            style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}
        >
            <div
                ref={trackRef}
                style={{ display: 'flex', height: '100%', willChange: 'transform' }}
            >
                {children}
            </div>
        </section>
    );
}
