<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class PostTitle extends TagBase {
	public function get_slug(): string {
		return 'post_title'; }
	public function get_label(): string {
		return __( 'Post Title', 'goblocks' ); }
	public function get_category(): string {
		return 'post'; }
	public function get_description(): string {
		return __( 'The title of the current post or page.', 'goblocks' ); }
	public function get_options(): array {
		return array(); }
	public function get_contexts(): array {
		return array( 'any' ); }
	public function get_escape_type(): string {
		return 'html'; }

	public function resolve( array $context, array $options ): string {
		$post = $this->get_post( $context );
		return $post ? (string) get_the_title( $post ) : '';
	}
}
