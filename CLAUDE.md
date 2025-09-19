# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Reading Roost Educational Services" - a modern web application for a special education services company in Ohio. The project has been transformed from a static website into a dynamic build system with modern development tools.

## Architecture

This is a modern web application built with:
- **Build System**: Vite with Hot Module Replacement (HMR)
- **CSS Preprocessing**: Sass/SCSS with modular architecture
- **JavaScript**: ES6+ modules with Bootstrap integration
- **Styling Framework**: Bootstrap 5 with custom theming
- **5 HTML pages**: index.html (homepage), about-services.html, scholarship.html, testimonials.html, contact-apply.html
- **Modular SCSS**: Organized into components for maintainability
- **Modern JavaScript**: Enhanced interactivity and animations
- **Asset Optimization**: Image compression and optimization

## Key Design System

The site uses a consistent design system with Bootstrap integration:
- Primary color: `#2D7A79` (teal)
- Background color for content boxes: `#FFFBF0` (cream)
- Typography: Poppins (headings), Nunito (body text)
- Global textured background: `src/assets/background-texture.jpg` with fixed attachment
- Bootstrap components with custom theming
- CSS custom properties for consistent styling

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Code linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check
```

## File Structure

```
/
├── package.json                  (Dependencies & scripts)
├── vite.config.js               (Build configuration)
├── eslint.config.js             (Linting rules)
├── .prettierrc                  (Code formatting)
├── CLAUDE.md                    (Project documentation)
├── README.md                    (Project information)
│
├── public/                      (Static assets served as-is)
│   └── favicon.ico              (Site favicon)
│
├── src/                         (Source code)
│   ├── main.js                  (Main entry point)
│   │
│   ├── pages/                   (HTML templates)
│   │   ├── index.html           (Homepage)
│   │   ├── about-services.html  (About & Services)
│   │   ├── scholarship.html     (Scholarship information)
│   │   ├── testimonials.html    (Customer testimonials)
│   │   └── contact-apply.html   (Contact & Application)
│   │
│   ├── js/                      (JavaScript modules)
│   │   └── main.js              (Enhanced JavaScript functionality)
│   │
│   ├── scss/                    (Stylesheets)
│   │   ├── main.scss            (Main SCSS entry)
│   │   └── components/          (Component styles)
│   │       ├── _fonts.scss      (Custom font definitions)
│   │       ├── _variables.scss  (Design system variables)
│   │       ├── _base.scss       (Base styles)
│   │       ├── _navigation.scss (Navigation components)
│   │       ├── _hero.scss       (Hero section)
│   │       ├── _cards.scss      (Card components)
│   │       ├── _forms.scss      (Form styling)
│   │       ├── _animations.scss (Animations & transitions)
│   │       └── _utilities.scss  (Utility classes)
│   │
│   └── assets/                  (Source assets)
│       ├── fonts/               (Custom font files)
│       ├── images/              (Source images)
│       └── icons/               (Icon files)
│
└── dist/                        (Production build output - auto-generated)
```

## Features Added

- **Modern Build Process**: Vite for fast development and optimized production builds
- **CSS Preprocessing**: Sass with modular component architecture
- **Bootstrap Integration**: Modern UI components with custom theming
- **Image Optimization**: Automatic compression and WebP generation
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Live Reload**: Instant updates during development
- **Asset Bundling**: Optimized loading and caching

## Common Tasks

- **Start development**: `npm run dev` - Opens dev server with live reload
- **Build for production**: `npm run build` - Creates optimized build in dist/
- **Preview production**: `npm run preview` - Test production build locally
- **Lint code**: `npm run lint` - Check for code quality issues
- **Format code**: `npm run format` - Auto-format all code files
- **Edit styling**: Modify SCSS files in `src/scss/components/`
- **Update content**: Edit HTML files in `src/pages/` (images now reference `/src/assets/images/`)
- **Add images**: Place in `src/assets/images/` folder
- **Add fonts**: Place in `src/assets/fonts/` folder

## Development Workflow

1. Run `npm run dev` to start development server
2. Edit files - changes appear instantly with hot reload
3. Run `npm run lint` and `npm run format` to ensure code quality
4. Run `npm run build` to create production build
5. Run `npm run preview` to test production build locally