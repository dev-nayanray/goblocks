<?php
namespace GoBlocks\Admin;

defined( 'ABSPATH' ) || exit;

use GoBlocks\Utils\Singleton;
use GoBlocks\Settings\SettingsStore;

/**
 * Admin area controller.
 *
 * Registers the GoBlocks settings menu page and enqueues assets for it.
 * All methods that read from the screen or hook into admin actions are
 * guarded to run only in the WP admin.
 */
class Admin extends Singleton {

	/** Admin page hook suffix returned by add_menu_page(). */
	private string $page_hook = '';

	/**
	 * Register admin hooks.
	 *
	 * @return void
	 */
	public function register_hooks(): void {
		add_action( 'admin_menu', array( $this, 'add_menu_page' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Register the GoBlocks top-level admin menu page.
	 *
	 * @return void
	 */
	public function add_menu_page(): void {
		$this->page_hook = add_menu_page(
			__( 'GoBlocks Settings', 'goblocks' ),
			__( 'GoBlocks', 'goblocks' ),
			'manage_options',
			'goblocks-settings',
			array( $this, 'render_settings_page' ),
			'dashicons-block-default',
			80
		);
	}

	/**
	 * Enqueue settings page JS/CSS only on the GoBlocks admin page.
	 *
	 * @param string $hook_suffix The current admin page hook suffix.
	 * @return void
	 */
	public function enqueue_assets( string $hook_suffix ): void {
		if ( $hook_suffix !== $this->page_hook ) {
			return;
		}

		$asset_file = GOBLOCKS_BUILD_DIR . 'settings.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			'goblocks-settings',
			GOBLOCKS_BUILD_URL . 'settings.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_style(
			'goblocks-tokens',
			GOBLOCKS_URL . 'assets/css/tokens.css',
			array(),
			GOBLOCKS_VERSION
		);

		wp_enqueue_style(
			'goblocks-admin',
			GOBLOCKS_URL . 'assets/css/admin.css',
			array( 'goblocks-tokens' ),
			GOBLOCKS_VERSION
		);

		wp_enqueue_style(
			'goblocks-settings-style',
			GOBLOCKS_BUILD_URL . 'settings.css',
			array( 'goblocks-admin' ),
			$asset['version']
		);

		wp_set_script_translations(
			'goblocks-settings',
			'goblocks',
			GOBLOCKS_DIR . 'languages'
		);

		// Localise settings page data.
		wp_localize_script(
			'goblocks-settings',
			'goblocksSettings',
			$this->get_settings_data()
		);
	}

	/**
	 * Render the settings page HTML shell.
	 * The React SPA mounts into #goblocks-settings-root.
	 *
	 * @return void
	 */
	public function render_settings_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You do not have permission to access this page.', 'goblocks' ) );
		}

		echo '<div id="goblocks-settings-root" class="gb-settings-root"></div>';
	}

	/**
	 * Build the data object localised to the settings page script.
	 *
	 * @return array<string, mixed>
	 */
	private function get_settings_data(): array {
		return array(
			'settings' => SettingsStore::all(),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'restUrl'  => rest_url(),
			'version'  => GOBLOCKS_VERSION,
			'adminUrl' => admin_url(),
		);
	}
}
