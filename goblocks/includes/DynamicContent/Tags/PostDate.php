<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostDate extends TagBase {
	public function get_slug(): string {
		return 'post_date'; }
	public function get_label(): string {
		return __( 'Post Date', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'The publication date of the post.', 'goblocks' ); }
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
				'description' => __( 'PHP date format (blank = site default).', 'goblocks' ),
			),
			array(
				'key'         => 'gmt',
				'type'        => 'bool',
				'default'     => 'false',
				'description' => __( 'Use GMT date.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		if ( ! $post ) {
			return '';
		}

		$format    = $this->opt( 'format', $options );
		$use_gmt   = in_array( $this->opt( 'gmt', $options ), array( '1', 'true', 'yes' ), true );
		$timestamp = $use_gmt
			? strtotime( $post->post_date_gmt . ' UTC' )
			: strtotime( $post->post_date );

		return $this->format_date( $format, (int) $timestamp );
	}
}
