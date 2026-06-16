<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class TermName extends TagBase {
	public function get_slug(): string {
		return 'term_name'; }
	public function get_label(): string {
		return __( 'Term Name', 'goblocks' ); }
	public function get_category(): string {
		return 'term'; }
	public function get_description(): string {
		return __( 'The name of a taxonomy term assigned to the post.', 'goblocks' ); }
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
			array(
				'key'         => 'index',
				'type'        => 'int',
				'default'     => 0,
				'description' => __( 'Zero-based term index.', 'goblocks' ),
			),
			array(
				'key'         => 'separator',
				'type'        => 'string',
				'default'     => '',
				'description' => __( 'Join separator (empty = single term by index).', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$tax_opt  = $this->opt( 'taxonomy', $options );
		$taxonomy = sanitize_key( $tax_opt ? $tax_opt : 'category' );
		$terms    = $this->get_terms_for_post( $context, $taxonomy );
		if ( empty( $terms ) ) {
			return '';
		}

		$separator = $this->opt( 'separator', $options );

		if ( '' !== $separator ) {
			return implode( $separator, array_map( static fn( $t ) => $t->name, $terms ) );
		}

		$index = absint( $this->opt( 'index', $options ) );
		return isset( $terms[ $index ] ) ? $terms[ $index ]->name : '';
	}
}
