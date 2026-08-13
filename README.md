# GoDevs Blocks

**36 production-ready Gutenberg blocks for WordPress, built on a real CSS design token system with full FSE support, dynamic content, and zero jQuery.**

![WordPress](https://img.shields.io/badge/WordPress-6.5%2B-0073aa?style=flat-square&logo=wordpress)
![PHP](https://img.shields.io/badge/PHP-8.0%2B-777bb4?style=flat-square&logo=php)
![License](https://img.shields.io/badge/License-GPLv2-green?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)

## What is GoDevs Blocks?

GoDevs Blocks extends the WordPress block editor (Gutenberg) with a complete block library built on a modern **CSS Custom Property design token system**. Every block is responsive across 6 breakpoints, outputs clean semantic HTML, and ships with zero inline styles. All styling is compiled to a single per-page CSS file served as a static asset.

- **36 blocks** covering layout, content, interactive, media, and query use cases
- **41 ready-made patterns** across 18 categories
- **22 dynamic content tags** including post title, excerpt, date, meta fields, and more
- **6 responsive breakpoints** (xs, sm, md, lg, xl, 2xl) with per-property control in the editor
- **Zero jQuery**, vanilla JS only, zero frontend JS for non-interactive blocks
- **Full FSE support** with block API v3, `block.json`, and Site Editor compatibility

## Blocks

### Layout
| Block | Description |
|---|---|
| **Group** | Flex/grid section wrapper with link mode, animation classes, and custom tag control |
| **Column** | Flex column for multi-column layouts with responsive width per breakpoint |
| **Container** | Centered, max-width-constrained content wrapper |

### Content
| Block | Description |
|---|---|
| **Text** | Rich text block with dynamic content tag support |
| **Heading** | Semantic headings (h1-h6) with dynamic content and full typography control |
| **Button** | CTA button or anchor link with full ARIA support |
| **Image** | Responsive image with dynamic source, link wrapping, and caption |
| **Icon** | SVG icon picker with 112 icons across 13 categories and stroke/fill control |
| **Shape** | Decorative SVG shape dividers for section transitions |
| **Separator** | Styled horizontal rule with width, height, and colour control |
| **Spacer** | Fixed-height vertical spacer with responsive height per breakpoint |

### Interactive
| Block | Description |
|---|---|
| **Tabs** | ARIA-compliant tabbed panels with full keyboard navigation |
| **Tab Panel** | Individual tab panel template |
| **Accordion** | Native details/summary accordion with optional FAQ schema.org markup |
| **Accordion Item** | Individual accordion entry with open/close state |
| **Slider** | Touch-enabled content slider with autoplay, loop, arrows, dots, and progress bar |
| **Slide** | Individual slide template |
| **Modal** | Accessible dialog with trigger button, close button, and backdrop |
| **Flip Card** | CSS-animated front/back flip card |
| **Countdown** | Live countdown timer showing days, hours, minutes, and seconds |

### Query & Posts
| Block | Description |
|---|---|
| **Query** | Visual post query builder with filters for type, taxonomy, author, date, and more |
| **Query Loop** | Loop template rendered for each post inside the Query block |
| **Query No Results** | Fallback content shown when the query returns zero posts |
| **Pagination** | Standard, load-more, and infinite scroll pagination modes |

### Widgets & UI
| Block | Description |
|---|---|
| **Counter** | Animated number counter with start/end value and duration |
| **Progress Bar** | Animated progress bar with label and colour control |
| **Alert** | Dismissible notice with info, success, warning, and error variants |
| **Star Rating** | Static or dynamic star rating with half-star support |
| **Social Share** | Share buttons for Facebook, X (Twitter), LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, Email, and copy-to-clipboard |
| **Pricing** | Pricing card with plan name, price, feature list, and CTA button |
| **Table of Contents** | Auto-generated TOC from heading blocks on the page |

### Media
| Block | Description |
|---|---|
| **Lottie** | Lottie JSON animation player with autoplay, loop, and speed control |
| **Video** | Self-hosted or YouTube/Vimeo video embed with poster image |

### Structure
| Block | Description |
|---|---|
| **Navigation** | Site navigation menu with accessible nav element and walker support |
| **Timeline** | Vertical or horizontal timeline container |
| **Timeline Item** | Individual entry with date, title, body, icon, and colour |

## Requirements

| | Minimum |
|---|---|
| WordPress | 6.5 |
| PHP | 8.0 |
| Browser | Chrome, Firefox, Safari, Edge (latest 2 versions) |

## Installation

### From WordPress.org (Recommended)

1. Go to **Plugins > Add New** in your WordPress admin
2. Search for **GoDevs Blocks**
3. Click **Install Now**, then **Activate**

### Manual Install

1. Download the latest `godevs-blocks.zip` from [WordPress.org](https://wordpress.org/plugins/godevs-blocks/)
2. Go to **Plugins > Add New > Upload Plugin**
3. Upload the ZIP and click **Install Now**, then **Activate**

### After Activation

- Open any post or page and find blocks in the inserter under **GoDevs Blocks**
- Visit **GoDevs Blocks > Global Styles** to configure your color palette and typography
- Visit **GoDevs Blocks > Settings** to adjust breakpoints and CSS output method
- Visit **GoDevs Blocks > Patterns** to browse all 41 ready-made patterns

## Features

### Design Token System

All styling is driven by CSS Custom Properties with the `--gb-*` prefix. The editor writes token values and the frontend reads them with no inline styles and no specificity conflicts.

- Responsive controls for every property (xs, sm, md, lg, xl, 2xl breakpoints)
- Global color and typography presets in **GoDevs Blocks > Global Styles**
- `theme.json` integration via `wp_theme_json_data_theme` that merges the GoDevs Blocks color palette into WordPress global styles
- Dark mode and RTL support built in

### Performance

- **Zero frontend JS** for layout, text, heading, image, icon, and separator blocks
- **Per-page CSS cache** with one static file per page served from `/wp-content/uploads/goblocks/`
- **Delta regeneration** that only rebuilds CSS for blocks that actually changed
- **Code splitting** so each block's editor JS loads independently
- No jQuery, no external CDN dependencies

### Accessibility

- Markup follows WCAG 2.1 AA guidelines across all blocks
- Full keyboard navigation for interactive blocks (Arrow keys, Home, End for Tabs)
- Proper ARIA roles: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `role="dialog"`
- Semantic HTML with your choice of wrapper tag (div, section, article, aside)
- FAQ Accordion outputs `schema.org/FAQPage` structured data

### Dynamic Content

Use `{post_title}`, `{post_date|format:Y}`, or `{post_meta|key:_my_field}` in any Text or Heading block. 22 built-in tags with context awareness for single post, archive, and query loop. Extend with the `goblocks_register_dynamic_tags` hook.

### Pattern Library

41 ready-made patterns across 18 categories including Hero, Features, Testimonials, Pricing, Stats, CTA, FAQ, Blog, Cards, Portfolio, Services, Team, About, Video, Newsletter, Contact, Logos, and Announcement. Browse them in **GoDevs Blocks > Patterns** or insert directly from the block editor.

## Links

- [WordPress.org Plugin Page](https://wordpress.org/plugins/godevs-blocks/)
- [Support Forum](https://wordpress.org/support/plugin/godevs-blocks/)
- [GoDevs Website](https://godevs.net/godevs-blocks)

## License

GoDevs Blocks is free software released under the [GNU General Public License v2](https://www.gnu.org/licenses/gpl-2.0.html) or later.

&copy; 2024 [GoDevs](https://godevs.net)
