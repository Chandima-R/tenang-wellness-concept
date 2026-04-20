'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence, motion} from 'framer-motion';

const links = [
    { href: '/experiences', label: 'Experiences' },
    { href: '/retreats',    label: 'Retreats' },
    { href: '/sanctuary',   label: 'Sanctuary' },
    { href: '/philosophy',  label: 'Philosophy' },
];

export const Navigation = () =>{
    const [open,   setOpen]   = useState(false);
    const [hidden, setHidden] = useState(false);
    const last    = useRef(0);
    const path    = usePathname();

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setHidden(y > last.current && y > 200);
            last.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setOpen(false); }, [path]);

    return (
        <>
            <motion.header
                className="nav-root"
                animate={{ y: hidden && !open ? '-100%' : '0%' }}
                transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1] }}
            >
                <Link href="/" className="nav-logo" data-hover>TENANG</Link>

                <nav className="nav-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    {links.map(l => (
                        <Link key={l.href} href={l.href} className="nav-link" data-hover
                              style={{ opacity: path === l.href ? 1 : undefined }}>
                            {l.label}
                        </Link>
                    ))}
                    <Link href="/reserve" className="nav-reserve" data-hover>Reserve</Link>
                </nav>

                {/* Hamburger for mobile */}
                <button
                    onClick={() => setOpen(o => !o)}
                    style={{ background: 'none', border: 'none', display: 'none', flexDirection: 'column', gap: '6px', cursor: 'none' }}
                    className="hamburger-btn"
                    aria-label="Menu"
                >
                    <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} style={{ display: 'block', width: '28px', height: '1px', background: 'var(--color-ivory)' }} />
                    <motion.span animate={{ opacity: open ? 0 : 1 }} style={{ display: 'block', width: '28px', height: '1px', background: 'var(--color-ivory)' }} />
                    <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} style={{ display: 'block', width: '28px', height: '1px', background: 'var(--color-ivory)' }} />
                </button>
            </motion.header>

            {/* Full-screen menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="menu"
                        className="menu-overlay"
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '4rem' }}>
                            {[...links, { href: '/reserve', label: 'Reserve a Stay' }].map((l, i) => (
                                <motion.div key={l.href}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                                >
                                    <Link href={l.href} style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                                        fontWeight: 300, color: 'var(--color-ivory)',
                                        textDecoration: 'none', lineHeight: 1.1, letterSpacing: '-0.02em',
                                        display: 'block', opacity: 0.8,
                                    }}>
                                        {l.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <div style={{ display: 'flex', gap: '3rem' }}>
                            <p className="label" style={{ color: 'var(--color-stone)' }}>stay@tenang.com</p>
                            <p className="label" style={{ color: 'var(--color-stone)' }}>+62 361 75 000</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
}
