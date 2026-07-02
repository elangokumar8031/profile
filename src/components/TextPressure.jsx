// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

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
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',

  minFontSize = 24,
  animateOnMount = true
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const isHovered = useRef(false);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const hasAutoAnimated = useRef(false);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const chars = text.split('');

  const handleMouseEnter = useCallback(e => {
    isHovered.current = true;
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
    cursorRef.current.x = e.clientX;
    cursorRef.current.y = e.clientY;
  }, []);

  const handleMouseMove = useCallback(e => {
    if (isHovered.current) {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    cursorRef.current.x = -9999;
    cursorRef.current.y = -9999;
  }, []);

  const handleTouchStart = useCallback(e => {
    isHovered.current = true;
    const t = e.touches[0];
    if (t) {
      mouseRef.current.x = t.clientX;
      mouseRef.current.y = t.clientY;
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    }
  }, []);

  const handleTouchMove = useCallback(e => {
    if (isHovered.current && e.touches[0]) {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isHovered.current = false;
    cursorRef.current.x = -9999;
    cursorRef.current.y = -9999;
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile) {
      setFontSize(minFontSize || 18);
      setScaleY(1);
      setLineHeight(1);
      setIsReady(true);
      return;
    }

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
      setIsReady(true);
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 200, 800)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

          const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  useEffect(() => {
    if (!animateOnMount || hasAutoAnimated.current) return;

    const isFirstVisit = typeof window !== 'undefined' && !sessionStorage.getItem('introPlayed');
    const delay = isFirstVisit ? 2200 : 500;
    const duration = 1800;

    let startTime = null;
    let rafId = null;

    const timeoutId = setTimeout(() => {
      if (isHovered.current || !titleRef.current || hasAutoAnimated.current) return;
      hasAutoAnimated.current = true;

      const titleRect = titleRef.current.getBoundingClientRect();
      if (titleRect.width === 0) return;

      const maxDist = titleRect.width / 2;
      const startX = titleRect.left - maxDist * 2.2;
      const centerY = titleRect.top + titleRect.height / 2;

      cursorRef.current.x = startX;
      cursorRef.current.y = centerY;
      mouseRef.current.x = startX;
      mouseRef.current.y = centerY;

      const step = (timestamp) => {
        if (isHovered.current || !titleRef.current) {
          return;
        }
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentRect = titleRef.current.getBoundingClientRect();
        const currentMaxDist = currentRect.width / 2;
        const currentStartX = currentRect.left - currentMaxDist * 2.2;
        const currentEndX = currentRect.right + currentMaxDist * 2.2;
        const currentCenterY = currentRect.top + currentRect.height / 2;

        if (progress < 1) {
          cursorRef.current.x = currentStartX + (currentEndX - currentStartX) * progress;
          cursorRef.current.y = currentCenterY;
          rafId = requestAnimationFrame(step);
        } else {
          cursorRef.current.x = -9999;
          cursorRef.current.y = -9999;
          mouseRef.current.x = -9999;
          mouseRef.current.y = -9999;
        }
      };

      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [animateOnMount]);

  const styleElement = useMemo(() => {
    return (
      <style>{`
        @import url('${fontUrl}');

        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>
    );
  }, [fontFamily, fontUrl, textColor, strokeColor]);

  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : ''].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.25s ease'
      }}
    >
      {styleElement}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 200,
          width: '100%',
          display: flex ? 'flex' : 'block',
          justifyContent: flex ? 'space-between' : undefined
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => (spansRef.current[i] = el)}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
