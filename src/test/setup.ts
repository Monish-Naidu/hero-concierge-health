import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as React from 'react';

afterEach(() => {
  if (typeof document !== 'undefined') {
    cleanup();
    document.body.style.overflow = '';
  }
});

/* ---- jsdom polyfills ---- */
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;
if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;
  }
  window.scrollTo = vi.fn();
}

/* ---- framer-motion: render plain elements, no animation timing (deterministic) ---- */
vi.mock('framer-motion', () => {
  const STRIP = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'variants',
    'whileHover',
    'whileTap',
    'whileInView',
    'whileFocus',
    'whileDrag',
    'viewport',
    'layout',
    'layoutId',
    'drag',
    'style',
  ]);
  const make = (tag: string) =>
    React.forwardRef(function MotionMock(props: Record<string, unknown>, ref) {
      const clean: Record<string, unknown> = {};
      for (const key in props) {
        if (!STRIP.has(key)) clean[key] = props[key];
      }
      // keep inline style only if it isn't a motion value object
      if (props.style && typeof props.style === 'object') clean.style = props.style;
      return React.createElement(tag, { ...clean, ref });
    });
  const cache: Record<string, ReturnType<typeof make>> = {};
  const motion = new Proxy(
    {},
    { get: (_t, tag: string) => (cache[tag] ??= make(tag)) }
  );
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useInView: () => true,
  };
});

/* ---- next/image: plain <img> ---- */
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, fill, priority, ...rest } = props;
    const resolved = typeof src === 'string' ? src : (src as { src?: string })?.src;
    return React.createElement('img', { src: resolved, alt, ...rest });
  },
}));

/* ---- next/navigation ---- */
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));
