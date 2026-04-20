'use client';

export default function Marquee({ items, speed = 'normal', reverse = false, className = '' }) {
    const duration = speed === 'slow' ? '42s' : speed === 'fast' ? '18s' : '28s';
    const doubled  = [...items, ...items];

    return (
        <div style={{ overflow: 'hidden', width: '100%' }} className={className} aria-hidden>
            <div
                className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
                style={{ animationDuration: duration }}
            >
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.58rem',
                            letterSpacing: '0.28em',
                            textTransform: 'uppercase',
                            padding: '0 2.5rem',
                            whiteSpace: 'nowrap',
                        }}
                    >
            {item}
          </span>
                ))}
            </div>
        </div>
    );
}
