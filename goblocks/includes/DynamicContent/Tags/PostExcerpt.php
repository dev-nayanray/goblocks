<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostExcerpt extends TagBase {
	public function get_slug(): string {
		return 'post_excerpt'; }
	public function get_label(): string {
		return __( 'Post Excerpt', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'The post excerpt (auto-generated if not set).', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'length',
				'type'        => 'int',
				'default'     => 55,
				'description' => __( 'Word limit (0 = no limit).', 'goblocks' ),
			),
			array(
				'key'         => 'more',
				'type'        => 'string',
				'default'     => '…',
				'description' => __( 'Trailing "more" text.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		if ( ! $post ) {
			return '';
		}

		$length = absint( $this->opt( 'length', $options ) );
		$more   = $this->opt( 'more', $options );

		// Use explicit excerpt if set, otherwise generate from content.
		$trim_length = $length ? $length : 55;
		$text        = $post->post_excerpt ? $post->post_excerpt : wp_trim_words( strip_shortcodes( $post->post_content ), $trim_length, $more );

		if ( $length > 0 && ! $post->post_excerpt ) {
			return $text; // wp_trim_words already handled length
		}

		if ( $length > 0 && $post->post_excerpt ) {
			return wp_trim_words( $text, $length, $more );
		}

		return $text;
	}
}
