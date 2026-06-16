<?php
namespace GoBlocks\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Tab Panel block — PHP render callback.
 *
 * Renders a single ARIA tabpanel. The parent Tabs block injects the
 * context values (tabsId, tabIndex, tabActive) before calling render().
 * Active panel is shown; others have the `hidden` attribute so they are
 * display:none without JavaScript, and the view script toggles them.
 */
class TabPanel extends BlockBase {

	/**
	 * @return string
	 */
	public function get_name(): string {
		return 'tab-panel';
	}

	/**
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content    Inner blocks HTML.
	 * @param \WP_Block            $block      Block instance (context provided by Tabs).
	 * @return string HTML output.
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string {
		$tabs_id = sanitize_key( (string) ( $block->context['goblocks/tabsId'] ?? '' ) );
		$idx     = absint( $block->context['goblocks/tabIndex'] ?? 0 );
		$active  = ! empty( $block->context['goblocks/tabActive'] );

		$panel_id = 'panel-' . $tabs_id . '-' . $idx;
		$tab_id   = 'tab-' . $tabs_id . '-' . $idx;

		$classes = 'gb-tab-panel' . ( $active ? ' is-active' : '' );

		return sprintf(
			'<div role="tabpanel" id="%s" aria-labelledby="%s" class="%s"%s>%s</div>',
			esc_attr( $panel_id ),
			esc_attr( $tab_id ),
			esc_attr( $classes ),
			$active ? '' : ' hidden',
			$content
		);
	}
}

add_filter(
	'goblocks_block_classes',
	static function ( array $classes ): array {
		$classes[] = TabPanel::class;
		return $classes;
	}
);
