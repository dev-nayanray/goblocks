<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class CurrentDate extends TagBase {
	public function get_slug(): string {
		return 'current_date'; }
	public function get_label(): string {
		return __( 'Current Date', 'goblocks' ); }
	public function get_category(): string {
		return 'date'; }
	public function get_description(): string {
		return __( "Today's date at render time.", 'goblocks' ); }
	public function get_escape_type(): string {
		return 'html'; }
	public function get_contexts(): array {
		return array( 'any' ); }

	public function get_options(): array {
		return array(
			array(
				'key'         => 'format',
				'type'        => 'string',
				'default'     => 'F j, Y',
				'description' => __( 'PHP date format.', 'goblocks' ),
			),
		);
	}

	public function resolve( array $context, array $options ): string {
		$format_opt = $this->opt( 'format', $options );
		$format     = $format_opt ? $format_opt : 'F j, Y';
		return $this->format_date( $format, time() );
	}
}
