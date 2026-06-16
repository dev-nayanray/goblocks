<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class AuthorAvatar extends TagBase {
	public function get_slug(): string {
		return 'author_avatar'; }
	public function get_label(): string {
		return __( 'Author Avatar URL', 'goblocks' ); }
	public function get_category(): string {
		return 'author'; }
	public function get_description(): string {
		return __( 'The Gravatar URL for the post author.', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'url'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'size',
				'type'        => 'int',
				'default'     => 96,
				'description' => __( 'Avatar size in pixels.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$user = $this->get_author( $context );
		if ( ! $user ) {
			return '';
		}

		$size_opt = $this->opt( 'size', $options );
		$size     = absint( $size_opt ? $size_opt : 96 );
		$url      = get_avatar_url( $user->ID, array( 'size' => $size ) );
		return $url ? $url : '';
	}
}
