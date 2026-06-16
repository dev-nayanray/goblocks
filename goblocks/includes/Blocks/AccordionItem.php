<?php
namespace GoBlocks\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Accordion Item block — PHP render callback.
 *
 * Renders a native <details>/<summary> element.
 * When the parent Accordion has FAQ schema enabled, the item receives the
 * schema.org/Question markup via block context.
 */
class AccordionItem extends BlockBase {

	/**
	 * @return string
	 */
	public function get_name(): string {
		return 'accordion-item';
	}

	/**
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content    Inner blocks HTML (the answer).
	 * @param \WP_Block            $block      Block instance (context from Accordion).
	 * @return string HTML output.
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string {
		$unique_id      = $this->get_unique_id( $attributes );
		$block_class    = $this->get_block_class( $unique_id );
		$global_classes = $this->get_global_classes( $attributes );
		$question       = wp_strip_all_tags( (string) ( $attributes['question'] ?? '' ) );
		$is_open        = ! empty( $attributes['isOpen'] );
		$faq_schema     = ! empty( $block->context['goblocks/accordionFaqSchema'] );

		$classes = $this->build_class_string(
			$block_class,
			$global_classes,
			array( 'gb-accordion-item' )
		);

		// FAQ schema attribute fragments.
		$schema_item = $faq_schema
			? ' itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"'
			: '';
		$schema_name = $faq_schema ? ' itemprop="name"' : '';
		$schema_ans  = $faq_schema
			? ' itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"'
			: '';
		$schema_text = $faq_schema ? ' itemprop="text"' : '';

		return sprintf(
			'<details class="%s"%s%s>' .
				'<summary class="gb-accordion-item__trigger"%s>' .
					'<span class="gb-accordion-item__question">%s</span>' .
					'<span class="gb-accordion-item__icon" aria-hidden="true"></span>' .
				'</summary>' .
				'<div class="gb-accordion-item__content"%s>' .
					'<div%s>%s</div>' .
				'</div>' .
			'</details>',
			$classes,
			$is_open ? ' open' : '',
			$schema_item,
			$schema_name,
			esc_html( $question ),
			$schema_ans,
			$schema_text,
			$content
		);
	}
}

add_filter(
	'goblocks_block_classes',
	static function ( array $classes ): array {
		$classes[] = AccordionItem::class;
		return $classes;
	}
);
