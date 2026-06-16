<?php
namespace GoBlocks\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Grid block — PHP render callback.
 *
 * Renders a CSS grid container around inner block content.
 * All grid properties (display, gridTemplateColumns, gap, etc.) live in
 * `attributes.generatedCss`, produced by the TypeScript CssEngine.
 */
class Grid extends BlockBase {

	/**
	 * Block slug (without namespace prefix).
	 *
	 * @return string
	 */
	public function get_name(): string {
		return 'grid';
	}

	/**
	 * Render the Grid block.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content    Inner blocks HTML.
	 * @param \WP_Block            $block      Block instance.
	 * @return string Rendered HTML.
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string {
		$unique_id = $this->get_unique_id( $attributes );

		if ( ! $unique_id ) {
			return $content;
		}

		$tag_name       = $this->get_tag_name( $attributes, 'div' );
		$block_class    = $this->get_block_class( $unique_id );   // gb-grid-{uniqueId}
		$global_classes = $this->get_global_classes( $attributes );
		$classes        = $this->build_class_string( $block_class, $global_classes, array( 'gb-grid' ) );
		$html_attrs     = $this->build_html_attrs( $this->get_html_attributes( $attributes ) );

		return sprintf(
			'<%1$s class="%2$s"%3$s>%4$s</%1$s>',
			esc_attr( $tag_name ),
			$classes,
			$html_attrs,
			$content
		);
	}
}

// Self-register into the block class list.
add_filter(
	'goblocks_block_classes',
	static function ( array $classes ): array {
		$classes[] = Grid::class;
		return $classes;
	}
);
