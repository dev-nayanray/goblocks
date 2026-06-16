<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostStatus extends TagBase {
	public function get_slug(): string {
		return 'post_status'; }
	public function get_label(): string {
		return __( 'Post Status', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'The status of the current post (publish, draft, etc.).', 'goblocks' ); }
	public function get_options(): array {
		return array(); }
	public function get_contexts(): array {
		return array( 'any' ); }
	public function get_escape_type(): string {
		return 'html'; }

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		return $post ? (string) $post->post_status : '';
	}
}
