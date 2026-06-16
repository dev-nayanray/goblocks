/**
 * GoBlocks Webpack Configuration
 *
 * Extends @wordpress/scripts default config.
 * Block entries are added here as each block is built (Step 6+).
 * Non-block entries (editor, settings, patterns, global-styles) are registered now.
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

/** @type {import('webpack').Configuration} */
module.exports = {
	...defaultConfig,

	entry: {
		// ── Non-block entries ───────────────────────────────────────────────
		// Editor bootstrap: addFilter calls, sidebar registration, store init
		editor: './src/editor.ts',

		// Admin settings page React SPA
		settings: './src/settings.ts',

		// Pattern library admin page React SPA
		patterns: './src/patterns.ts',

		// Global styles admin panel React SPA
		'global-styles': './src/global-styles.ts',

		// ── Block entries (added below as each block is scaffolded) ─────────
		// Uncomment each line when the corresponding block src files exist.
		//
		'blocks/box/index':            './src/blocks/box/index.ts',
		'blocks/text/index':           './src/blocks/text/index.ts',
		'blocks/text/style-index':     './src/blocks/text/style.css',
		'blocks/heading/index':        './src/blocks/heading/index.ts',
		'blocks/button/index':         './src/blocks/button/index.ts',
		'blocks/image/index':          './src/blocks/image/index.ts',
		'blocks/grid/index':           './src/blocks/grid/index.ts',
		'blocks/query/index':          './src/blocks/query/index.ts',
		'blocks/query-loop/index':        './src/blocks/query-loop/index.ts',
		'blocks/query-no-results/index':  './src/blocks/query-no-results/index.ts',
		'blocks/pagination/index':        './src/blocks/pagination/index.ts',
		'blocks/icon/index':           './src/blocks/icon/index.ts',
		'blocks/shape/index':          './src/blocks/shape/index.ts',
		'blocks/tabs/index':           './src/blocks/tabs/index.ts',
		'blocks/tabs/view':            './src/blocks/tabs/view.ts',
		'blocks/tab-panel/index':      './src/blocks/tab-panel/index.ts',
		'blocks/accordion/index':      './src/blocks/accordion/index.ts',
		'blocks/accordion/view':       './src/blocks/accordion/view.ts',
		'blocks/accordion-item/index': './src/blocks/accordion-item/index.ts',
	},

	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js',
		// Clean build directory on each build
		clean: true,
	},

	resolve: {
		...defaultConfig.resolve,
		alias: {
			...( defaultConfig.resolve?.alias ?? {} ),
			// Path aliases — must match tsconfig.json paths
			'@utils':      path.resolve( __dirname, 'src/utils' ),
			'@components': path.resolve( __dirname, 'src/components' ),
			'@hooks':      path.resolve( __dirname, 'src/hooks' ),
			'@store':      path.resolve( __dirname, 'src/store' ),
		},
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
	},

	plugins: [
		// Remove default RemoveEmptyScriptsPlugin instance and re-add ours
		...( defaultConfig.plugins ?? [] ).filter(
			( plugin ) => plugin.constructor.name !== 'RemoveEmptyScriptsPlugin'
		),
		new RemoveEmptyScriptsPlugin(),
	],

	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			...defaultConfig.optimization?.splitChunks,
			cacheGroups: {
				...defaultConfig.optimization?.splitChunks?.cacheGroups,
				// Disable automatic chunk naming to prevent conflicts when an entry
				// name (e.g. blocks/text/style-index) matches the cache group name.
				style: {
					...defaultConfig.optimization?.splitChunks?.cacheGroups?.style,
					name: false,
				},
			},
		},
	},

	// Produce source maps in development, none in production
	devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};
