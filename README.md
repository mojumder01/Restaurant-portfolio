# Aurelia — restaurant website

A demo website for **Aurelia**, a Bengali & Mughlai restaurant in Gulshan, Dhaka. Built as a portfolio sample of a service-business website.

**Live demo:** https://mojumder01.github.io/Restaurant-portfolio/

## What's inside

- Animated hero: rotating rings, a ring of dish names, a floating dish photo, rising spice petals and steam
- Signature dishes in a swipeable track with arrows and a progress bar
- Our story: a floating photo collage and counters that count up on scroll
- Menu with five tabs (biryani, curries, starters, desserts, drinks), Bangla names, prices in taka and heat levels
- Photo gallery with a full-screen viewer (arrow keys and Esc work)
- Rotating guest reviews
- Table booking form with checks for name, phone and date, and a confirmation screen (demo only, nothing is sent)
- Sticky header, full-screen mobile menu and a Call / Reserve bar on phones
- Respects "reduce motion" settings; keyboard and screen-reader friendly

## Tech

React 19, TypeScript, Tailwind CSS 4, Vite. No backend.

## Edit the content

Everything (dishes, prices, photos, reviews, address, opening hours) is in [`src/data.ts`](src/data.ts).
A photo is either a file in `public/photos/` (written as `photos/<file>.jpg`) or an Unsplash photo id.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).
One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Licence

© Md Muntasir Mamun Mojumder. All rights reserved — see [LICENSE](LICENSE). Photos in `public/photos/` are used with permission; the rest come from [Unsplash](https://unsplash.com) under the Unsplash License.
