import { RefreshCw } from 'lucide-react';

/**
 * Small marker shown on placeholder (free stock) imagery so it's obvious which
 * photos should be swapped for the clinic's own. Flip SHOW_STOCK_PHOTO_BADGE to
 * `false` (one line) to hide every badge before a public launch.
 *
 * Image sources + license are listed in docs/IMAGE_CREDITS.md.
 */
export const SHOW_STOCK_PHOTO_BADGE = true;

export function StockPhotoBadge() {
  if (!SHOW_STOCK_PHOTO_BADGE) return null;
  return (
    <span
      className="pointer-events-none absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm"
      title="Free stock placeholder — replace with your own photo"
    >
      <RefreshCw size={11} />
      Stock · replace
    </span>
  );
}
