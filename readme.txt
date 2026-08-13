=== GoDevs Blocks ===
Contributors: godevs
Tags: gutenberg, blocks, block-editor, full-site-editing, page-builder
Requires at least: 6.5
Tested up to: 7.0
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

36 production-ready Gutenberg blocks with a real CSS design token system, 41 patterns, dynamic content tags, and full FSE support. Zero jQuery.

== Description ==

GoDevs Blocks extends the WordPress block editor with a complete block library built on a modern CSS Custom Property design token system. Every block is responsive across 7 breakpoints, outputs clean semantic HTML, and ships with zero inline styles.

**36 Blocks &bull; 41 Patterns &bull; 7 Breakpoints &bull; Zero jQuery**

= All 36 Blocks =

**Layout**

* **Group** — Flexible section wrapper with flex/grid layout, link mode, animation classes, and full tag control (div, section, article, aside...)
* **Column** — Flex column for multi-column layouts with responsive width per breakpoint
* **Container** — Centered, max-width-constrained content wrapper

**Content**

* **Text** — Rich text block with dynamic content tag support
* **Heading** — Semantic headings (h1–h6) with dynamic content and full typography control
* **Button** — CTA button or anchor link with full ARIA support
* **Image** — Responsive image with dynamic source, link wrapping, and caption
* **Icon** — SVG icon picker with 112 icons, stroke/fill control, and size responsiveness
* **Shape** — Decorative SVG shape dividers for section transitions
* **Separator** — Styled horizontal rule with width, height, and colour control
* **Spacer** — Fixed-height vertical spacer with responsive height per breakpoint

**Interactive**

* **Tabs** — ARIA-compliant tabbed content panels with keyboard navigation (Arrow, Home, End)
* **Tab Panel** — Individual tab panel template block
* **Accordion** — Native `<details>/<summary>` accordion with optional FAQ schema.org markup
* **Accordion Item** — Individual accordion item with open/close state
* **Slider** — Touch-enabled content slider with autoplay, loop, arrows, dots, and progress bar
* **Slide** — Individual slide template block
* **Modal** — Accessible dialog with trigger button, close button, and backdrop
* **Flip Card** — CSS-animated front/back flip card with custom content on each face
* **Countdown** — Live countdown timer with days, hours, minutes, seconds display

**Query & Posts**

* **Query** — Visual post query builder — filter by type, taxonomy, author, date, and more
* **Query Loop** — Loop template rendered for each post inside the Query block
* **Query No Results** — Customisable fallback content shown when zero posts are found
* **Pagination** — Standard, load-more, and infinite scroll pagination modes

**Widgets & UI**

* **Counter** — Animated number counter with start value, end value, and duration
* **Progress Bar** — Animated progress bar with percentage label and colour control
* **Alert** — Dismissible alert/notice block with info, success, warning, and error variants
* **Star Rating** — Static or dynamic star rating display with half-star support
* **Social Share** — Share buttons for Twitter/X, Facebook, LinkedIn, WhatsApp, and more
* **Pricing** — Pricing card with plan name, price, feature list, and CTA button
* **Table of Contents** — Auto-generated TOC from heading blocks on the page

**Media**

* **Lottie** — Lottie JSON animation player with autoplay, loop, and speed control
* **Video** — Self-hosted or YouTube/Vimeo video embed with poster image

**Structure**

* **Navigation** — Site navigation menu rendered as accessible `<nav>` with walker support
* **Timeline** — Vertical or horizontal timeline container
* **Timeline Item** — Individual timeline entry with date, title, body, icon, and colour

= Design System =

* Full CSS Custom Property design token system (`--gb-*` prefix)
* Responsive controls for every property across 6 breakpoints (xs, sm, md, lg, xl, 2xl)
* Global color and typography presets managed in **GoDevs Blocks → Global Styles**
* `theme.json` integration — reads and writes to WordPress global styles color palette
* Dark mode support via CSS custom properties
* RTL language support with automatic CSS flip

= Performance =

* Zero frontend JavaScript for layout and text blocks
* Per-page CSS file caching — served as a static file from the uploads directory
* Delta CSS regeneration — only regenerates CSS for blocks that change
* Block-level JavaScript code splitting in the editor
* No jQuery dependency

