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

GoDevs Blocks extends the WordPress block editor with a complete block library built on a modern CSS Custom Property design token system. Every block is responsive across 6 breakpoints, outputs clean semantic HTML, and ships with zero inline styles.

**36 Blocks &bull; 41 Patterns &bull; 6 Breakpoints &bull; Zero jQuery**

= All 36 Blocks =

**Layout**

* **Group** - Flexible section wrapper with flex/grid layout, link mode, animation classes, and full tag control (div, section, article, aside, and more)
* **Column** - Flex column for multi-column layouts with responsive width per breakpoint
* **Container** - Centered, max-width-constrained content wrapper

**Content**

* **Text** - Rich text block with dynamic content tag support
* **Heading** - Semantic headings (h1-h6) with dynamic content and full typography control
* **Button** - CTA button or anchor link with full ARIA support
* **Image** - Responsive image with dynamic source, link wrapping, and caption
* **Icon** - SVG icon picker with 112 icons, stroke/fill control, and size responsiveness
* **Shape** - Decorative SVG shape dividers for section transitions
* **Separator** - Styled horizontal rule with width, height, and colour control
* **Spacer** - Fixed-height vertical spacer with responsive height per breakpoint

**Interactive**

* **Tabs** - ARIA-compliant tabbed content panels with keyboard navigation (Arrow keys, Home, End)
* **Tab Panel** - Individual tab panel template block
* **Accordion** - Native details/summary accordion with optional FAQ schema.org markup
* **Accordion Item** - Individual accordion item with open/close state
* **Slider** - Touch-enabled content slider with autoplay, loop, arrows, dots, and progress bar
* **Slide** - Individual slide template block
* **Modal** - Accessible dialog with trigger button, close button, and backdrop
* **Flip Card** - CSS-animated front/back flip card with custom content on each face
* **Countdown** - Live countdown timer with days, hours, minutes, and seconds

**Query & Posts**

* **Query** - Visual post query builder with filters for type, taxonomy, author, date, and more
* **Query Loop** - Loop template rendered for each post inside the Query block
* **Query No Results** - Customisable fallback content shown when zero posts are found
* **Pagination** - Standard, load-more, and infinite scroll pagination modes

**Widgets & UI**

* **Counter** - Animated number counter with start value, end value, and duration
* **Progress Bar** - Animated progress bar with percentage label and colour control
* **Alert** - Dismissible alert/notice block with info, success, warning, and error variants
* **Star Rating** - Static star rating display with half-star support
* **Social Share** - Share buttons for Facebook, X (Twitter), LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, Email, and copy-to-clipboard
* **Pricing** - Pricing card with plan name, price, feature list, and CTA button
* **Table of Contents** - Auto-generated TOC from heading blocks on the page

**Media**

* **Lottie** - Lottie JSON animation player (library loaded locally) with autoplay, loop, and speed control
* **Video** - Self-hosted, YouTube, or Vimeo video embed with poster image

**Structure**

* **Navigation** - Site navigation menu rendered as accessible nav element with walker support
* **Timeline** - Vertical or horizontal timeline container
* **Timeline Item** - Individual timeline entry with date, title, body, icon, and colour

= Design System =

* Full CSS Custom Property design token system (--gb-* prefix)
* Responsive controls for every property across 6 breakpoints (xs, sm, md, lg, xl, 2xl)
* Global color and typography presets managed in GoDevs Blocks > Global Styles
* theme.json integration via the wp_theme_json_data_theme filter, merging the plugin color palette into WordPress global styles
* Optional dark mode support via CSS custom properties (enabled in Settings)
* RTL language support with automatic CSS property flipping

= Performance =

* Zero frontend JavaScript for layout and text blocks
* Per-page CSS file caching served as a static file from the uploads directory
* Delta CSS regeneration that only rebuilds CSS for blocks that change
* Block-level JavaScript code splitting in the editor
* No jQuery dependency

= Accessibility =

* Markup follows WCAG 2.1 AA guidelines
* Keyboard navigation for all interactive blocks (Tabs: Arrow keys, Home, End)
* Proper ARIA roles and attributes (role="tablist", role="tab", role="tabpanel", role="dialog", aria-controls, aria-selected, tabindex)
* Semantic HTML output with full wrapper tag control
* FAQ Accordion outputs schema.org/FAQPage structured data

= Dynamic Content =

