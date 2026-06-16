<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class TermCount extends TagBase {
	public function get_slug(): string {
		return 'term_count'; }
	public function get_label(): string {
		return __( 'Term Count', 'goblocks' ); }
	public function get_category(): string {
		return 'term'; }
	public function get_description(): string {
		return __( 'Number of terms from a taxonomy assigned to the post.', 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
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
		);
	}

	public function resolve( array $context, array $options ): string {
		$tax_opt  = $this->opt( 'taxonomy', $options );
		$taxonomy = sanitize_key( $tax_opt ? $tax_opt : 'category' );
		return (string) count( $this->get_terms_for_post( $context, $taxonomy ) );
	}
}
