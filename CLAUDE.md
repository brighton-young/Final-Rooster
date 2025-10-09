# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ IMPORTANT NOTES FOR CLAUDE

**ALWAYS READ THIS FILE FIRST** when the user asks you to:
- "Review the code"
- "Look at the codebase"
- "Check the project"
- Start a new conversation
- Work on new features

**ALWAYS UPDATE THIS FILE** at the end of each work session with:
- New features added
- Styling changes made
- File structure changes
- Important decisions or patterns established

---

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

- **Primary color**: `#2D7A79` (teal)
- **Background color for content boxes**: `#FFFBF0` (cream)
- **Typography**:
  - Headings: 'Grold Rounded Slim' font
  - Body: 'Geometris Round' font
  - All H1 headings: UPPERCASE
  - All H2 headings: Title Case
  - Body text: Bold (font-weight: 600) for readability
- **Global textured background**: `src/assets/images/background-texture.jpg` with fixed attachment
- **Bootstrap components** with custom theming
- **CSS custom properties** for consistent styling

### Standardized Design Tokens (in `_variables.scss`)
- **Opacity levels**: 0.05 (light), 0.1 (medium-light), 0.15 (medium), 0.9 (card backgrounds), 0.95 (overlays)
- **Shadows**: Unified shadow depths (sm, md, lg) across all components
- **Spacing**: Standard padding (4rem desktop, 2rem mobile) and card padding (2rem desktop, 1.5rem mobile)
- **Border radius**: Consistent rounded corners using CSS variables

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

# Development server with hot reload

npm run dev

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
│   │   ├── main.js              (Enhanced JavaScript functionality)
│   │   └── gallery.js           (Lightbox gallery functionality)
│   │
│   ├── scss/                    (Stylesheets)
│   │   ├── main.scss            (Main SCSS entry)
│   │   └── components/          (Component styles)
│   │       ├── _fonts.scss      (Custom font definitions)
│   │       ├── _variables.scss  (Design system variables - STANDARDIZED)
│   │       ├── _base.scss       (Base styles - CONSISTENT CENTERING/SIZING)
│   │       ├── _navigation.scss (Navigation components)
│   │       ├── _hero.scss       (Hero section)
│   │       ├── _cards.scss      (Card components)
│   │       ├── _forms.scss      (Form styling)
│   │       ├── _footer.scss     (Footer with designer credit)
│   │       ├── _animations.scss (Animations & transitions)
│   │       ├── _utilities.scss  (Utility classes)
│   │       ├── _enrollment.scss (Enrollment sections - SIMPLIFIED)
│   │       └── _gallery.scss    (Image gallery & lightbox)
│   │
│   └── assets/                  (Source assets)
│       ├── fonts/               (Custom font files)
│       ├── images/              (Source images)
│       │   └── gallery/         (37 images for services page gallery)
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

---

## Recent Changes & Development Log

### October 9, 2025 - Major Content & Styling Updates

#### Homepage Content Enhancements
**Location**: `index.html`

1. **Added "What is Special Education?" Section** (lines 47-58)
   - Explains special education services and IEP support
   - Clarifies that services are for BOTH homeschool and public/private school students
   - Centers content for better readability

2. **Added "Services Offered" Section** (lines 60-113)
   - **Jon Peterson Scholarship Provider** (featured card)
     - Highlighted as primary service
     - $9,585 - $32,445 for FY 2025
     - 100% scholarship acceptance
   - **Learning Aid Ohio Scholarship**
     - For IEP students in public/private schools
     - Income cap applies
     - Extra tutoring support
   - **Autism Scholarship Provider** (Coming Soon)
     - Marked with "Coming Soon" badge
     - Shows future service availability

3. **Updated "NOW ENROLLING" Section**
   - Changed subtitle to emphasize serving both homeschool AND public/private school students
   - Updated features to mention multiple funding options

#### Footer Updates (All Pages)
**Files**: `index.html`, `about.html`, `services.html`, `scholarship.html`, `testimonials.html`, `contact-apply.html`

- Updated copyright year from 2024 to **2025**
- Added designer credit: "Designed by Brighton Young Designs" with LinkedIn link
- Styled credit with subtle underline and hover effect
- **CSS Location**: `src/scss/components/_footer.scss` (lines 189-207)

