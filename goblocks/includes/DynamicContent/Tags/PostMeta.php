<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostMeta extends TagBase {
	public function get_slug(): string {
		return 'post_meta'; }
	public function get_label(): string {
		return __( 'Post Meta', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'A custom field value from the current post.', 'goblocks' ); }
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
				'description' => __( 'Meta key (required).', 'goblocks' ),
			),
			array(
				'key'         => 'fallback',
				'type'        => 'string',
				'default'     => '',
				'description' => __( 'Value to show when meta is empty.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		if ( ! $post ) {
			return '';
		}

		$key = sanitize_key( $this->opt( 'key', $options ) );
		if ( '' === $key ) {
			return '';
		}

		// Refuse to expose private (underscore-prefixed) meta to anonymous requests.
		if ( str_starts_with( $key, '_' ) && ! current_user_can( 'edit_post', $post->ID ) ) {
			return '';
		}

		$value = get_post_meta( $post->ID, $key, true );

		if ( is_array( $value ) || is_object( $value ) ) {
			return '';
		}

		$value = (string) $value;

		if ( '' === $value ) {
			return $this->opt( 'fallback', $options );
		}

		return $value;
	}
}
