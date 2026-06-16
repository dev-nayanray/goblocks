<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostModified extends TagBase {
	public function get_slug(): string {
		return 'post_modified'; }
	public function get_label(): string {
		return __( 'Post Modified Date', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'The last-modified date of the post.', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'format',
				'type'        => 'string',
				'default'     => '',
				'description' => __( 'PHP date format.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		if ( ! $post ) {
			return '';
		}

		$format    = $this->opt( 'format', $options );
		$timestamp = strtotime( $post->post_modified );

		return $this->format_date( $format, (int) $timestamp );
	}
}
