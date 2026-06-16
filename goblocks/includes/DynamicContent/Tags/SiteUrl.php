<?php
namespace GoBlocks\DynamicContent\Tags;

defined( 'ABSPATH' ) || exit;

use GoBlocks\DynamicContent\TagBase;

class SiteUrl extends TagBase {
	public function get_slug(): string {
		return 'site_url'; }
	public function get_label(): string {
		return __( 'Site URL', 'goblocks' ); }
	public function get_category(): string {
		return 'site'; }
	public function get_description(): string {
		return __( 'The base URL of the site.', 'goblocks' ); }
	public function get_options(): array {
		return array(); }
	public function get_contexts(): array {
		return array( 'any' ); }
	public function get_escape_type(): string {
		return 'url'; }

	public function resolve( array $context, array $options ): string {
		return (string) home_url( '/' );
	}
}
