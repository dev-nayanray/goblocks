<?php
namespace GoBlocks\REST;

defined( 'ABSPATH' ) || exit;

/**
 * REST controller for GoBlocks block patterns.
 *
 * Routes:
 *   GET /goblocks/v1/patterns         → list all registered GoBlocks patterns
 *   GET /goblocks/v1/patterns/{slug}  → get a single pattern by slug
 *
 * Requires edit_posts: pattern content may reveal draft/private post IDs.
 */
class PatternsController extends RestController {

	/**
	 * Register REST routes.
	 *
	 * @return void
	 */
	public function register_routes(): void {
		register_rest_route(
			$this->namespace,
			'/patterns',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_patterns' ),
				'permission_callback' => array( $this, 'require_edit_posts' ),
			)
		);

		register_rest_route(
			$this->namespace,
			'/patterns/(?P<slug>[a-z0-9_-]+)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_pattern' ),
				'permission_callback' => array( $this, 'require_edit_posts' ),
				'args'                => array(
					'slug' => array(
						'type'              => 'string',
						'required'          => true,
						'sanitize_callback' => 'sanitize_title',
					),
				),
			)
		);
	}

	/**
	 * GET /goblocks/v1/patterns
	 *
	 * Returns all patterns registered by GoBlocks (category = 'goblocks').
	 *
	 * @return \WP_REST_Response
	 */
	public function get_patterns(): \WP_REST_Response {
		$registry = \WP_Block_Patterns_Registry::get_instance();
		$all      = $registry->get_all_registered();
		$result   = array();

		foreach ( $all as $pattern ) {
			if ( ! $this->is_goblocks_pattern( $pattern ) ) {
				continue;
			}

			$result[] = $this->format_pattern( $pattern );
		}

		return $this->success( $result );
	}

	/**
	 * GET /goblocks/v1/patterns/{slug}
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_pattern( \WP_REST_Request $request ) {
		$slug     = sanitize_title( (string) $request->get_param( 'slug' ) );
		$registry = \WP_Block_Patterns_Registry::get_instance();

		$pattern = $registry->get_registered( $slug );

		if ( ! $pattern || ! $this->is_goblocks_pattern( $pattern ) ) {
			return $this->error(
				'goblocks_pattern_not_found',
				__( 'Pattern not found.', 'goblocks' ),
				404
			);
		}

		return $this->success( $this->format_pattern( $pattern, true ) );
	}

	/**
	 * Check whether a pattern belongs to the GoBlocks category.
	 *
	 * @param  array<string, mixed> $pattern Pattern data.
	 * @return bool
	 */
	private function is_goblocks_pattern( array $pattern ): bool {
		$categories = $pattern['categories'] ?? array();
		return in_array( 'goblocks', (array) $categories, true );
	}

	/**
	 * Format a pattern for the REST response.
	 *
	 * @param  array<string, mixed> $pattern     Raw pattern data.
	 * @param  bool                 $with_content Whether to include the block content.
	 * @return array<string, mixed>
	 */
	private function format_pattern( array $pattern, bool $with_content = false ): array {
		$output = array(
			'slug'          => $pattern['name'] ?? '',
			'title'         => $pattern['title'] ?? '',
			'description'   => $pattern['description'] ?? '',
			'categories'    => $pattern['categories'] ?? array(),
			'keywords'      => $pattern['keywords'] ?? array(),
			'viewportWidth' => $pattern['viewportWidth'] ?? null,
		);

		if ( $with_content ) {
			$output['content'] = $pattern['content'] ?? '';
		}

		return $output;
	}
}
