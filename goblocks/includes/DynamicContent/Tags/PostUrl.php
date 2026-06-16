<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostUrl extends TagBase {
	public function get_slug(): string {
		return 'post_url'; }
	public function get_label(): string {
		return __( 'Post URL', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'The permalink of the current post.', 'goblocks' ); }
	public function get_options(): array {
		return array(); }
	public function get_contexts(): array {
		return array( 'any' ); }
	public function get_escape_type(): string {
		return 'url'; }

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		return $post ? (string) get_permalink( $post ) : '';
	}
}