* 22 built-in dynamic content tags: post title, excerpt, URL, ID, type, date, modified date, status, featured image, author name, author URL, author meta, site title, site URL, term name, term URL, term count, current date, post meta, user meta, query parameter, and more
* Conditional output based on context (single post, archive, query loop)
* Secure validation and escaping for every tag
* Extensible via the goblocks_register_dynamic_tags hook

= Pattern Library =

* 41 ready-made block patterns across 18 categories
* Hero (4), Features (4), Testimonials (4), Pricing (2), Stats (3), CTA (3), FAQ (2), Blog (2), Cards (2), Portfolio (2), Services (1), Team (2), About (1), Video (1), Newsletter (2), Contact (3), Logos (2), Announcement (1)
* Searchable pattern browser in GoDevs Blocks > Patterns
* All patterns available in the block editor pattern inserter

= For Developers =

* TypeScript throughout with strict mode
* Zustand for editor state management
* Fully extensible via WordPress hooks and filters
* PSR-4 PHP autoloader, WordPress Coding Standards compliant
* PHPStan level 8 compliant
* REST API for settings, styles, queries, dynamic content, and patterns

= Links =

* [Plugin Page](https://godevs.net/godevs-blocks)
* [Support Forum](https://wordpress.org/support/plugin/godevs-blocks)
* [Source Code on GitHub](https://github.com/godevsltd/godevsblocks)

= Source Code & Build =

The complete source code is publicly available on GitHub:

https://github.com/godevsltd/godevsblocks

The build/ directory in the plugin ZIP is compiled from the src/ directory using @wordpress/scripts (webpack). To regenerate the build: clone the repository, run npm install, then run npm run build. Node.js 18+ and npm 9+ are required.

== Installation ==

1. Upload the godevs-blocks folder to your /wp-content/plugins/ directory, or install via Plugins > Add New in WordPress.
2. Activate the plugin through the Plugins menu in WordPress.
3. Open any post or page in the block editor.
4. Find GoDevs Blocks in the block inserter under the GoDevs Blocks category.
5. (Optional) Visit GoDevs Blocks > Global Styles to configure your color palette and typography presets.
6. (Optional) Visit GoDevs Blocks > Settings to adjust breakpoints, CSS output method, and other options.

Requirements:

* WordPress 6.5 or higher
* PHP 8.0 or higher
* A modern browser (Chrome, Firefox, Safari, Edge, latest two major versions)

== External Services ==

This plugin connects to third-party services in the following cases. No data is sent by the plugin server-side; connections are initiated by the visitor's browser when the relevant block is present on the page.

= Video Block =

When you use the Video block to embed a YouTube video, the visitor's browser connects to youtube.com to load and play the video. YouTube may collect data including the visitor's IP address in accordance with Google's privacy policy.

* Service: YouTube (Google LLC)
* Data sent: visitor IP address and standard browser request headers
* When: a page containing a YouTube Video block is viewed
* Privacy policy: https://policies.google.com/privacy

When you use the Video block to embed a Vimeo video, the visitor's browser connects to player.vimeo.com.

* Service: Vimeo Inc.
* Data sent: visitor IP address and standard browser request headers
* When: a page containing a Vimeo Video block is viewed
* Privacy policy: https://vimeo.com/privacy

= Social Share Block =

When a visitor clicks a share button in the Social Share block, their browser opens the corresponding platform's share dialog. The current page URL and post title are appended to the share URL as query parameters. No data is transmitted server-side by this plugin.

* Services: Facebook, X (Twitter), LinkedIn, WhatsApp, Telegram, Reddit, Pinterest
* Data sent: current page URL and post title (as URL parameters, on click only)
* When: a visitor clicks a share button
* Privacy policies: refer to each platform's own privacy policy

== Frequently Asked Questions ==

= Does GoDevs Blocks work with my theme? =

Yes. GoDevs Blocks works with any WordPress theme including FSE themes, classic themes, and hybrid themes. It uses CSS custom properties that do not override your theme's existing styles.

= Does GoDevs Blocks work with Full Site Editing? =

Yes. All blocks use block API v3 with full block.json registration, making them fully compatible with the Site Editor. GoDevs Blocks also integrates with theme.json via the wp_theme_json_data_theme filter to share color palettes with the WordPress global styles system.

= Does GoDevs Blocks work with WordPress Multisite? =

Yes. GoDevs Blocks is compatible with WordPress Multisite. Each site in a network has its own CSS cache directory, its own settings, and its own global styles.

= Will GoDevs Blocks slow down my site? =

GoDevs Blocks generates a single CSS file per page, served as a static file from your uploads directory with standard browser caching. There is zero frontend JavaScript for layout, text, heading, image, icon, and separator blocks. Interactive blocks such as Tabs and Accordion use small vanilla JavaScript scripts (approximately 500 bytes each) that are only loaded when the block is present on the page.

= How do I use dynamic content? =

Use the tag syntax {post_title}, {post_date|format:Y}, or {post_meta|key:_my_field} in any Text or Heading block. Click the Dynamic Content button in the block toolbar to browse all 22 available tags. Tags are also supported in image src, alt, and custom HTML attributes.

= Can I create custom dynamic tags? =

Yes. Implement the GoBlocks\DynamicContent\TagInterface and register your tag via the goblocks_register_dynamic_tags action hook.

= Does GoDevs Blocks generate bloated HTML? =

No. GoDevs Blocks outputs minimal semantic HTML. There are no unnecessary wrapper divs, no inline styles, and no data attributes on most elements. All styling is applied through CSS custom properties scoped to the block's unique class.

= What is the CSS output method? =

By default, GoDevs Blocks writes a single CSS file per page to wp-content/uploads/goblocks/ and serves it with a link tag. This can be switched to inline style output in GoDevs Blocks > Settings > CSS Print Method.

= How do I add FAQ schema markup to the Accordion? =

Select your Accordion block, open the Inspector panel, and toggle Enable FAQ Schema. GoDevs Blocks will automatically add schema.org/FAQPage, Question, and Answer structured data to the rendered HTML.

= Does the plugin send any data to external servers? =

The plugin itself does not send any data to external servers. However, when a visitor views a page containing a YouTube or Vimeo Video block, their browser connects to those services directly. When a visitor clicks a Social Share button, their browser is redirected to the selected platform with the page URL and title as parameters. See the External Services section above for full details.

== Screenshots ==

1. The GoDevs Blocks block category in the block inserter showing Group, Column, Text, Heading, Icon, Tabs, Accordion, Query, and more.
2. The GoDevs Blocks Settings admin panel showing layout, performance (CSS output method), and editor preferences.
3. Frontend rendering of a hero section built with GoDevs Blocks Group and Heading blocks.
4. The GoDevs Blocks Column Demo page showing 2-column, 3-column, and 4-column flex layouts.
5. The GoDevs Blocks Pattern Library admin page with a searchable browser of 41 ready-made block patterns.
6. The GoDevs Blocks All Patterns Showcase frontend page displaying the full pattern collection.
7. The GoDevs Blocks Global Styles admin panel showing the color palette editor with CSS custom property tokens.
8. The GoDevs Blocks Tabs block on the frontend with ARIA-compliant tabbed panels and keyboard navigation.
9. The GoDevs Blocks Query block rendering a responsive 3-column blog post grid with title, date, and pagination.

== Changelog ==

= 1.0.0 =
* Initial release.
* 36 Blocks: Group, Column, Container, Text, Heading, Button, Image, Icon, Shape, Separator, Spacer, Tabs, Tab Panel, Accordion, Accordion Item, Query, Query Loop, Query No Results, Pagination, Navigation, Counter, Progress Bar, Alert, Star Rating, Lottie, Flip Card, Countdown, Social Share, Table of Contents, Slider, Slide, Modal, Pricing, Timeline, Timeline Item, Video.
* Icon block: Built-in visual icon picker with 112 icons across 13 categories (UI, Arrows, Communication, People, Files, Media, Commerce, Location, Sharing, Social, Time, Misc).
* Design Token System: CSS custom properties with 6 breakpoints (xs, sm, md, lg, xl, 2xl), RTL flip, minification, and deduplication.
* Dynamic Content System: 22 built-in tags, loop/single/archive contexts, secure tag validation.
* Global Styles Framework: Color palette editor, typography presets, container width, optional dark mode, theme.json integration.
* Pattern Library: 41 built-in patterns across 18 categories with pattern browser admin page and block editor inserter.
* FSE Support: Full Site Editor compatible; template-level CSS injected at wp_head priority 8.
* Performance: Per-page CSS file cache, delta regeneration, zero frontend JS for layout/text blocks.
* Accessibility: Markup follows WCAG 2.1 AA guidelines; ARIA roles, keyboard navigation, semantic HTML output.
* Developer: TypeScript strict, Zustand, PSR-4, WPCS, PHPStan level 8, REST API, i18n (.pot file with 108 strings).

== Upgrade Notice ==

= 1.0.0 =
Initial release. No upgrade required.
