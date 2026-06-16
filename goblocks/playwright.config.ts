import path from 'path';
import { defineConfig, devices } from '@playwright/test';

// Tell the @wordpress/e2e-test-utils-playwright package which site to use.
// Its internal WP_BASE_URL env var defaults to 8889 (test site); we target 8888 (dev site).
process.env.WP_BASE_URL ??= 'http://localhost:8888';

const WP_BASE_URL = process.env.WP_BASE_URL;
const STORAGE_STATE_PATH =
	process.env.STORAGE_STATE_PATH ||
	path.join( process.cwd(), 'artifacts/storage-states/admin.json' );

export default defineConfig( {
	testDir: './tests/e2e',
	timeout: 60_000,
	expect: { timeout: 10_000 },
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: process.env.CI ? 'dot' : 'list',

	globalSetup: './tests/e2e/global-setup.ts',

	use: {
		baseURL:           WP_BASE_URL,
		storageState:      STORAGE_STATE_PATH,
		trace:             'retain-on-failure',
		screenshot:        'only-on-failure',
		actionTimeout:     10_000,
		navigationTimeout: 30_000,
	},

	projects: [
		{
			name: 'chromium',
			use: {
				...devices[ 'Desktop Chrome' ],
				viewport: { width: 1280, height: 900 },
			},
		},
	],
} );
