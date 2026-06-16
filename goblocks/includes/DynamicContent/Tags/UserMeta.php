<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

/**
 * Exposes a single user meta field for the currently logged-in user.
 * TagSecurity enforces is_user_logged_in() before resolve() is called.
 */
class UserMeta extends TagBase {
	/** Public user meta keys that are safe to expose. */
	private const ALLOWED_KEYS = array(
		'nickname',
		'first_name',
		'last_name',
		'description',
		'billing_first_name',
		'billing_last_name',
		'billing_city',
		'billing_country',
	);

	public function get_slug(): string {
		return 'user_meta'; }
	public function get_label(): string {
		return __( 'Current User Meta', 'goblocks' ); }
	public function get_category(): string {
		return 'user'; }
	public function get_description(): string {
		return __( 'A meta field for the currently logged-in user.', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'key',
				'type'        => 'string',
				'default'     => 'first_name',
				'description' => __( 'User meta key.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		// TagSecurity already confirmed is_user_logged_in(); belt-and-braces.
		if ( ! is_user_logged_in() ) {
			return '';
		}

		$key = sanitize_key( $this->opt( 'key', $options ) );

		if ( ! in_array( $key, self::ALLOWED_KEYS, true ) ) {
			return '';
		}

		$user_id = get_current_user_id();
		return (string) get_user_meta( $user_id, $key, true );
	}
}
