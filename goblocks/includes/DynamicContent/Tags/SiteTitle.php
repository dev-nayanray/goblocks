<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class SiteTitle extends TagBase {
	public function get_slug(): string {
		return 'site_title'; }
	public function get_label(): string {
		return __( 'Site Title', 'goblocks' ); }
	public function get_category(): string {
		return 'site'; }
	public function get_description(): string {
		return __( 'The site name from Settings → General.', 'goblocks' ); }
	public function get_options(): array {
		return array(); }
	public function get_contexts(): array {
		return array( 'any' ); }
	public function get_escape_type(): string {
		return 'html'; }

	public function resolve( array $context, array $options ): string {
		return (string) get_bloginfo( 'name' );
	}
}
