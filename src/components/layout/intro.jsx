'use client';
import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

export const Intro = () => {
    const [visible, setVisible] = useState(true);
    const [phase,   setPhase]   = useState(0); // 0=logo, 1=line, 2=exit

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const t1 = setTimeout(() => setPhase(1), 900);
        const t2 = setTimeout(() => setPhase(2), 1800);
        const t3 = setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = '';
        }, 2800);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="intro"
                    className="intro-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
                    style={{ background: 'var(--color-void)', position: 'fixed', inset: 0, zIndex: 9990, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 300, letterSpacing: '0.5em', color: 'var(--color-ivory)' }}
                    >
                        TENANG
                    </motion.div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: phase >= 1 ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
                        style={{ width: '12rem', height: '1px', background: 'var(--color-amber)', transformOrigin: 'left' }}
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase >= 1 ? 1 : 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-stone)' }}
                    >
                        Ubud · Bali · Indonesia
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
