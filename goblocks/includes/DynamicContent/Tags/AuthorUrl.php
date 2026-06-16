<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class AuthorUrl extends TagBase {
	public function get_slug(): string {
		return 'author_url'; }
	public function get_label(): string {
		return __( 'Author URL', 'goblocks' ); }
	public function get_category(): string {
		return 'author'; }
	public function get_description(): string {
		return __( 'The archive URL for the post author.', 'goblocks' ); }
	public function get_options(): array {
		return array(); }
	public function get_contexts(): array {
		return array( 'any' ); }
	public function get_escape_type(): string {
		return 'url'; }

	public function resolve( array $context, array $options ): string {
		$user = $this->get_author( $context );
		return $user ? (string) get_author_posts_url( $user->ID ) : '';
	}
}