= Accessibility =

* WCAG 2.1 AA compliant markup
* Full keyboard navigation for all interactive blocks (Tabs: Arrow keys, Home, End)
* Proper ARIA roles and attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`, etc.)
* Semantic HTML output — choose your own wrapper tag
* FAQ Accordion ships with schema.org/FAQPage structured data

= Dynamic Content =

* 15 built-in dynamic content tags: post title, excerpt, date, featured image, author name, meta fields, site name, and more
* Conditional output based on context (single post, archive, query loop)
* Secure validation and escaping for every tag
* Extensible via `goblocks_register_dynamic_tags` hook

= Pattern Library =

* 41 ready-made block patterns across 18 categories
* Hero (4), Features (4), Social Proof (5), Pricing (2), Stats (3), CTA (4), FAQ (2), Blog (3), Cards (2), Portfolio (2), Services (1), Team (2), About (1), Video (1), Newsletter (2), Contact (3), Logos (2), Announcement (1)
* Searchable pattern browser in **GoDevs Blocks → Patterns**
* All patterns available in the block editor pattern inserter

= For Developers =

* TypeScript throughout — strict mode, no `any`
* Zustand for editor state (no Redux boilerplate)
* Fully extensible via WordPress hooks and filters
* PSR-4 PHP autoloader, WordPress Coding Standards compliant
* PHPStan level 8 compliant
* REST API for settings, styles, queries, dynamic content, and patterns

= Links =

* [Plugin Page](https://godevs.net/godevs-blocks)
* [Support Forum](https://wordpress.org/support/plugin/godevs-blocks)
* [Source Code on GitHub](https://github.com/godevsltd/godevsblocks)

= Source Code & Build =

The complete source code — TypeScript block files, build configuration, and all development tooling — is publicly available on GitHub:

https://github.com/godevsltd/godevsblocks

The `build/` directory in the plugin ZIP is compiled from the `src/` directory using `@wordpress/scripts` (webpack). To regenerate the build:

1. Clone the repo: `git clone https://github.com/godevsltd/godevsblocks.git`
2. Install dependencies: `npm install`
3. Build for production: `npm run build`

Requires Node.js 18+ and npm 9+.

== Installation ==

1. Upload the `godevs-blocks` folder to your `/wp-content/plugins/` directory, or install via **Plugins → Add New** in WordPress.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Open any post or page in the block editor.
4. Find GoDevs Blocks in the block inserter under the **GoDevs Blocks** category.
5. (Optional) Visit **GoDevs Blocks → Global Styles** to configure your color palette and typography presets.
6. (Optional) Visit **GoDevs Blocks → Settings** to adjust breakpoints, CSS output method, and other options.

**Requirements:**

* WordPress 6.5 or higher
* PHP 8.0 or higher
* A modern browser (Chrome, Firefox, Safari, Edge — latest two major versions)

== Frequently Asked Questions ==

= Does GoDevs Blocks work with my theme? =

Yes. GoDevs Blocks works with any WordPress theme — FSE themes, classic themes, and hybrid themes. It uses CSS custom properties that integrate with your theme's existing design system without overriding it.

= Does GoDevs Blocks work with Full Site Editing? =

Yes. All blocks use block API v3 with full `block.json` registration, making them fully compatible with the Site Editor. GoDevs Blocks also integrates with `theme.json` via the `wp_theme_json_data_theme` filter to share color palettes with the global styles system.

= Does GoDevs Blocks work with WordPress Multisite? =

Yes. GoDevs Blocks is multisite-compatible. Each site in a network has its own CSS cache directory, its own settings, and its own global styles — fully isolated.

= Will GoDevs Blocks slow down my site? =

No. GoDevs Blocks generates a single CSS file per page, served as a static file from your uploads directory with standard browser caching. There is zero frontend JavaScript for all layout, text, heading, image, and icon blocks. Interactive blocks (Tabs, Accordion) use tiny vanilla JS scripts (~500 bytes each) that are only loaded when the block is present on the page.

= How do I use dynamic content? =

