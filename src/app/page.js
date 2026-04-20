'use client';

import {useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {motion, useInView, useScroll, useTransform} from 'framer-motion';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import SplitChars from '@/components/ui/split-chars';
import Magnetic from '@/components/ui/magnetic';
import Marquee from '@/components/ui/maruee';
import HorizontalScroll from '@/components/ui/horizontal-scroll';
import ParallaxImage from '@/components/ui/parallax-image';

/* ─── Data ─────────────────────────────────────────────── */
const marqueeItems = [
  'UBUD · BALI',
  '72 HECTARES',
  'SINCE 2018',
  'INDONESIA',
  'TENANG',
  'THE ART OF STILLNESS',
  'ULTRA-LUXURY HEALING',
];

const experiences = [
  {
    num: '01',
    name: 'Tirta',
    full: 'Ritual Bathing',
    duration: '180 min',
    price: '2,800',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=90',
    color: '#1A3C2C',
  },
  {
    num: '02',
    name: 'Prana',
    full: 'Life Force Journey',
    duration: '240 min',
    price: '3,500',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=90',
    color: '#2A1808',
  },
  {
    num: '03',
    name: 'Hutan',
    full: 'Forest Immersion',
    duration: '5 hours',
    price: '4,200',
    img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=900&q=90',
    color: '#0A0906',
  },
  {
    num: '04',
    name: 'Nada',
    full: 'Sound Resonance',
    duration: '2 hours',
    price: '1,900',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=90',
    color: '#1A3C2C',
  },
  {
    num: '05',
    name: 'Jamu',
    full: 'Herbal Alchemy',
    duration: '3 hours',
    price: '2,200',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&q=90',
    color: '#2A1808',
  },
  {
    num: '06',
    name: 'Akasha',
    full: 'Aerial Flow',
    duration: '90 min',
    price: '1,400',
    img: 'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?w=900&q=90',
    color: '#0A0906',
  },
];

/* ─── Clip Reveal Image ─────────────────────────────────── */
function ClipReveal({ src, alt, className = '', style = {} }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
      <div ref={ref} className={`overflow-hidden ${className}`} style={style} data-img-cursor>
        <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
            transition={{ duration: 1.6, ease: [0.87, 0, 0.13, 1] }}
            style={{ width: '100%', height: '100%' }}
        >
          <motion.div
              initial={{ scale: 1.2 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0, 1] }}
              style={{ width: '100%', height: '100%' }}
          >
            <Image src={src} alt={alt} fill className="object-cover" />
          </motion.div>
        </motion.div>
      </div>
  );
}

/* ─── Count-up Number ───────────────────────────────────── */
function BigNum({ value, label, suffix = '' }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
      <div ref={ref}>
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 10vw, 12rem)',
              fontWeight: 300,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: 'var(--color-ivory)',
            }}
        >
          {value}{suffix}
        </motion.div>
        <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-stone)',
              marginTop: '1rem',
            }}
        >
          {label}
        </motion.p>
      </div>
  );
}

