'use client';
import {useEffect, useRef} from 'react';

export const CustomCursor = () =>{
    const dot  = useRef(null);
    const ring = useRef(null);

    useEffect(() => {
        const d = dot.current;
        const r = ring.current;
        if (!d || !r) return;

        let mx = 0, my = 0, rx = 0, ry = 0, raf;

        const onMove = e => {
            mx = e.clientX; my = e.clientY;
            d.style.left = mx + 'px';
            d.style.top  = my + 'px';
        };

        const tick = () => {
            rx += (mx - rx) * 0.1;
            ry += (my - ry) * 0.1;
            r.style.left = rx + 'px';
            r.style.top  = ry + 'px';
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', onMove);
        raf = requestAnimationFrame(tick);

        // Hover detection
        const addHover = el => {
            el.addEventListener('mouseenter', () => r.classList.add('is-hovering'));
            el.addEventListener('mouseleave', () => r.classList.remove('is-hovering'));
        };
        const addImgHover = el => {
            el.addEventListener('mouseenter', () => r.classList.add('is-img'));
            el.addEventListener('mouseleave', () => r.classList.remove('is-img'));
        };

        document.querySelectorAll('a, button, [data-hover]').forEach(addHover);
        document.querySelectorAll('[data-img-cursor]').forEach(addImgHover);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={dot}  className="cur-dot"  aria-hidden />
            <div ref={ring} className="cur-ring" aria-hidden />
        </>
    );
}
