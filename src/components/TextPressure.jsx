// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Variable font: https://compressa.preusstype.com/

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

/* ─── helpers ─── */
const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/* ─── component ─── */
const TextPressure = ({
  text        = 'Front End Engineer',
  fontFamily  = 'Compressa VF',
  fontUrl     = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',

  width       = true,
  weight      = true,
  italic      = true,
  alpha       = false,

  flex        = true,
  stroke      = false,
  scale       = false,

  textColor   = '#111111',
  strokeColor = '#5227FF',
  strokeWidth = 2,
  className   = '',

  minFontSize = 28,
  animationDelay = 0,
}) => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const spansRef     = useRef([]);

  const mouseRef  = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize,    setFontSize]    = useState(minFontSize);
  const [scaleY,      setScaleY]      = useState(1);
  const [lineHeight,  setLineHeight]  = useState(1);
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const initialStartTimeRef = useRef(Date.now());

  const chars = text.split('');

  /* ── track cursor / touch ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const onTouchMove = e => {
      cursorRef.current.x = e.touches[0].clientX;
      cursorRef.current.y = e.touches[0].clientY;
    };
    const onMouseLeave = () => {
      cursorRef.current.x = -10000;
      cursorRef.current.y = -10000;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave);

    // Initial state: far away
    cursorRef.current = { x: -10000, y: -10000 };
    mouseRef.current  = { x: -10000, y: -10000 };

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  /* ── responsive sizing ── */
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: cW, height: cH } = containerRef.current.getBoundingClientRect();
    let newFS = Math.max(cW / (chars.length / 2), minFontSize);

    setFontSize(newFS);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (scale && textRect.height > 0) {
        const ratio = cH / textRect.height;
        setScaleY(ratio);
        setLineHeight(ratio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  /* ── animation loop ── */
  useEffect(() => {
    let rafId;
    const animate = () => {
      if (isInitialAnimation) {
        const elapsed = Date.now() - initialStartTimeRef.current;
        if (elapsed < animationDelay) {
          rafId = requestAnimationFrame(animate);
          return;
        }
        
        const duration = 2000; // 2 seconds sweep
        const progress = Math.min((elapsed - animationDelay) / duration, 1);
        
        if (titleRef.current) {
          const titleRect = titleRef.current.getBoundingClientRect();
          // Sweep from left to right, slightly outside to give a smooth entrance/exit
          const sweepX = titleRect.left - 100 + (titleRect.width + 200) * progress;
          const sweepY = titleRect.top + titleRect.height / 2;
          
          mouseRef.current.x = sweepX;
          mouseRef.current.y = sweepY;
        }
        
        if (progress >= 1) {
          setIsInitialAnimation(false);
        }
      } else {
        mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
        mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
      }
      
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist   = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;
          const rect       = span.getBoundingClientRect();
          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const d          = dist(mouseRef.current, charCenter);

          const wdth    = width  ? Math.floor(getAttr(d, maxDist,   5, 200))          : 100;
          const wght    = weight ? Math.floor(getAttr(d, maxDist, 300, 900))          : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2)              :   0;
          const alphaV  = alpha  ? getAttr(d, maxDist, 0, 1).toFixed(2)              :   1;

          const fvs = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
          if (span.style.fontVariationSettings !== fvs) span.style.fontVariationSettings = fvs;
          if (alpha && span.style.opacity !== alphaV)   span.style.opacity = alphaV;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, isInitialAnimation]);

  /* ── font-face + stroke pseudo-element ── */
  const styleEl = useMemo(() => (
    <style>{`
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fontUrl}');
        font-style: normal;
      }
      .tp-stroke span {
        position: relative;
        color: ${textColor};
      }
      .tp-stroke span::after {
        content: attr(data-char);
        position: absolute;
        left: 0; top: 0;
        color: transparent;
        z-index: -1;
        -webkit-text-stroke-width: ${strokeWidth}px;
        -webkit-text-stroke-color: ${strokeColor};
      }
    `}</style>
  ), [fontFamily, fontUrl, textColor, strokeColor, strokeWidth]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}
    >
      {styleEl}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${stroke ? 'tp-stroke' : ''}`}
        style={{
          fontFamily,
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
          display: flex ? 'flex' : 'block',
          justifyContent: flex ? 'space-between' : undefined,
          textTransform: 'uppercase',
          textAlign: 'center',
          padding: '0 4px', // Add small side padding to prevent letter cropping
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => (spansRef.current[i] = el)}
            data-char={char}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
