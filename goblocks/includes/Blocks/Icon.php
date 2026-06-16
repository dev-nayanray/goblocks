<?php
namespace GoBlocks\Blocks;

defined( 'ABSPATH' ) || exit;

use GoBlocks\Utils\SvgSanitizer;

/**
 * Icon block — PHP render callback.
 *
 * Sanitizes the stored SVG via SvgSanitizer before output.
 * All colour / size styling flows through the CSS engine.
 */
class Icon extends BlockBase {

	public function get_name(): string {
		return 'icon';
	}

	/**
	 * Render the Icon block.
	 *
	 * @param  array<string, mixed> $attributes Block attributes.
	 * @param  string               $content    Inner blocks HTML (unused).
	 * @param  \WP_Block            $block      Block instance.
	 * @return string
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string {
		$svg_raw = (string) ( $attributes['svgContent'] ?? '' );

		if ( '' === trim( $svg_raw ) ) {
			return '';
		}

		$svg = SvgSanitizer::sanitize( $svg_raw );

		if ( '' === $svg ) {
			return '';
		}

		$unique_id      = $this->get_unique_id( $attributes );
		$block_class    = $unique_id ? $this->get_block_class( $unique_id ) : 'gb-icon';
		$global_classes = $this->get_global_classes( $attributes );
		$classes        = $this->build_class_string( $block_class, $global_classes, array( 'gb-icon' ) );

		$aria_hidden = (bool) ( $attributes['ariaHidden'] ?? true );
		$aria_label  = sanitize_text_field( (string) ( $attributes['ariaLabel'] ?? '' ) );
		$link        = (string) ( $attributes['link'] ?? '' );

		// Build icon span.
		$icon_attrs = '';
		if ( $aria_hidden ) {
			$icon_attrs .= ' aria-hidden="true"';
		} elseif ( $aria_label ) {
			$icon_attrs .= ' aria-label="' . esc_attr( $aria_label ) . '" role="img"';
		}

		$inner = '<span class="gb-icon__svg"' . $icon_attrs . '>' . $svg . '</span>';

		// Optionally wrap in a link.
		if ( $link ) {
			$target = sanitize_text_field( (string) ( $attributes['linkTarget'] ?? '_self' ) );
			if ( ! in_array( $target, array( '_self', '_blank' ), true ) ) {
				$target = '_self';
			}

			$rel = sanitize_text_field( (string) ( $attributes['linkRel'] ?? '' ) );
			if ( '_blank' === $target ) {
				$rel_parts = array_unique(
					array_filter( array_merge( array( 'noopener', 'noreferrer' ), explode( ' ', $rel ) ) )
				);
				$rel       = implode( ' ', $rel_parts );
			}

			$link_attrs = sprintf(
				' href="%s" target="%s"%s',
				esc_url( $link ),
				esc_attr( $target ),
				$rel ? ' rel="' . esc_attr( $rel ) . '"' : ''
			);

			if ( ! $aria_hidden && $aria_label ) {
				$link_attrs .= ' aria-label="' . esc_attr( $aria_label ) . '"';
			}

			$inner = '<a class="gb-icon__link"' . $link_attrs . '>' . $inner . '</a>';
		}

		return sprintf( '<div class="%s">%s</div>', $classes, $inner );
	}
}

add_filter(
	'goblocks_block_classes',
	static function ( array $classes ): array {
		$classes[] = Icon::class;
		return $classes;
	}
);
