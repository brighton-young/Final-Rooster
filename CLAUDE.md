# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Reading Roost Educational Services" - a static website for a special education services company in Ohio. The project is a multi-page HTML website with custom CSS and minimal JavaScript functionality.

## Architecture

This is a simple static website consisting of:
- **5 HTML pages**: index.html (homepage), about-services.html, scholarship.html, testimonials.html, contact-apply.html
- **Single CSS file**: style.css with CSS custom properties and responsive design
- **Single JavaScript file**: script.js handling mobile navigation menu toggle
- **Assets folder**: images/ containing logo, background texture, staff photos, and QR code

## Key Design System

The site uses a consistent design system defined in CSS custom properties:
- Primary color: `#2D7A79` (teal)
- Background color for content boxes: `#FFFBF0` (cream)
- Typography: Poppins (headings), Nunito (body text)
- Global textured background: `images/background-texture.jpg` with fixed attachment
- Content sections use semi-transparent cream backgrounds (`rgba(255, 251, 240, 0.85-0.9)`) to ensure readability over the textured background

## Mobile Navigation

The mobile menu is implemented with a hamburger toggle in script.js. The navigation uses CSS transforms to slide in from the left on mobile devices.

## Development Commands

This project has no build process, package.json, or dependencies. It's a static HTML/CSS/JS website that can be:
- Opened directly in a browser by opening any .html file
- Served using any static file server (e.g., `python -m http.server` or `live-server`)

## File Structure

```
/
├── index.html              (Homepage)
├── about-services.html     (About & Services)
├── scholarship.html        (Scholarship information)
├── testimonials.html       (Customer testimonials)
├── contact-apply.html      (Contact & Application)
├── style.css               (All styles)
├── script.js               (Mobile navigation)
├── favicon.ico
└── images/                 (Logo, backgrounds, photos)
```

## Common Tasks

- **Preview the site**: Open any .html file directly in a browser, or use a local server
- **Edit styling**: Modify style.css (uses CSS custom properties for easy theming)
- **Update content**: Edit the respective HTML files
- **Add images**: Place in the images/ folder and reference appropriately

No linting, testing, or build processes are configured for this project.