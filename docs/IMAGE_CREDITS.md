# Image credits & "replace with your own" list

The treatment photos are **free stock placeholders** sourced from **Unsplash**
([Unsplash License](https://unsplash.com/license) — free for commercial use, no
attribution required, no permission needed). They show a deliberate mix of men,
women, couples and a range of ages so the site doesn't read as men-only.

> **These are placeholders.** Swap them for the clinic's own photos (or
> model-released stock) when available — see the legal note below.

## How to replace
- Each file lives in `public/image/services/<slug>/<name>.webp`.
- Drop a new image at the **same path/filename** and it updates everywhere
  automatically (no code changes needed).
- Recommended: ~1000px wide, `.webp`, landscape (~4:3).

## The "Stock · replace" badge
A small badge is shown on the prominent placeholder photos (problem cards +
featured cards) so it's obvious which are stock. To hide every badge before a
public launch, set one flag:

`src/components/ui/StockPhotoBadge.tsx` → `export const SHOW_STOCK_PHOTO_BADGE = false;`

## ⚖️ Important legal note (model releases)
Unsplash is safe from a **copyright** standpoint, but free stock photos are
generally **not "model-released."** Using an identifiable person's face next to
a sensitive condition (sexual health, weight, hormones) can create
right-of-publicity / defamation exposure. We mitigated this by using **upbeat,
non-condition-implying imagery** throughout. For the safest long-term setup,
replace any recognizable faces with **your own patient/clinic photos (with
consent)** or **model-released stock** (Adobe Stock / Shutterstock / Getty).

## Sources
All images are from Unsplash search results (e.g. "diverse people healthy
lifestyle", "woman exercising", "mature man active", "senior couple wellness",
"skincare face portrait"). Replace individually as real photography is produced.
