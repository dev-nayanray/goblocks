import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorTabs } from '../../../components/ui/InspectorTabs';
import { SizingPanel } from '../../../components/panels/SizingPanel';
import { SpacingPanel } from '../../../components/panels/SpacingPanel';
import { BorderPanel } from '../../../components/panels/BorderPanel';
import { EffectsPanel } from '../../../components/panels/EffectsPanel';
import { useResponsiveStyles } from '../../../hooks/useResponsiveStyles';
import type { BlockStyles } from '../../../types/styles';

// ── Types ─────────────────────────────────────────────────────────────────

interface ImageAttributes {
	mediaAlt: string;
	sizeSlug: string;
	caption: string;
	showCaption: boolean;
	href: string;
	target: string;
	rel: string;
	styles: BlockStyles;
	globalClasses: string[];
}

interface ImageInspectorProps {
	attributes: ImageAttributes;
	setAttributes: ( attrs: Partial< ImageAttributes > ) => void;
}

// ── Option lists ──────────────────────────────────────────────────────────

const SIZE_OPTIONS = [
	{ label: __( 'Thumbnail', 'goblocks' ), value: 'thumbnail' },
	{ label: __( 'Medium', 'goblocks' ), value: 'medium' },
	{ label: __( 'Large', 'goblocks' ), value: 'large' },
	{ label: __( 'Full size', 'goblocks' ), value: 'full' },
];

const TARGET_OPTIONS = [
	{ label: __( 'Same tab', 'goblocks' ), value: '_self' },
	{ label: __( 'New tab', 'goblocks' ), value: '_blank' },
];

// ── Component ─────────────────────────────────────────────────────────────

export function ImageInspector( {
	attributes,
	setAttributes,
}: ImageInspectorProps ) {
	const {
		styles,
		mediaAlt,
		sizeSlug,
		caption,
		showCaption,
		href,
		target,
		rel,
		globalClasses,
	} = attributes;

	const responsive = useResponsiveStyles( styles, ( patch ) =>
		setAttributes( { styles: patch.styles as BlockStyles } )
	);

	const stylesContent = (
		<>
			<SizingPanel styles={ styles } responsive={ responsive } />
			<SpacingPanel styles={ styles } responsive={ responsive } />
			<BorderPanel styles={ styles } responsive={ responsive } />
			<EffectsPanel styles={ styles } responsive={ responsive } />
		</>
	);

	const advancedContent = (
		<>
			{ /* Image settings */ }
			<PanelBody title={ __( 'Image Settings', 'goblocks' ) } initialOpen>
				<TextControl
					label={ __( 'Alt text', 'goblocks' ) }
					value={ mediaAlt }
					help={ __(
						'Describes the image for screen readers and search engines.',
						'goblocks'
					) }
					onChange={ ( value ) =>
						setAttributes( { mediaAlt: value } )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
				<SelectControl
					label={ __( 'Image size', 'goblocks' ) }
					value={ sizeSlug }
					options={ SIZE_OPTIONS }
					onChange={ ( value ) =>
						setAttributes( { sizeSlug: value } )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
				<ToggleControl
					label={ __( 'Show caption', 'goblocks' ) }
					checked={ showCaption }
					onChange={ ( value ) =>
						setAttributes( { showCaption: value } )
					}
				/>
			</PanelBody>

			{ /* Link wrapping */ }
			<PanelBody title={ __( 'Link', 'goblocks' ) } initialOpen={ false }>
				<TextControl
					label={ __( 'URL', 'goblocks' ) }
					value={ href }
					type="url"
					help={ __( 'Wraps the image in a link.', 'goblocks' ) }
					onChange={ ( value ) => setAttributes( { href: value } ) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
				{ href && (
					<>
						<SelectControl
							label={ __( 'Open in', 'goblocks' ) }
							value={ target }
							options={ TARGET_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { target: value } )
							}
							// @ts-ignore
							__nextHasNoMarginBottom
						/>
						{ '_blank' === target && (
							<TextControl
								label={ __( 'Rel attribute', 'goblocks' ) }
								value={ rel }
								help={ __(
									'noopener noreferrer added automatically for new tab.',
									'goblocks'
								) }
								onChange={ ( value ) =>
									setAttributes( { rel: value } )
								}
								// @ts-ignore
								__nextHasNoMarginBottom
							/>
						) }
					</>
				) }
			</PanelBody>

			{ /* CSS classes */ }
			<PanelBody
				title={ __( 'CSS Classes', 'goblocks' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'Additional CSS classes', 'goblocks' ) }
					value={ ( globalClasses ?? [] ).join( ' ' ) }
					help={ __(
						'Space-separated list of extra classes.',
						'goblocks'
					) }
					onChange={ ( value ) =>
						setAttributes( {
							globalClasses: value
								.split( /\s+/ )
								.filter( Boolean ),
						} )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
			</PanelBody>
		</>
	);

	return (
		<InspectorControls>
			<InspectorTabs
				stylesContent={ stylesContent }
				advancedContent={ advancedContent }
			/>
		</InspectorControls>
	);
}