Use the tag syntax `{post_title}`, `{post_date|format:Y}`, or `{post_meta|key:_my_field}` in any Text or Heading block. Click the **Dynamic Content** button in the block toolbar to browse all available tags. Tags are also supported in image `src`, `alt`, and custom HTML attributes.

= Can I create custom dynamic tags? =

Yes. Implement the `GoBlocks\DynamicContent\TagInterface` and register your tag:

`add_action( 'goblocks_register_dynamic_tags', function( $registry ) { $registry->register( new My_Custom_Tag() ); } );`

= Does GoDevs Blocks generate bloated HTML? =

No. GoDevs Blocks outputs minimal semantic HTML. There are no wrapper divs, no data-attributes on most elements, and no inline styles. All styling is done through CSS custom properties scoped to the block's unique class.

= What is the CSS output method? =

By default, GoDevs Blocks writes a single CSS file per page to `wp-content/uploads/goblocks/` and serves it with a `<link>` tag. This can be switched to inline `<style>` output in **GoDevs Blocks → Settings → CSS Print Method**.

= How do I add FAQ schema markup to the Accordion? =

Select your Accordion block, open the Inspector panel, and toggle **Enable FAQ Schema**. GoDevs Blocks automatically adds `schema.org/FAQPage`, `Question`, and `Answer` structured data to the rendered HTML.

== Screenshots ==

1. The GoDevs Blocks block category in the block inserter showing Group, Column, Text, Heading, Icon, Tabs, Accordion, Query, and more.
2. The GoDevs Blocks Settings admin panel showing layout, performance (CSS output method), and editor preferences.
3. Frontend rendering of a hero section built with GoDevs Blocks Group and Heading blocks — gradient background, badge, and CTA buttons.
4. The GoDevs Blocks Column Demo page showing 2-column, 3-column, and 4-column flex layouts built with Group and Column blocks.
5. The GoDevs Blocks Pattern Library admin page — searchable browser of 41 ready-made block patterns across 18 categories.
6. The GoDevs Blocks All Patterns Showcase frontend page displaying the full pattern collection.
7. The GoDevs Blocks Global Styles admin panel showing the color palette editor with CSS custom property tokens.
8. The GoDevs Blocks Tabs block on the frontend — ARIA-compliant tabbed panels with keyboard navigation.
9. The GoDevs Blocks Query block rendering a responsive 3-column blog post grid with title, date, and pagination.

== Changelog ==

= 1.0.0 =
* Initial release.
* **36 Blocks:** Group, Column, Container, Text, Heading, Button, Image, Icon, Shape, Separator, Spacer, Tabs, Tab Panel, Accordion, Accordion Item, Query, Query Loop, Query No Results, Pagination, Navigation, Counter, Progress Bar, Alert, Star Rating, Lottie, Flip Card, Countdown, Social Share, Table of Contents, Slider, Slide, Modal, Pricing, Timeline, Timeline Item, Video.
* **Icon block:** Built-in visual icon picker with 112 icons across 13 categories (UI, Arrows, Communication, People, Files, Media, Commerce, Location, Sharing, Social, Time, Misc).
* **Design Token System:** CSS custom properties with 7 breakpoints, RTL flip, minification, and deduplication.
* **Dynamic Content System:** 15 built-in tags, loop/single/archive contexts, secure tag validation.
* **Global Styles Framework:** Color palette editor, typography presets, container width, dark mode toggle, theme.json integration.
* **Pattern Library:** 41 built-in patterns across 18 categories — pattern browser admin page + block editor inserter.
* **FSE Support:** Full Site Editor compatible; template-level CSS injected at wp_head priority 8.
* **Performance:** Per-page CSS file cache, delta regeneration, zero frontend JS for layout/text blocks, deferred animation observer script.
* **Accessibility:** WCAG 2.1 AA, ARIA roles, keyboard navigation, semantic HTML output.
* **Developer:** TypeScript strict, Zustand, PSR-4, WPCS, PHPStan level 8, REST API, i18n (.pot with 108 strings).

== Upgrade Notice ==

= 1.0.0 =
Initial release. No upgrade required.
