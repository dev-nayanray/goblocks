<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class AuthorMeta extends TagBase {
	private const ALLOWED_KEYS = array( 'description', 'url', 'user_email', 'user_url' );

	public function get_slug(): string {
		return 'author_meta'; }
	public function get_label(): string {
		return __( 'Author Meta', 'goblocks' ); }
	public function get_category(): string {
		return 'author'; }
	public function get_description(): string {
		return __( 'A public meta field from the post author (bio, website, etc.).', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'key',
				'type'        => 'string',
				'default'     => 'description',
				'description' => __( 'User field: description, url, user_email, user_url.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$user = $this->get_author( $context );
		if ( ! $user ) {
			return '';
		}

		$key_opt = $this->opt( 'key', $options );
		$key     = sanitize_key( $key_opt ? $key_opt : 'description' );

		// Only expose public fields.
		if ( ! in_array( $key, self::ALLOWED_KEYS, true ) ) {
			return '';
		}

		return (string) ( $user->$key ?? '' );
	}
}
