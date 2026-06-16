<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class TermUrl extends TagBase {
	public function get_slug(): string {
		return 'term_url'; }
	public function get_label(): string {
		return __( 'Term URL', 'goblocks' ); }
	public function get_category(): string {
		return 'term'; }
	public function get_description(): string {
		return __( 'The archive URL of a taxonomy term assigned to the post.', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'url'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'taxonomy',
				'type'        => 'string',
				'default'     => 'category',
				'description' => __( 'Taxonomy slug.', 'goblocks' ),
			),
			array(
				'key'         => 'index',
				'type'        => 'int',
				'default'     => 0,
				'description' => __( 'Zero-based term index.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$tax_opt  = $this->opt( 'taxonomy', $options );
		$taxonomy = sanitize_key( $tax_opt ? $tax_opt : 'category' );
		$terms    = $this->get_terms_for_post( $context, $taxonomy );
		$index    = absint( $this->opt( 'index', $options ) );

		if ( ! isset( $terms[ $index ] ) ) {
			return '';
		}

		$url = get_term_link( $terms[ $index ] );
		return ( $url && ! is_wp_error( $url ) ) ? (string) $url : '';
	}
}
