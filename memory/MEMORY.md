# Reading Roost Project Memory

## Project Overview
"The Reading Roost Educational Services" - special education services website for Robin Rice in Ohio.
- 6 HTML pages at root level: index.html, about.html, services.html, scholarship.html, testimonials.html, contact-apply.html
- Vite + Sass/SCSS build system, Bootstrap 5, Bootstrap Icons
- Deployed on **Netlify** (Cloudflare DNS → Netlify) — NOT Vercel, NOT GitHub Pages

## Deployment Setup (Canonical)
- **Host**: Netlify
- **DNS**: Cloudflare pointing to Netlify
- **Domain**: readingroost.com
- **Build**: `npm run build` → `dist/`
- **Config**: `netlify.toml` at root (created Feb 2026)
- **Vercel**: Disconnect from GitHub repo to stop failed deploy notifications

## Form / Email
- **Web3Forms** for contact form submissions (access key already in HTML)
- Form at `contact-apply.html` POSTs to `https://api.web3forms.com/submit`
- Includes: subject, from_name, redirect, botcheck honeypot
- Parent email field uses `name="email"` for Web3Forms reply-to
- Redirect after success: `https://readingroost.com/contact-apply.html?success=1`
- Success banner JS at bottom of contact-apply.html handles `?success=1`

## Key Architectural Decisions (Feb 2026 cleanup)
- Font Awesome NOT installed — use only `bi bi-*` Bootstrap Icons
- No Vercel Speed Insights — removed from all pages
- No `functions/submit.js` (was Cloudflare Workers syntax, incompatible with Netlify)
- No `scripts/submit-form.js` (was E2E test pointing to old GitHub Pages URL)
- OG image: `public/og-image.png` (stable path, copied from reading-roost-hero.png)
- All canonical/OG/Schema URLs use `https://readingroost.com`

## Important File Paths
- Main SCSS entry: `src/scss/main.scss`
- Design tokens: `src/scss/components/_variables.scss`
- Utility CSS classes: `src/scss/components/_utilities.scss`
- Gallery JS: `src/js/gallery.js`
- Gallery images: `src/assets/images/gallery/gallery-01.jpg` through `gallery-27.jpg` (27 total)
- Background texture: `src/assets/images/background-texture.jpg`
- OG image: `public/og-image.png`

## CSS Conventions
- All opacity via CSS variables (--opacity-light, --opacity-medium-light, etc.)
- Background gradients: use `.bg-gradient-light`, `.bg-gradient-testimonial`, `.bg-gradient-teal-card`, `.bg-gradient-teal-subtle`
- No inline styles on sections — use utility classes
- No Font Awesome — Bootstrap Icons only
- Hamburger button: `<button class="hamburger" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="nav-menu">`
- Nav menu: `<ul class="nav-menu" id="nav-menu">`

## SASS Deprecation Warnings
- Bootstrap 5 SCSS uses global built-in functions deprecated in Dart Sass 3.0
- ~327 warnings at build time — non-critical, from Bootstrap internals
