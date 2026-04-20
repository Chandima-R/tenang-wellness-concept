'use client';
import {useRef} from 'react';
import {motion, useInView} from 'framer-motion';

/**
 * SplitChars — Reveals text character by character on scroll entry.
 * Much more dramatic than word-by-word animation.
 */
export default function SplitChars({
                                       text,
                                       tag: Tag = 'div',
                                       className = '',
                                       style = {},
                                       delay = 0,
                                       stagger = 0.025,
                                       duration = 0.8,
                                       y = 80,
                                   }) {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-8%' });

    const lines = Array.isArray(text) ? text : [text];

    const charVariants = {
        hidden:  { y: `${y}%`, opacity: 0, rotateX: 45 },
        visible: i => ({
            y: '0%', opacity: 1, rotateX: 0,
            transition: {
                duration,
                delay: delay + i * stagger,
                ease: [0.25, 0.1, 0, 1],
            },
        }),
    };

    let charIdx = 0;

    return (
        <Tag
            ref={ref}
            className={className}
            style={{ perspective: '800px', ...style }}
        >
            {lines.map((line, li) => (
                <span key={li} style={{ display: 'block' }}>
          {[...line].map((char) => {
              const i = charIdx++;
              return (
                  <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 'inherit' }}>
                <motion.span
                    custom={i}
                    variants={charVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              </span>
              );
          })}
        </span>
            ))}
        </Tag>
    );
}
