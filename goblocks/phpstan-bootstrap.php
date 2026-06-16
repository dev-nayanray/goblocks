<?php
/**
 * PHPStan bootstrap file — declares plugin constants for static analysis.
 *
 * This file is ONLY loaded by PHPStan (via bootstrapFiles in phpstan.neon).
 * It is never included at runtime.
 */

defined( 'ABSPATH' ) || define( 'ABSPATH', __DIR__ . '/' );

// Plugin directory / URL constants defined in goblocks.php at runtime.
if ( ! defined( 'GOBLOCKS_VERSION' ) ) {
	define( 'GOBLOCKS_VERSION', '1.0.0' );
}
if ( ! defined( 'GOBLOCKS_DIR' ) ) {
	define( 'GOBLOCKS_DIR', __DIR__ . '/' );
}
if ( ! defined( 'GOBLOCKS_URL' ) ) {
	define( 'GOBLOCKS_URL', 'https://example.com/' );
}
if ( ! defined( 'GOBLOCKS_BUILD_DIR' ) ) {
	define( 'GOBLOCKS_BUILD_DIR', GOBLOCKS_DIR . 'build/' );
}
if ( ! defined( 'GOBLOCKS_BUILD_URL' ) ) {
	define( 'GOBLOCKS_BUILD_URL', GOBLOCKS_URL . 'build/' );
}
// WordPress filesystem constants not included in wordpress-stubs.
if ( ! defined( 'FS_CHMOD_FILE' ) ) {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
	define( 'FS_CHMOD_FILE', 0644 );
}
