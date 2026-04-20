'use client';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer style={{ background: 'var(--color-void)', borderTop: '1px solid rgba(237,232,223,0.06)' }}>
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 8rem) clamp(2rem, 4vw, 4rem)' }}>

                {/* Top row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
                    <div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.3em', color: 'var(--color-ivory)', marginBottom: '1.5rem' }}>TENANG</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, color: 'var(--color-stone)', lineHeight: 1.9 }}>
                            Where the earth holds its breath.<br />
                            Ubud, Bali, Indonesia.
                        </p>
                    </div>

                    <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ display: 'block', width: '1.2rem', height: '1px', background: 'var(--color-stone)' }} />
                            Navigate
                        </p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            {[['/', 'Home'], ['/experiences', 'Experiences'], ['/retreats', 'Retreats'], ['/sanctuary', 'The Sanctuary'], ['/philosophy', 'Philosophy'], ['/reserve', 'Reserve']].map(([href, label]) => (
                                <Link key={href} href={href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(237,232,223,0.35)', textDecoration: 'none' }}
                                      className="footer-nav-link"
                                >{label}</Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ display: 'block', width: '1.2rem', height: '1px', background: 'var(--color-stone)' }} />
                            Experiences
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            {['Tirta Ritual Bathing', 'Prana Journey', 'Hutan Immersion', 'Nada Resonance', 'Jamu Alchemy', 'Akasha Flow'].map(e => (
                                <span key={e} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(237,232,223,0.25)' }}>{e}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ display: 'block', width: '1.2rem', height: '1px', background: 'var(--color-stone)' }} />
                            Contact
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="tel:+6236175000" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--color-ivory)', textDecoration: 'none' }}>+62 361 75 000</a>
                            <a href="mailto:stay@tenang.com" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300, color: 'var(--color-ivory)', textDecoration: 'none' }}>stay@tenang.com</a>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300, color: 'var(--color-stone)', lineHeight: 1.8 }}>
                                Jl. Raya Campuhan<br />Ubud, Gianyar 80571<br />Bali, Indonesia
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom rule */}
                <div style={{ borderTop: '1px solid rgba(237,232,223,0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(237,232,223,0.2)', letterSpacing: '0.12em' }}>
                        © {new Date().getFullYear()} PT Tenang Semesta Indonesia. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '2.5rem' }}>
                        {['Privacy', 'Terms', 'Cookies'].map(t => (
                            <a key={t} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(237,232,223,0.2)', letterSpacing: '0.12em', textDecoration: 'none' }}>{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
