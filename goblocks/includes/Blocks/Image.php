<?php
namespace GoBlocks\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Image block — PHP render callback.
 *
 * Structure: <figure class="gb-image ..."><(?a>)<img>(</?a>)(<figcaption>)</figure>
 *
 * When mediaId is set, delegates to wp_get_attachment_image() for automatic
 * srcset, sizes, loading=lazy, and decoding=async attributes.
 * External URLs (mediaId = 0, mediaUrl set) fall back to a plain <img>.
 */
class Image extends BlockBase {

	/**
	 * Allowed kses tags for figcaption.
	 *
	 * @var array<string, array<string, bool>>
	 */
	private const CAPTION_KSES = array(
		'strong' => array(),
		'em'     => array(),
		'span'   => array(),
		'a'      => array(
			'href'   => true,
			'target' => true,
			'rel'    => true,
		),
		'br'     => array(),
	);

	/**
	 * Block slug (without namespace prefix).
	 *
	 * @return string
	 */
	public function get_name(): string {
		return 'image';
	}

	/**
	 * Render the Image block.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content    Inner blocks HTML (unused).
	 * @param \WP_Block            $block      Block instance.
	 * @return string Rendered HTML.
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string {
		$unique_id = $this->get_unique_id( $attributes );

		if ( ! $unique_id ) {
			return '';
		}

		$media_id  = (int) ( $attributes['mediaId'] ?? 0 );
		$media_url = sanitize_url( (string) ( $attributes['mediaUrl'] ?? '' ) );

		if ( ! $media_id && ! $media_url ) {
			return '';
		}

		$block_class    = $this->get_block_class( $unique_id );   // gb-image-{uniqueId}
		$global_classes = $this->get_global_classes( $attributes );
		$classes        = $this->build_class_string( $block_class, $global_classes, array( 'gb-image' ) );
		$html_attrs     = $this->build_html_attrs( $this->get_html_attributes( $attributes ) );

		// Build the <img> element.
		$img_html = $this->build_img( $media_id, $media_url, $attributes );

		// Optional link wrapping: <a href="..."><img></a>
		$href = esc_url( (string) ( $attributes['href'] ?? '' ) );
		if ( $href ) {
			$img_html = $this->wrap_with_link( $img_html, $href, $attributes );
		}

		// Optional figcaption.
		if ( ! empty( $attributes['showCaption'] ) && true === $attributes['showCaption'] ) {
			$caption_text = wp_kses( (string) ( $attributes['caption'] ?? '' ), self::CAPTION_KSES );
			if ( $caption_text ) {
				$img_html .= '<figcaption class="gb-image__caption">' . $caption_text . '</figcaption>';
			}
		}

		return sprintf(
			'<figure class="%1$s"%2$s>%3$s</figure>',
			$classes,
			$html_attrs,
			$img_html
		);
	}

	/**
	 * Build the <img> element.
	 *
	 * Uses wp_get_attachment_image() for library images (handles srcset, loading,
	 * decoding automatically). Falls back to a plain <img> for external URLs.
	 *
	 * @param int                  $media_id  Attachment ID (0 for external URL).
	 * @param string               $media_url Fallback URL (empty when mediaId is set).
	 * @param array<string, mixed> $attributes Block attributes.
	 * @return string
	 */
	private function build_img( int $media_id, string $media_url, array $attributes ): string {
		$alt    = sanitize_text_field( (string) ( $attributes['mediaAlt'] ?? '' ) );
		$size   = sanitize_key( (string) ( $attributes['sizeSlug'] ?? 'large' ) );
		$width  = (int) ( $attributes['mediaWidth'] ?? 0 );
		$height = (int) ( $attributes['mediaHeight'] ?? 0 );

		if ( $media_id > 0 ) {
			$img_attrs = array( 'class' => 'gb-image__img' );

			// Only override alt if explicitly set in block attributes.
			if ( '' !== $alt ) {
				$img_attrs['alt'] = $alt;
			}

			return wp_get_attachment_image( $media_id, $size, false, $img_attrs );
		}

		// External URL fallback.
		$src_attr    = ' src="' . esc_url( $media_url ) . '"';
		$alt_attr    = ' alt="' . esc_attr( $alt ) . '"';
		$width_attr  = $width > 0 ? ' width="' . $width . '"' : '';
		$height_attr = $height > 0 ? ' height="' . $height . '"' : '';

		return '<img class="gb-image__img" loading="lazy" decoding="async"'
			. $src_attr . $alt_attr . $width_attr . $height_attr . '>';
	}

	/**
	 * Wrap image HTML in an <a> link element.
	 *
	 * @param string               $img_html  Already-built <img> HTML.
	 * @param string               $href      Already-escaped URL.
	 * @param array<string, mixed> $attributes Block attributes.
	 * @return string
	 */
	private function wrap_with_link( string $img_html, string $href, array $attributes ): string {
		$target = (string) ( $attributes['target'] ?? '_self' );

		if ( ! in_array( $target, array( '_self', '_blank' ), true ) ) {
			$target = '_self';
		}

		$rel = sanitize_text_field( (string) ( $attributes['rel'] ?? '' ) );

		if ( '_blank' === $target ) {
			$rel_parts = array_unique(
				array_filter(
					array_merge( array( 'noopener', 'noreferrer' ), explode( ' ', $rel ) )
				)
			);
			$rel       = implode( ' ', $rel_parts );
		}

		$link_attrs  = ' href="' . $href . '"';
		$link_attrs .= ' target="' . esc_attr( $target ) . '"';

		if ( $rel ) {
			$link_attrs .= ' rel="' . esc_attr( $rel ) . '"';
		}

		return '<a' . $link_attrs . '>' . $img_html . '</a>';
	}
}

// Self-register into the block class list.
add_filter(
	'goblocks_block_classes',
	static function ( array $classes ): array {
		$classes[] = Image::class;
		return $classes;
	}
);
