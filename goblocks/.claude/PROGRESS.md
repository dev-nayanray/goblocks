# GoBlocks — Progress Tracker

> **RULE FOR ALL AGENTS:** Read this file FIRST every session.
> Mark items `[~]` IN PROGRESS when you start them.
> Mark items `[x]` DONE before ending the session.
> Never close a session with `[~]` items still open.

---

## Phase 1 — Architecture Analysis ✅

- [x] GenerateBlocks source code analysis
- [x] Folder structure, build system, block registration report
- [x] PHP class map, JS component map, utility function inventory
- [x] CSS generation system reverse-engineered
- [x] Dynamic content + query system analyzed
- [x] Plugin weaknesses identified
- [x] Improvement plan drafted

## Phase 2 — Framework & Design System ✅

- [x] Design token architecture (colors, type, spacing, radius, shadow, z-index, containers)
- [x] Block attribute framework (nested ResponsiveValue schema)
- [x] Universal control framework (hierarchy + prop contracts)
- [x] Responsive framework (breakpoint map, BreakpointStore, data flow)
- [x] CSS Generation Engine v2 (pipeline, data structures, cache strategy)
- [x] Global styles framework (theme.json integration, ThemeJsonBridge)
- [x] Dynamic content system (TagRegistry, TagSecurity, tag syntax)
- [x] Query builder system (attribute schema, REST, QueryBuilder, QuerySanitizer)
- [x] Block roadmap (17 blocks, priorities, complexity scores)
- [x] Technical decisions (TS, Zustand, CSS vars, REST, Dynamic blocks)

---

## Phase 3 — Implementation

### Step 1 — Bootstrap + Agent Context System ✅

- [x] `.claude/PROJECT.md`
- [x] `.claude/ARCHITECTURE.md`
- [x] `.claude/DESIGN-TOKENS.md`
- [x] `.claude/ATTRIBUTE-SCHEMA.md`
- [x] `.claude/CSS-ENGINE.md`
- [x] `.claude/CONTROLS.md`
- [x] `.claude/DYNAMIC-CONTENT.md`
- [x] `.claude/QUERY-BUILDER.md`
- [x] `.claude/BLOCK-ROADMAP.md`
- [x] `.claude/CODING-STANDARDS.md`
- [x] `.claude/PROGRESS.md` (this file)
- [x] `CLAUDE.md` root entry point
- [x] Full directory tree scaffolded with `.gitkeep`
- [x] `package.json`
- [x] `composer.json`
- [x] `tsconfig.json`
- [x] `webpack.config.js`
- [x] `phpcs.xml`
- [x] `phpstan.neon`
- [x] `.gitignore`
- [x] `goblocks.php` (main plugin bootstrap)
- [x] `uninstall.php`
- [x] `readme.txt`

---

### Step 2 — Core Framework: Design Tokens + Settings + Block Base ✅

- [x] `assets/css/tokens.css` — full CSS custom property token file
- [x] `assets/css/admin.css` — admin UI base styles
- [x] `includes/Utils/Singleton.php`
- [x] `includes/Utils/DTO.php`
- [x] `includes/Utils/Sanitize.php`
- [x] `includes/Utils/Capabilities.php`
- [x] `includes/Settings/Defaults.php`
- [x] `includes/Settings/Schema.php`
- [x] `includes/Settings/SettingsStore.php`
- [x] `includes/Blocks/BlockBase.php`
- [x] `includes/CSS/CssGenerator.php`
- [x] `includes/CSS/CssCache.php`
- [x] `includes/CSS/CssEnqueue.php`
- [x] `src/types/styles.ts` (BlockStyles, ResponsiveValue, Breakpoint types)
- [x] `src/types/block.ts` (universal block attribute types)
- [x] `src/types/index.ts`
- [x] `src/store/breakpointStore.ts`
- [x] `src/store/globalStylesStore.ts`
- [x] `src/store/index.ts`
- [x] `src/utils/css/units.ts`
- [x] `src/utils/css/shorthand.ts`
- [x] `src/utils/css/buildCss.ts`
- [x] `src/utils/css/generateTokens.ts`
- [x] `src/utils/color.ts`
- [x] `src/utils/classNames.ts`
- [x] `src/utils/deepMerge.ts`
- [x] `src/hooks/useBreakpoint.ts`
- [x] `src/hooks/useResponsiveStyles.ts`
- [x] `src/hooks/index.ts`
- [x] `src/utils/index.ts`
- [x] `src/editor.ts` (webpack entry stub)
- [x] `src/settings.ts` (webpack entry stub)
- [x] `src/patterns.ts` (webpack entry stub)
- [x] `src/global-styles.ts` (webpack entry stub)

