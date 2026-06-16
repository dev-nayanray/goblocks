<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

/**
 * Reads a URL query string parameter ($_GET), NOT $_SERVER.
 * Strongly sanitized — only alphanumeric/hyphen/underscore keys allowed.
 */
class QueryParam extends TagBase {
	public function get_slug(): string {
		return 'query_param'; }
	public function get_label(): string {
		return __( 'URL Query Param', 'goblocks' ); }
	public function get_category(): string {
		return 'query'; }
	public function get_description(): string {
		return __( 'A value from the URL query string (?key=value).', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'key',
				'type'        => 'string',
				'default'     => '',
				'description' => __( 'Query parameter name (required).', 'goblocks' ),
			),
			array(
				'key'         => 'fallback',
				'type'        => 'string',
				'default'     => '',
				'description' => __( 'Value when parameter is absent.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$key = $this->opt( 'key', $options );

		// Key must be safe: alphanumeric + underscore + hyphen only.
		if ( ! preg_match( '/^[a-zA-Z0-9_-]+$/', $key ) ) {
			return '';
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$raw = sanitize_text_field( wp_unslash( $_GET[ $key ] ?? '' ) );

		if ( '' === $raw ) {
			return $this->opt( 'fallback', $options );
		}

		return $raw;
	}
}
