<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostId extends TagBase {
	public function get_slug(): string {
		return 'post_id'; }
	public function get_label(): string {
		return __( 'Post ID', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'The numeric ID of the current post.', 'goblocks' ); }
	public function get_options(): array {
		return array(); }
	public function get_contexts(): array {
		return array( 'any' ); }
	public function get_escape_type(): string {
		return 'html'; }

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		return $post ? (string) $post->ID : '';
	}
}
