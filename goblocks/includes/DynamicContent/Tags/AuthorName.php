<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class AuthorName extends TagBase {
	public function get_slug(): string {
		return 'author_name'; }
	public function get_label(): string {
		return __( 'Author Name', 'goblocks' ); }
	public function get_category(): string {
		return 'author'; }
	public function get_description(): string {
		return __( 'The display name of the post author.', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'format',
				'type'        => 'string',
				'default'     => 'display',
				'description' => __( 'Name format: display (default), first, last, login.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$user = $this->get_author( $context );
		if ( ! $user ) {
			return '';
		}

		return match ( $this->opt( 'format', $options ) ) {
			'first'   => $user->first_name,
			'last'    => $user->last_name,
			'login'   => $user->user_login,
			default   => $user->display_name,
		};
	}
}