---

### Step 3 — CSS Generation Engine (JS + PHP) ✅

- [x] `src/utils/css/StyleNormalizer.ts`
- [x] `src/utils/css/RuleBuilder.ts`
- [x] `src/utils/css/PseudoBuilder.ts`
- [x] `src/utils/css/MediaQueryWrapper.ts`
- [x] `src/utils/css/CssSerializer.ts`
- [x] `src/utils/css/Minifier.ts`
- [x] `src/utils/css/CssEngine.ts` (orchestrator)
- [x] `src/hooks/useCssEngine.ts`

---

### Step 4 — Inspector Controls Framework ✅

- [x] `src/types/controls.ts` (ControlProps, TokenOption, ToggleOption, UnitOption)
- [x] `src/components/controls/BreakpointTabs.tsx`
- [x] `src/components/controls/UnitInput.tsx`
- [x] `src/components/controls/ToggleGroupControl.tsx`
- [x] `src/components/controls/RangeControl.tsx`
- [x] `src/components/controls/ColorControl.tsx`
- [x] `src/components/controls/SpacingControl.tsx`
- [x] `src/components/controls/DimensionsControl.tsx`
- [x] `src/components/controls/FlexControl.tsx`
- [x] `src/components/controls/FontControl.tsx`
- [x] `src/components/controls/ShadowControl.tsx`
- [x] `src/components/controls/GradientControl.tsx`
- [x] `src/components/panels/LayoutPanel.tsx`
- [x] `src/components/panels/SizingPanel.tsx`
- [x] `src/components/panels/SpacingPanel.tsx`
- [x] `src/components/panels/TypographyPanel.tsx`
- [x] `src/components/panels/BackgroundPanel.tsx`
- [x] `src/components/panels/BorderPanel.tsx`
- [x] `src/components/panels/EffectsPanel.tsx`
- [x] `src/components/ui/InspectorTabs.tsx`
- [x] `src/components/ui/DeviceIndicator.tsx`
- [x] Barrel index files (controls/, panels/, ui/, components/)

---

### Step 5 — REST API + Settings Controller ✅