#### Styling Consistency Fixes
**Major overhaul to eliminate conflicting styles and ensure consistency**

1. **Standardized Variables** (`src/scss/components/_variables.scss`)
   - Created consistent opacity levels (0.05, 0.1, 0.15, 0.9, 0.95)
   - Unified shadow system (sm, md, lg)
   - Standardized spacing variables (section-padding, card-padding)
   - All components now use these variables instead of random values

2. **Fixed Base Styles** (`src/scss/components/_base.scss`)
   - Removed excessive `!important` declarations
   - Consistent font weights (600 for body text)
   - Proper centering for section headers and subheadings
   - Fixed text alignment hierarchy (cards: left-aligned with centered headings)

3. **Cleaned Up Enrollment Styles** (`src/scss/components/_enrollment.scss`)
   - Removed dozens of conflicting `!important` rules
   - Simplified to just background gradients and component-specific styles
   - Moved core styles to `_base.scss` to prevent conflicts

4. **Updated Hero Styles** (`src/scss/components/_hero.scss`)
   - Consistent transparency using standardized opacity variables
   - H1 & H2 both uppercase with consistent sizing
   - Proper gradient application

5. **Service Card Improvements** (`src/scss/components/_cards.scss`)
   - Service descriptions centered
   - Service notes centered
   - Consistent padding using variables
   - Proper font weights (600) for readability

#### Image Gallery Feature
**Location**: `services.html` (lines 212-381)

**New Files Created**:
- `src/scss/components/_gallery.scss` - Gallery styles
- `src/js/gallery.js` - Lightbox functionality

**Features**:
- 37 images in responsive grid (250px squares on desktop, 150px on mobile)
- Hover effects with teal overlay and magnifying glass icon
- Click to open full-screen lightbox modal
- Navigation with previous/next arrows
- Keyboard support (arrows to navigate, Escape to close)
- Image counter showing position (e.g., "1 / 37")
- Smooth fade-in and zoom animations
- Touch-friendly for mobile devices

**Image Location**: `src/assets/images/gallery/` (37 images)

#### Key Patterns Established

1. **Centering Approach**:
   - Section headers and subheadings: Always centered
   - Service cards: Centered headings, left-aligned details
   - Enrollment sections: Everything centered
   - Cards with lists: Centered headings, left-aligned lists

2. **Typography**:
   - H1: UPPERCASE, clamp(2.5rem, 8vw, 4.5rem)
   - H2: Title Case, clamp(2rem, 5vw, 3rem)
   - Body: font-weight: 600 for all paragraphs

3. **Opacity Standards**:
   - Subtle backgrounds: 0.05 or 0.1
   - Card backgrounds: 0.9
   - Overlays: 0.95
   - Always use CSS variables, never hardcoded values

4. **Avoid These Patterns**:
   - ❌ Random opacity values (0.3, 0.7, etc.)
   - ❌ Excessive `!important` declarations
   - ❌ Inline styles (except for one-off backgrounds)
   - ❌ Hardcoded padding/margin values
   - ✅ Use CSS variables from `_variables.scss`
   - ✅ Use extends from shared classes
   - ✅ Keep specificity low and styles modular

---

## Important Implementation Notes

### When Adding New Sections
1. Use `var(--section-padding)` for desktop, `var(--section-padding-mobile)` for mobile
2. Use `var(--card-padding)` for cards
3. Center section headers and subheadings by default
4. Use standardized opacity variables from `_variables.scss`

### When Adding New Cards
1. Extend `.modern-card` for base styling
2. Center the heading (`h3`, `h4`, etc.)
3. Left-align body content and lists
4. Use `var(--card-padding)` and responsive `var(--card-padding-mobile)`

### When Working with Images
1. Gallery images go in `src/assets/images/gallery/`
2. General images go in `src/assets/images/`
3. Use the lightbox pattern from `gallery.js` for image viewing

### Typography Rules
- All H1 elements: UPPERCASE
- All H2 elements: Title Case (capitalize first letters)
- All body paragraphs: font-weight 600
- Headings in cards: Always centered
- Content in cards: Left-aligned unless specifically centered