/* ─── Home Page ─────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  // GSAP clip reveal for the hero image line
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero line reveal
    gsap.from('.hero-line-1', {
      y: '110%', opacity: 0,
      duration: 1.4, ease: 'power4.out', delay: 2.6,
    });
    gsap.from('.hero-line-2', {
      y: '110%', opacity: 0,
      duration: 1.4, ease: 'power4.out', delay: 2.85,
    });
    gsap.from('.hero-line-3', {
      y: '110%', opacity: 0,
      duration: 1.2, ease: 'power4.out', delay: 3.1,
    });
    gsap.from('.hero-meta-left, .hero-meta-right', {
      opacity: 0, y: 20,
      duration: 1.0, ease: 'power3.out', delay: 3.4,
    });

    // Parallax on the hero image number overlay
    gsap.to('.hero-num-overlay', {
      y: '-15%',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top', end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
      <>
        {/* ═══ HERO ══════════════════════════════════════════ */}
        <section
            ref={heroRef}
            style={{
              height: '100svh',
              minHeight: '700px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'var(--color-void)',
            }}
        >
          {/* Background image */}
          <motion.div
              style={{ position: 'absolute', inset: 0, scale: heroScale }}
          >
            <Image
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90"
                alt="Bali sanctuary"
                fill priority
                className="object-cover"
                style={{ opacity: 0.55 }}
            />
            {/* Strong gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-void) 0%, rgba(9,8,10,0.3) 50%, rgba(9,8,10,0.15) 100%)' }} />
          </motion.div>

          {/* Oversized background number */}
          <motion.div
              className="hero-num-overlay"
              style={{
                position: 'absolute',
                right: '-3vw',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-display)',
                fontSize: '45vw',
                fontWeight: 300,
                lineHeight: 0.8,
                letterSpacing: '-0.05em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(237,232,223,0.04)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
          >
            T
          </motion.div>

          {/* Hero text */}
          <motion.div
              style={{ position: 'relative', zIndex: 10, padding: '0 clamp(2rem, 6vw, 8rem) clamp(3rem, 7vh, 6rem)' }}
          >
            {/* Top label row */}
            <div className="hero-meta-left" style={{ marginBottom: '2rem' }}>
              <span className="label">Ubud · Bali · Indonesia — Est. 2018</span>
            </div>

            {/* Massive headline */}
            <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
              <div className="hero-line-1" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 16vw, 20rem)',
                fontWeight: 300,
                color: 'var(--color-ivory)',
                letterSpacing: '-0.03em',
                lineHeight: 0.88,
              }}>
                The Art
              </div>
            </div>
            <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
              <div className="hero-line-2" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 16vw, 20rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-amber)',
                letterSpacing: '-0.03em',
                lineHeight: 0.88,
                paddingLeft: 'clamp(3rem, 8vw, 12rem)',
              }}>
                of Stillness
              </div>
            </div>

            {/* Bottom row */}
            <div className="hero-meta-right" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: 'clamp(2rem, 4vh, 3.5rem)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: 'rgba(237,232,223,0.55)',
                lineHeight: 1.8,
                maxWidth: '28ch',
              }}>
                Where ancient Indonesian wisdom<br />
                meets the stillness you have forgotten.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2rem' }}>
                <Magnetic>
                  <Link href="/reserve" className="mag-btn" data-hover>
                    <span>Reserve Your Journey</span>
                  </Link>
                </Magnetic>
                <div className="scroll-indicator-v">
                  <div className="line" />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,232,223,0.3)', writingMode: 'vertical-rl' }}>Scroll</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero bottom rule */}
          <div className="hero-line-3" style={{ position: 'relative', zIndex: 10 }}>
            <div className="rule" />
          </div>
        </section>

        {/* ═══ MARQUEE ═══════════════════════════════════════ */}
        <div style={{
          background: 'var(--color-void)',
          borderBottom: '1px solid rgba(237,232,223,0.06)',
          padding: '1.2rem 0',
          color: 'var(--color-stone)',
        }}>
          <Marquee items={marqueeItems} speed="slow" />
        </div>

        {/* ═══ MANIFESTO ═════════════════════════════════════ */}
        <section style={{
          background: 'var(--color-void)',
          padding: 'clamp(6rem, 12vw, 16rem) clamp(2rem, 6vw, 8rem)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Massive background number */}
          <div aria-hidden style={{
            position: 'absolute',
            left: '-5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-display)',
            fontSize: '80vw',
            fontWeight: 300,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(237,232,223,0.025)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}>
            01
          </div>

          <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center', position: 'relative' }}>
            <div>
              <p className="label" style={{ marginBottom: '3rem' }}>The Philosophy</p>
              <SplitChars
                  text={['In Balinese,', 'tenang means', 'to be still.']}
                  tag="h2"
                  stagger={0.018}
                  delay={0}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3.5rem, 7vw, 9rem)',
                    fontWeight: 300,
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-ivory)',
                  }}
              />
            </div>

            <div>
              <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 2vw, 2rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(237,232,223,0.5)',
                    lineHeight: 1.5,
                    marginBottom: '2.5rem',
                  }}
              >
                "Not as absence — but as the quality of presence that exists when everything
                unnecessary has been stripped away."
              </motion.p>
              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: 300,
                    color: 'var(--color-stone)',
                    lineHeight: 1.9,
                    marginBottom: '3rem',
                  }}
              >
                Here, we do not offer escape. We offer return — to the part of you
                that existed before the world asked you to be other than you are.
              </motion.p>
              <Magnetic>
                <Link href="/philosophy" className="mag-btn" data-hover>
                  <span>Our Philosophy</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* ═══ FULL-BLEED IMAGE ══════════════════════════════ */}
        <section style={{ position: 'relative', height: '70vh', minHeight: '400px' }}>
          <ParallaxImage className="w-full h-full">
            <Image
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=85"
                alt="Private villa"
                fill className="object-cover"
            />
          </ParallaxImage>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(9,8,10,0.6) 0%, transparent 60%)' }} />

          {/* Floating stat */}
          <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
              style={{
                position: 'absolute',
                bottom: '10%',
                left: 'clamp(2rem, 6vw, 8rem)',
              }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.5vw, 1.4rem)', fontStyle: 'italic', color: 'var(--color-ivory)', opacity: 0.8 }}>
              12 private villas.
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.5vw, 1.4rem)', fontStyle: 'italic', color: 'var(--color-amber)' }}>
              24 guests, maximum, always.
            </p>
          </motion.div>
        </section>

        {/* ═══ STATS ═════════════════════════════════════════ */}
        <section style={{
          background: 'var(--color-void)',
          padding: 'clamp(5rem, 10vw, 12rem) clamp(2rem, 6vw, 8rem)',
          borderTop: '1px solid rgba(237,232,223,0.06)',
          borderBottom: '1px solid rgba(237,232,223,0.06)',
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
              <BigNum value="72" suffix=" ha" label="Pristine jungle sanctuary" />
              <BigNum value="12"           label="Private villas — plunge pool each" />
              <BigNum value="1:1"          label="Healer to guest ratio, always" />
              <BigNum value="800+"         label="Years of Indonesian healing wisdom" />
            </div>
          </div>
        </section>

        {/* ═══ HORIZONTAL EXPERIENCES ════════════════════════ */}
        <div style={{ background: 'var(--color-void)' }}>
          <div style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 8rem) 3rem', maxWidth: '1600px', margin: '0 auto' }}>
            <p className="label" style={{ marginBottom: '1.5rem' }}>The Experiences</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <SplitChars
                  text={['Six Sacred', 'Rituals']}
                  tag="h2"
                  stagger={0.02}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 6vw, 7rem)',
                    fontWeight: 300,
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-ivory)',
                  }}
              />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Drag to explore →
              </p>
            </div>
          </div>

          <HorizontalScroll panelCount={experiences.length}>
            {/* Intro panel */}
            <div style={{
              width: '28vw',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 0 6rem clamp(2rem, 6vw, 8rem)',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                fontStyle: 'italic',
                color: 'var(--color-stone)',
                lineHeight: 1.7,
                maxWidth: '28ch',
              }}>
                Each ritual is calibrated to your unique constitution by our senior healers.
              </p>
            </div>

            {experiences.map((exp, i) => (
                <div
                    key={exp.num}
                    style={{
                      width: 'clamp(280px, 30vw, 480px)',
                      flexShrink: 0,
                      height: '100%',
                      position: 'relative',
                      borderLeft: '1px solid rgba(237,232,223,0.06)',
                    }}
                    data-img-cursor
                >
                  <Image src={exp.img} alt={exp.name} fill className="object-cover" style={{ opacity: 0.7 }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${exp.color} 0%, rgba(0,0,0,0.1) 60%)` }} />

                  {/* Number */}
                  <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '6rem',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: 'rgba(237,232,223,0.12)',
                    letterSpacing: '-0.04em',
                  }}>
                    {exp.num}
                  </div>

                  {/* Content */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 2.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
                      {exp.duration} · USD {exp.price}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 3.5vw, 4rem)',
                      fontWeight: 300,
                      lineHeight: 0.9,
                      color: 'var(--color-ivory)',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.25rem',
                    }}>
                      {exp.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(237,232,223,0.5)' }}>
                      {exp.full}
                    </p>
                  </div>
                </div>
            ))}

            {/* End panel — CTA */}
            <div style={{
              width: '35vw',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0 clamp(2rem, 6vw, 8rem) 6rem 4rem',
              background: 'var(--color-void)',
              borderLeft: '1px solid rgba(237,232,223,0.06)',
            }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '1.5rem' }}>All Experiences</p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4vw, 5rem)',
                fontWeight: 300,
                lineHeight: 1,
                color: 'var(--color-ivory)',
                marginBottom: '3rem',
              }}>
                Explore the<br /><em style={{ color: 'var(--color-amber)' }}>full catalogue</em>
              </h3>
              <Magnetic>
                <Link href="/experiences" className="mag-btn" data-hover>
                  <span>All Six Rituals</span>
                </Link>
              </Magnetic>
            </div>
          </HorizontalScroll>
        </div>

        {/* ═══ MARQUEE 2 ═════════════════════════════════════ */}
        <div style={{
          borderTop: '1px solid rgba(237,232,223,0.06)',
          borderBottom: '1px solid rgba(237,232,223,0.06)',
          padding: '1.2rem 0',
          background: 'var(--color-void)',
          color: 'var(--color-amber)',
        }}>
          <Marquee items={['USD 52,000 / SEVEN NIGHTS', 'SUWUNG IMMERSION', 'THE SACRED EMPTINESS', 'ONLY 24 GUESTS', 'PRIVATE VILLA COMPOUND', 'USD 52,000 / SEVEN NIGHTS']} reverse speed="slow" />
        </div>

        {/* ═══ FEATURED RETREAT ══════════════════════════════ */}
        <section style={{
          background: 'var(--color-light)',
          color: 'var(--color-void)',
          padding: 'clamp(6rem, 12vw, 16rem) clamp(2rem, 6vw, 8rem)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(4rem, 8vw, 10rem)', alignItems: 'center' }}>

            {/* Left: giant price */}
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-teak)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                <span style={{ display: 'block', width: '1.5rem', height: '1px', background: 'var(--color-teak)' }} />
                Signature Seven-Day Retreat
              </p>

              <SplitChars
                  text={['Suwung']}
                  tag="h2"
                  stagger={0.04}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(5rem, 12vw, 15rem)',
                    fontWeight: 300,
                    lineHeight: 0.85,
                    letterSpacing: '-0.04em',
                    color: 'var(--color-void)',
                    marginBottom: '1rem',
                  }}
              />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 2rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'var(--color-teak)',
                marginBottom: '3rem',
              }}>
                The Sacred Emptiness
              </p>

              <div style={{
                display: 'inline-block',
                borderTop: '1px solid rgba(42,24,8,0.15)',
                paddingTop: '2rem',
                marginBottom: '3rem',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-teak)', marginBottom: '0.5rem' }}>
                  From
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                  fontWeight: 300,
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-void)',
                }}>
                  USD 52,000
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-stone)', fontWeight: 300 }}>
                  per person · 7 nights · all-inclusive
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                {['Private villa compound', 'Daily healer consultation', 'Forest immersion', 'All meals & tonics'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ display: 'block', width: '1.5rem', height: '1px', background: 'var(--color-amber)' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-stone)', letterSpacing: '0.05em' }}>{f}</span>
                    </div>
                ))}
              </div>

              <Magnetic>
                <Link href="/retreats" className="mag-btn" data-hover style={{ borderColor: 'var(--color-void)', color: 'var(--color-void)' }}
                      onMouseEnter={e => { e.currentTarget.style.setProperty('--before-bg', 'var(--color-void)'); }}
                >
                  <span>Explore the Retreat</span>
                </Link>
              </Magnetic>
            </div>

            {/* Right: stacked images */}
            <div style={{ position: 'relative' }}>
              <ClipReveal
                  src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=900&q=85"
                  alt="Suwung Retreat"
                  style={{ width: '100%', aspectRatio: '3/4', position: 'relative' }}
              />

              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    bottom: '-2.5rem',
                    left: '-2.5rem',
                    background: 'var(--color-forest)',
                    padding: '2rem',
                    width: '55%',
                  }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--color-ivory)', lineHeight: 1.2 }}>
                  Private<br /><em style={{ color: 'var(--color-amber)' }}>Villa Compound</em>
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--color-moss)', letterSpacing: '0.1em', marginTop: '0.75rem' }}>
                  2,200 m² · Your exclusive estate
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ QUOTE / TESTIMONIAL ═══════════════════════════ */}
        <section style={{
          background: 'var(--color-void)',
          padding: 'clamp(6rem, 12vw, 16rem) clamp(2rem, 6vw, 8rem)',
          borderTop: '1px solid rgba(237,232,223,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Giant quote mark */}
          <div aria-hidden style={{
            position: 'absolute',
            top: '-5rem',
            left: 'clamp(2rem, 5vw, 7rem)',
            fontFamily: 'var(--font-display)',
            fontSize: '40vw',
            fontWeight: 300,
            lineHeight: 0.7,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(196,145,106,0.06)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}>
            "
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <SplitChars
                text={['I have stayed in the finest', 'hotels on every continent.', 'TENANG is not a hotel.']}
                tag="blockquote"
                stagger={0.01}
                duration={0.7}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4.5vw, 6rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.1,
                  color: 'var(--color-ivory)',
                  letterSpacing: '-0.02em',
                  marginBottom: '3rem',
                }}
            />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-amber)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--color-amber)' }} />
              H.A. — Singapore · Suwung Immersion, 2024
            </p>
          </div>
        </section>

        {/* ═══ EDITORIAL GALLERY ═════════════════════════════ */}
        <section style={{
          background: 'var(--color-void)',
          padding: '0 0 clamp(6rem, 10vw, 12rem)',
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 clamp(2rem, 6vw, 8rem)' }}>
            <p className="label" style={{ marginBottom: '3rem' }}>The Sanctuary</p>
          </div>

          {/* Asymmetric grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '55fr 45fr',
            gridTemplateRows: 'auto auto',
            gap: '2px',
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '0 clamp(2rem, 6vw, 8rem)',
          }}>
            <ClipReveal
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1000&q=80"
                alt="Infinity pool"
                style={{ gridColumn: '1', gridRow: '1 / 3', position: 'relative', aspectRatio: '3/4' }}
            />
            <ClipReveal
                src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80"
                alt="Healing space"
                style={{ gridColumn: '2', gridRow: '1', position: 'relative', aspectRatio: '4/3' }}
            />
            <div style={{ gridColumn: '2', gridRow: '2', background: 'var(--color-forest)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 3rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-ivory)', lineHeight: 1.3, marginBottom: '1.5rem' }}>
                Spaces sculpted by silence.
              </p>
              <Magnetic>
                <Link href="/sanctuary" className="mag-btn" data-hover>
                  <span>The Sanctuary</span>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Second row - offset */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '30fr 70fr',
            gap: '2px',
            maxWidth: '1600px',
            margin: '2px auto 0',
            padding: '0 clamp(2rem, 6vw, 8rem)',
          }}>
            <div style={{ background: 'var(--color-earth)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 3rem', minHeight: '250px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 6vw, 8rem)', fontWeight: 300, color: 'var(--color-ivory)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>12</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-amber)', marginTop: '0.5rem' }}>Private Villas</p>
              </div>
            </div>
            <ClipReveal
                src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80"
                alt="Bali terraces"
                style={{ position: 'relative', aspectRatio: '21/9' }}
            />
          </div>
        </section>

        {/* ═══ CLOSING CTA ═══════════════════════════════════ */}
        <section style={{
          background: 'var(--color-void)',
          padding: 'clamp(8rem, 15vw, 20rem) clamp(2rem, 6vw, 8rem)',
          borderTop: '1px solid rgba(237,232,223,0.06)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background text */}
          <div aria-hidden style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '28vw',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(237,232,223,0.025)',
            userSelect: 'none',
            letterSpacing: '-0.05em',
          }}>
            TENANG
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '2.5rem' }}
            >
              Begin your journey
            </motion.p>

            <SplitChars
                text={['You have found', 'the still place.']}
                tag="h2"
                stagger={0.02}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem, 10vw, 13rem)',
                  fontWeight: 300,
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-ivory)',
                  marginBottom: '3rem',
                }}
            />

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  color: 'var(--color-stone)',
                  maxWidth: '45ch',
                  margin: '0 auto 4rem',
                  lineHeight: 1.9,
                }}
            >
              Our guest experience director is available for private consultation.
              Twelve villas. Limited availability. All enquiries are personal.
            </motion.p>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Magnetic>
                <Link href="/reserve" className="mag-btn" data-hover>
                  <span>Reserve Exclusively</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href="tel:+6236175000" className="mag-btn" data-hover style={{ borderColor: 'rgba(237,232,223,0.2)', color: 'rgba(237,232,223,0.5)' }}>
                  <span>+62 361 75 000</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </section>
      </>
  );
}