- [x] `includes/Core/Plugin.php` (orchestrator — boots CSS, REST, Admin, blocks)
- [x] `includes/REST/RestController.php` (abstract base with permission callbacks)
- [x] `includes/REST/SettingsController.php` (GET+POST /settings, POST /settings/reset)
- [x] `includes/REST/StylesController.php` (POST /styles/regenerate, /styles/regenerate/{id})
- [x] `includes/REST/QueryController.php` (post-types, taxonomies, terms, authors, preview)
- [x] `includes/REST/DynamicContentController.php` (preview + tags list, filter-based)
- [x] `includes/Admin/Admin.php` (menu page, asset enqueue, goblocksSettings localisation)
- [x] `includes/Admin/EditorAssets.php` (enqueue_block_editor_assets, goblocksEditor)
- [x] `goblocks.php` updated (Plugin::boot(), WP-Cron batch CSS regeneration)
- [x] `src/settings/index.tsx` (React SPA stub mounting into #goblocks-settings-root)
- [x] `src/types/block.ts` updated (GoblocksSettingsGlobals, window.goblocksSettings)

---

### Step 6 — Block 1: Box ✅

- [x] `src/blocks/box/block.json`
- [x] `src/blocks/box/index.ts`
- [x] `src/blocks/box/edit.tsx`
- [x] `src/blocks/box/save.tsx`
- [x] `src/blocks/box/transforms.ts`
- [x] `src/blocks/box/components/Inspector.tsx`
- [x] `includes/Blocks/Box.php`
- [x] Add `blocks/box/index` to webpack.config.js entries
- [ ] PHPUnit: `tests/php/Integration/Blocks/BoxTest.php` _(deferred to Step 18)_
- [ ] Playwright: `tests/e2e/blocks/box.spec.ts` _(deferred to Step 18)_

---

### Step 7 — Block 2: Text ✅

- [x] `src/blocks/text/block.json`
- [x] `src/blocks/text/index.ts`
- [x] `src/blocks/text/edit.tsx`
- [x] `src/blocks/text/save.tsx`
- [x] `src/blocks/text/transforms.ts`
- [x] `src/blocks/text/style.css` (drop cap — compiled to style-index.css)
- [x] `src/blocks/text/components/Inspector.tsx`
- [x] `includes/Blocks/Text.php`
- [x] Add `blocks/text/index` + `blocks/text/style-index` to webpack.config.js
- [ ] PHPUnit: `tests/php/Integration/Blocks/TextTest.php` _(deferred to Step 18)_
- [ ] Playwright: `tests/e2e/blocks/text.spec.ts` _(deferred to Step 18)_

**Also fixed in this step:**
- `src/blocks/box/edit.tsx` — replaced `uniqueClass(uniqueId)` (`gb-block-{id}`) with
  `` `gb-box-${uniqueId}` `` so the CSS selector generated by `CssEngine.makeSelector`
  (`.gb-box-{id}`) actually matches the DOM class in the editor.

### Step 8 — Block 3: Heading ✅

- [x] `src/blocks/heading/block.json`
- [x] `src/blocks/heading/index.ts`
- [x] `src/blocks/heading/edit.tsx` (RichText, level toolbar, anchor auto-gen, useCssEngine)
- [x] `src/blocks/heading/save.tsx`
- [x] `src/blocks/heading/transforms.ts` (from core/heading + core/paragraph; to core/heading)
- [x] `src/blocks/heading/components/Inspector.tsx` (level, anchor, link, CSS classes panels)
- [x] `includes/Blocks/Heading.php` (anchor id, link wrapping as inner <a>, noopener)
- [x] Add `blocks/heading/index` to webpack.config.js
- [ ] PHPUnit: `tests/php/Integration/Blocks/HeadingTest.php` _(deferred to Step 18)_
- [ ] Playwright: `tests/e2e/blocks/heading.spec.ts` _(deferred to Step 18)_

### Step 9 — Block 4: Button ✅

- [x] `src/blocks/button/block.json` (href/target/rel/download/buttonType/ariaLabel attrs)
- [x] `src/blocks/button/index.ts`
- [x] `src/blocks/button/edit.tsx` (outer Tag + inner RichText span, no href in editor)
- [x] `src/blocks/button/save.tsx`
- [x] `src/blocks/button/transforms.ts` (from/to core/button)
- [x] `src/blocks/button/components/Inspector.tsx` (conditional link vs button panels)
- [x] `includes/Blocks/Button.php` (TEXT_KSES for label, noopener, download attr, type allowlist)
- [x] Add `blocks/button/index` to webpack.config.js
- [ ] PHPUnit: `tests/php/Integration/Blocks/ButtonTest.php` _(deferred to Step 18)_
- [ ] Playwright: `tests/e2e/blocks/button.spec.ts` _(deferred to Step 18)_

### Step 10 — Block 5: Image ✅

- [x] `src/blocks/image/block.json` (mediaId/Url/Alt/Width/Height, sizeSlug, caption, showCaption, href/target/rel)
- [x] `src/blocks/image/index.ts`
- [x] `src/blocks/image/edit.tsx` (MediaPlaceholder + MediaUpload replace toolbar, RichText caption)
- [x] `src/blocks/image/save.tsx`
- [x] `src/blocks/image/transforms.ts` (from/to core/image, maps url↔mediaUrl, id↔mediaId)
- [x] `src/blocks/image/components/Inspector.tsx` (alt, size, caption toggle, link, CSS classes)
- [x] `includes/Blocks/Image.php` (wp_get_attachment_image for srcset/lazy, external URL fallback, link wrap, figcaption)
- [x] Add `blocks/image/index` to webpack.config.js
- [ ] PHPUnit: `tests/php/Integration/Blocks/ImageTest.php` _(deferred to Step 18)_
- [ ] Playwright: `tests/e2e/blocks/image.spec.ts` _(deferred to Step 18)_

### Step 11 — Block 6: Grid ✅

- [x] `src/blocks/grid/block.json` (standard attrs — all grid CSS via styles.layout)
- [x] `src/blocks/grid/index.ts`
- [x] `src/blocks/grid/edit.tsx` (InnerBlocks, 3-box template, tag switcher toolbar)
- [x] `src/blocks/grid/save.tsx`
- [x] `src/blocks/grid/transforms.ts` (from core/columns; to core/group)
- [x] `src/blocks/grid/components/GridPanel.tsx` (column presets 1-6, auto-fill toggle, custom template override)
- [x] `src/blocks/grid/components/Inspector.tsx` (GridPanel + SizingPanel + SpacingPanel + BackgroundPanel + BorderPanel + EffectsPanel)
- [x] `includes/Blocks/Grid.php` (thin InnerBlocks wrapper — all CSS from CssEngine)
- [x] Add `blocks/grid/index` to webpack.config.js
- [ ] PHPUnit: `tests/php/Integration/Blocks/GridTest.php` _(deferred to Step 18)_
- [ ] Playwright: `tests/e2e/blocks/grid.spec.ts` _(deferred to Step 18)_

---

### Step 12 — Query System (3 blocks + PHP query layer) ✅

- [x] `includes/Query/QuerySanitizer.php` (allowlist sanitizer for all query params)
- [x] `includes/Query/QueryBuilder.php` (maps block attrs → WP_Query args, goblocks_query_args filter)
- [x] `src/types/query.ts` (QueryAttributes, TaxFilter, MetaQuery, DateQuery, PostSummary)
- [x] `src/hooks/usePostTypes.ts` (module-level cache)
- [x] `src/hooks/useTaxonomies.ts` (per-postType cache)
- [x] `src/hooks/useTerms.ts` (debounced search 300ms)
- [x] `src/hooks/useAuthors.ts` (module-level cache)
- [x] `src/hooks/useQueryPreview.ts` (600ms debounce, AbortController cancel)
- [x] `src/blocks/query/block.json` (providesContext: queryId/query/paginationType)
- [x] `src/blocks/query/save.tsx`
- [x] `src/blocks/query/edit.tsx` (useInnerBlocksProps, QueryInspector)
- [x] `src/blocks/query/components/Inspector.tsx` (post type/perPage/order/tax/author/search/preview/pagination)
- [x] `src/blocks/query/index.ts`
- [x] `src/blocks/query-loop/block.json` (usesContext: queryId/query/paginationType, parent: query)
- [x] `src/blocks/query-loop/save.tsx`
- [x] `src/blocks/query-loop/edit.tsx` (InnerBlocks post template)
- [x] `src/blocks/query-loop/index.ts`
- [x] `src/blocks/pagination/block.json` (usesContext: queryId/paginationType, parent: query)
- [x] `src/blocks/pagination/save.tsx`
- [x] `src/blocks/pagination/edit.tsx` (type-adaptive preview, PaginationInspector)
- [x] `src/blocks/pagination/components/Inspector.tsx` (standard/load-more/infinite labels)
- [x] `src/blocks/pagination/index.ts`
- [x] `includes/Blocks/Query.php` (thin wrapper, provides context via block.json)
- [x] `includes/Blocks/QueryLoop.php` (runs WP_Query, iterates inner_blocks per-post, stores query for Pagination)
- [x] `includes/Blocks/Pagination.php` (standard paginate_links / load-more button / infinite sentinel)
- [x] webpack.config.js updated (query, query-loop, pagination entries uncommented)
- [ ] PHPUnit: `tests/php/Integration/Blocks/QueryTest.php` _(deferred to Step 18)_
- [ ] Playwright: `tests/e2e/blocks/query.spec.ts` _(deferred to Step 18)_

---

### Step 13 — Icon + Shape Blocks (P1) ✅

- [x] `includes/Utils/SvgSanitizer.php` (DOMDocument allowlist — strips script/on*/javascript: href, sanitize_attributes recursive)
- [x] `src/blocks/icon/icons/index.ts` (40 Tabler icons, iconToSvg helper, ICON_MAP)
- [x] `src/blocks/icon/block.json` (iconSlug/svgContent/iconSize/ariaHidden/ariaLabel/link attrs)
- [x] `src/blocks/icon/save.tsx`
- [x] `src/blocks/icon/edit.tsx` (library + custom SVG mode, useCssEngine, link as span in editor)
- [x] `src/blocks/icon/components/IconPicker.tsx` (searchable 6-column grid, aria-pressed selection)
- [x] `src/blocks/icon/components/Inspector.tsx` (Library/Custom SVG toggle, size, link, a11y)
- [x] `src/blocks/icon/index.ts`
- [x] `includes/Blocks/Icon.php` (SvgSanitizer, link wrap with noopener, aria-hidden/label)
- [x] `src/blocks/shape/shapes/index.ts` (12 preset shapes, buildShapeSvg helper)
- [x] `src/blocks/shape/block.json` (shapeSlug/fillColor/shapeHeight/flipX/flipY/placement attrs)
- [x] `src/blocks/shape/save.tsx`
- [x] `src/blocks/shape/edit.tsx` (live SVG preview, ShapeInspector)
- [x] `src/blocks/shape/components/Inspector.tsx` (preset picker, height, flip toggles, ColorPicker)
- [x] `src/blocks/shape/index.ts`
- [x] `includes/Blocks/Shape.php` (server-side SVG generation from SHAPES const, SvgSanitizer, color via CSS currentColor)
- [x] webpack.config.js updated (icon + shape entries uncommented)
- [ ] PHPUnit: deferred to Step 18
- [ ] Playwright: deferred to Step 18

---

### Step 14 — Dynamic Content System ✅

- [x] `includes/DynamicContent/TagInterface.php`
- [x] `includes/DynamicContent/TagBase.php`
- [x] `includes/DynamicContent/TagRegistry.php`
- [x] `includes/DynamicContent/TagSecurity.php`
- [x] `includes/DynamicContent/DynamicContent.php` (boot, filter handlers, context builders)
- [x] `includes/DynamicContent/Tags/PostTitle.php`
- [x] `includes/DynamicContent/Tags/PostExcerpt.php`
- [x] `includes/DynamicContent/Tags/PostDate.php`
- [x] `includes/DynamicContent/Tags/PostModified.php`
- [x] `includes/DynamicContent/Tags/PostUrl.php`
- [x] `includes/DynamicContent/Tags/PostId.php`
- [x] `includes/DynamicContent/Tags/PostStatus.php`
- [x] `includes/DynamicContent/Tags/PostType.php`
- [x] `includes/DynamicContent/Tags/PostMeta.php`
- [x] `includes/DynamicContent/Tags/FeaturedImage.php`
- [x] `includes/DynamicContent/Tags/AuthorName.php`
- [x] `includes/DynamicContent/Tags/AuthorMeta.php`
- [x] `includes/DynamicContent/Tags/AuthorUrl.php`
- [x] `includes/DynamicContent/Tags/AuthorAvatar.php`
- [x] `includes/DynamicContent/Tags/TermName.php`
- [x] `includes/DynamicContent/Tags/TermUrl.php`
- [x] `includes/DynamicContent/Tags/TermCount.php`
- [x] `includes/DynamicContent/Tags/UserMeta.php`
- [x] `includes/DynamicContent/Tags/CurrentDate.php`
- [x] `includes/DynamicContent/Tags/SiteTitle.php`
- [x] `includes/DynamicContent/Tags/SiteUrl.php`
- [x] `includes/DynamicContent/Tags/QueryParam.php`
- [x] `src/hooks/useDynamicPreview.ts` (parallel tag resolution, AbortController)
- [x] `src/dynamic-content/TagPicker.tsx` (grouped, searchable, module-level cache)
- [x] `src/dynamic-content/index.ts`
- [x] `includes/Core/Plugin.php` wired — `DynamicContent::boot()` called before REST init
- [ ] PHPUnit: deferred to Step 18

---

### Step 15 — Global Styles Framework ✅

- [x] `includes/GlobalStyles/GlobalStyles.php` (frontend/editor :root token output, admin submenu, asset enqueue)
- [x] `includes/GlobalStyles/ThemeJsonBridge.php` (wp_theme_json_data_theme filter → block editor palette)
- [x] `includes/Core/Plugin.php` wired — GlobalStyles::boot() + ThemeJsonBridge::boot()
- [x] `src/types/block.ts` — GoblocksGlobalStylesGlobals + Window declaration
- [x] `src/store/globalStylesStore.ts` — saveToServer fallback nonce/restUrl to goblocksGlobalStyles
- [x] `src/global-styles/App.tsx` (TabPanel: Colors / Typography / Settings + Save button)
- [x] `src/global-styles/components/ColorPaletteEditor.tsx` (add/edit/remove palette entries, Popover ColorPicker)
- [x] `src/global-styles/components/TypographyPresetEditor.tsx` (add/edit/remove presets, slug/label/family/size/weight/lineHeight)
- [x] `src/global-styles/components/GeneralSettings.tsx` (container width, dark mode toggle, disable Google Fonts toggle)
- [x] `src/global-styles/index.tsx` (hydrates Zustand store from goblocksGlobalStyles, mounts SPA)
- [x] `src/global-styles.ts` — imports SPA entry

---

### Step 16 — Advanced Blocks (v1.1) ✅

**Tabs (`goblocks/tabs` + `goblocks/tab-panel`):**
- [x] `src/blocks/tabs/block.json` (providesContext: tabsId, viewScript)
- [x] `src/blocks/tabs/index.ts`
- [x] `src/blocks/tabs/edit.tsx` (tab bar from inner block labels, Add Tab toolbar button, useCssEngine)
- [x] `src/blocks/tabs/save.tsx`
- [x] `src/blocks/tabs/view.ts` (vanilla JS: click, Arrow Left/Right/Up/Down, Home, End)
- [x] `src/blocks/tabs/components/Inspector.tsx` (orientation radio, defaultTab)
- [x] `includes/Blocks/Tabs.php` (iterates inner_blocks, builds tablist + panels, injects tabIndex context)
- [x] `src/blocks/tab-panel/block.json` (parent: tabs, usesContext: tabsId, inserter: false)
- [x] `src/blocks/tab-panel/index.ts`
- [x] `src/blocks/tab-panel/edit.tsx` (RichText label bar + InnerBlocks)
- [x] `src/blocks/tab-panel/save.tsx`
- [x] `includes/Blocks/TabPanel.php` (role=tabpanel, aria-labelledby, hidden on inactive panels)

**Accordion (`goblocks/accordion` + `goblocks/accordion-item`):**
- [x] `src/blocks/accordion/block.json` (providesContext: accordionFaqSchema, viewScript)
- [x] `src/blocks/accordion/index.ts`
- [x] `src/blocks/accordion/edit.tsx` (InnerBlocks restricted to accordion-item, useCssEngine)
- [x] `src/blocks/accordion/save.tsx`
- [x] `src/blocks/accordion/view.ts` (vanilla JS: closes siblings when allowMultiple=false via toggle event)
- [x] `src/blocks/accordion/components/Inspector.tsx` (allowMultiple toggle, enableFaqSchema toggle)
- [x] `includes/Blocks/Accordion.php` (data-allow-multiple, schema.org/FAQPage itemscope)
- [x] `src/blocks/accordion-item/block.json` (parent: accordion, usesContext: accordionFaqSchema, inserter: false)
- [x] `src/blocks/accordion-item/index.ts`
- [x] `src/blocks/accordion-item/edit.tsx` (details/summary with RichText question + InnerBlocks)
- [x] `src/blocks/accordion-item/save.tsx`
- [x] `includes/Blocks/AccordionItem.php` (details/summary + FAQ schema.org/Question markup when context set)
- [x] `webpack.config.js` updated (tabs/index, tabs/view, tab-panel/index, accordion/index, accordion/view, accordion-item/index)
- [ ] PHPUnit: deferred to Step 18
- [ ] Playwright: deferred to Step 18

---

### Step 17 — Pattern Library ✅

- [x] `includes/Patterns/PatternLibrary.php` (register_category + register_patterns via ob_start/include, admin submenu page, enqueue_admin_assets)
- [x] `includes/REST/PatternsController.php` (GET /goblocks/v1/patterns — filters by goblocks/ slug, require_edit_posts)
- [x] `patterns/hero/hero-centered.php` (WP pattern headers + block markup: section box, h1, text, button)
- [x] `patterns/cards/card-grid-3col.php` (WP pattern headers + block markup: grid + 3 box cards)
- [x] `patterns/cta/cta-with-image.php` (WP pattern headers + block markup: grid + image + box with heading/text/button)
- [x] `src/patterns/App.tsx` (searchable grid UI, copy-markup button, REST fetch via apiFetch)
- [x] `src/patterns/index.tsx` (mounts PatternsApp to #goblocks-patterns-root)
- [x] `src/patterns.ts` (updated stub → imports ./patterns/index)
- [x] `includes/Core/Plugin.php` (PatternLibrary::boot(), PatternsController::register_routes())

---

### Step 18 — QA + Testing ✅

- [x] `tests/php/bootstrap.php` (WP_Error, WP_Block, WP_REST_* stubs; ABSPATH/GOBLOCKS_* constants)
- [x] `tests/php/TestCase.php` (Brain\Monkey setUp/tearDown + common passthrough stubs)
- [x] `phpunit.xml` (PHPUnit 9.6, Unit + Integration suites, coverage include=includes/)
- [x] `playwright.config.ts` (Chromium, wp-env port 8888, 60s timeout, retain-on-failure trace)
- [x] `tests/php/Unit/CSS/CssGeneratorTest.php` (minify, flip_rtl, collect_from_blocks — 13 tests, no WP mocks needed)
- [x] `tests/php/Unit/Settings/SchemaTest.php` (key enumeration, int/string/bool/palette validation — 17 tests)
- [x] `tests/php/Unit/DynamicContent/TagSecurityTest.php` (allowlist, type checks, capabilities, contexts — 16 tests)
- [x] `tests/php/Integration/REST/SettingsControllerTest.php` (permission callbacks, get/update, namespace — 9 tests)
- [x] `tests/php/Integration/Blocks/BoxTest.php` (render, tagName, link mode, ARIA, animation class, htmlAttributes — 14 tests)
- [x] `tests/e2e/blocks/box.spec.ts` (insert, toolbar, inner blocks, tagName, frontend render, link mode, _blank rel)
- [x] `tests/e2e/blocks/text.spec.ts` (insert, type content, tagName, frontend render, inline HTML)
- [x] `tests/e2e/responsive.spec.ts` (device switcher, CSS injection, 375/768/1280 viewports, --gb-container-site token)

---

### Step 19 — WordPress.org Submission Prep ✅

- [x] `readme.txt` — completed (removed all TODO placeholders; full description, FAQ, changelog including Tabs/Accordion/Patterns, 9 screenshots)
- [x] `languages/goblocks.pot` — POT file header stub with all known translatable strings (run `npm run i18n:pot` to regenerate fully)
- [x] `.distignore` — excludes src/, tests/, node_modules/, vendor/, build tooling, CI, .github/ from plugin ZIP
- [x] `.github/workflows/ci.yml` — full CI pipeline: phpcs, phpstan, phpunit (PHP 8.0–8.3 matrix), JS lint+build, E2E (WP 6.5–latest matrix), Plugin Check, ZIP artifact
- [x] `bin/build-zip.sh` — production ZIP script: rsync with .distignore, verify required files, restore dev deps, print checklist
- [x] `composer.json` — added `php-stubs/wordpress-stubs ^6.5` + `szepeviktor/phpstan-wordpress ^0.7`; bumped PHP require to `>=8.0`
- [x] `phpstan.neon` — added `szepeviktor/phpstan-wordpress` extension include + `phpstan-baseline.neon` include
- [x] `phpstan-baseline.neon` — empty baseline (add suppressed errors here rather than inline ignoreErrors)
- [x] WPCS config (`phpcs.xml`) — already complete; patterns/ correctly excluded
- [x] Run `composer run phpcs` locally and fix any remaining violations
- [x] Run `composer run phpstan` locally and fix or baseline any errors
- [x] Run `composer run phpunit` locally — 86 tests, 155 assertions, all green
- [x] Run `npm run test:e2e` against a live wp-env instance — 22/22 passing
- [x] Run WordPress Plugin Check and fix any flagged errors
- [ ] Submit to WordPress.org SVN

---

---

## Visual Design Pass (post-Step 19)

### Tasks 1–4 — Audit + Design Spec ✅

- [x] Task 1 — GoBlocks visual design audit (all admin + inspector components catalogued)
- [x] Task 2 — GenerateBlocks competitive reference (settings/inspector/dashboard SCSS read)
- [x] Task 3 — Design gap report (token adoption, settings stub, inspector unstyled)
- [x] Task 4 — `.claude/DESIGN-SYSTEM.md` written ("Precision Studio" identity, 11 component specs)

### Tasks 5–6 — Implementation ✅

- [x] Task 5a — `assets/css/admin.css` rewritten (§6.1–6.5: shell, nav tabs, card, field, notice)
- [x] Task 5b — `assets/css/patterns.css` created (§6.10: pattern grid cards, tags, states)
- [x] Task 5c — `assets/css/global-styles.css` created (§6.11: header, scoped tab overrides, palette/typography rows)
- [x] Task 5d — `src/settings/index.tsx` replaced placeholder with real settings UI (layout, performance, editor, breakpoints cards + sticky save bar)
- [x] Task 6a — `assets/css/inspector.css` created (§6.6 dark tab frame, §6.7 breakpoint tabs, §6.8 unit input, §6.9 toggle group)
- [x] PHP enqueue — tokens + admin CSS wired to Settings, GlobalStyles, PatternLibrary pages; inspector.css wired to block editor
- [x] `src/settings.ts` — import wired to new `./settings/index` component
- [x] `goblocks.php` — `$class` → `$fqcn` (phpcs reserved keyword fix)

### Task 7 — Verification ✅

- [x] `npx tsc --project tsconfig.json --noEmit` — 0 errors
- [x] `npx tsc --project tsconfig.e2e.json --noEmit` — 0 errors
- [x] `composer run phpcs` — CLEAN (0 errors, 0 warnings)
- [x] `phpstan analyse --memory-limit=1G` — OK, no errors
- [x] `npx playwright test` — 22/22 pass

### Task 8 — Documentation

- [x] `.claude/DESIGN-SYSTEM.md` — canonical design reference (written in Task 4)
- [x] `.claude/PROGRESS.md` — updated (this entry)

---

*Last updated: 2026-06-16 — Visual Design Pass complete. All 22 E2E tests pass. phpcs/phpstan clean. Settings page live, all admin pages styled, inspector CSS wired.*
