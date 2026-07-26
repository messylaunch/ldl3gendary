# L3GENDARY — Brand Website & Strategy

**"From the Streets to Legendary"**

Single-page cinematic brand site for Tavius Leverett's L3GENDARY brand — encompassing music, Rawlo Apparel, a book, podcast/media, and community impact.

## What's Here

| File | What It Is |
|------|------------|
| `index.html` | The full website — all HTML, CSS, and JS in one file. Open it in any browser. |
| `L3GENDARY-Strategy-Playbook.html` | The PDF-ready strategy guide for Tavius — print to PDF (Cmd+P). |

## Site Structure (9 Scenes)

1. **Hero** — "L3GENDARY" wordmark + "From the Streets to Legendary" tagline
2. **The Story** — Tavius's transformation biography
3. **Choose Your Path** — Interactive card navigation (Music / Apparel / Book / Media)
4. **Music** — 7 featured tracks + links to all 17 + bundle deal
5. **Rawlo Apparel** — Clothing showcase with product grid
6. **The Book** — "A Good Man Who Makes Bad Decisions" sales section
7. **Podcast & Media** — YouTube + podcast slots, social media pills
8. **Community & Impact** — Impact of FL, speaking, events, resources
9. **Join the Evolvement** — Email capture form (GHL-ready slot)

## Brand System

- **Palette:** Obsidian black (#08080A) + Gold (#C8A44E) + Crimson accent (#9B1B1A) + Warm white (#F8F6F0)
- **Display type:** Bebas Neue (uppercase, bold, urban)
- **Body type:** Inter (clean, readable)
- **Mono accents:** JetBrains Mono
- **Logo:** Crown monogram — L3 inside a crown triangle

## How to Deploy

Static HTML — no build step, no backend. Drop `index.html` on any host:

```bash
# Option 1: Serve locally
python3 -m http.server 8000

# Option 2: Deploy to Vercel
vercel .

# Option 3: Deploy to Netlify
netlify deploy --prod

# Option 4: GitHub Pages
# Push to a repo, enable Pages in Settings
```

## Dev Contract

- `?jump=<scrollY>` — lands pre-scrolled at the given Y position
- `window.__ready === true` — signals the page is settled (for screenshot harnesses)
- Respects `prefers-reduced-motion` — all animations disabled

## Before Going Live — TODO Checklist

- [ ] Replace GHL form slot (`#join`) with actual Go High Level form embed code
- [ ] Update YouTube embed with real channel iframe
- [ ] Add podcast platform links when available
- [ ] Confirm phone number (1-800-813-2959) is active
- [ ] Add real product images for hats and tees on WooCommerce
- [ ] Set up GHL automation: form submit → welcome email → tag → pipeline stages
- [ ] Add Facebook Pixel / Google Analytics tracking
- [ ] Set up SMS opt-in workflow in GHL (TCPA compliant)
- [ ] Create "From the Streets to Legendary" free PDF lead magnet
- [ ] Add real testimonials from community members
- [ ] Set up abandoned cart recovery in WooCommerce → GHL
- [ ] Replace Formspree placeholder action with GHL webhook

## Dependencies (CDN-loaded)

- GSAP 3.12.5 + ScrollTrigger (animation)
- Lenis 1.0.42 (smooth scrolling)
- Google Fonts: Bebas Neue, Inter, JetBrains Mono

## Related Repos

- **dlslawn** — Reference for the scroll-film approach and GHL-ready patterns
- **leepremier** — Reference for luxury cinematic single-page design
- **messylaunch** — The platform that powers client business launches

---

Built for the evolvement. 🥇
