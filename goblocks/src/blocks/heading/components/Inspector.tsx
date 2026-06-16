import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ExternalLink,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorTabs } from '../../../components/ui/InspectorTabs';
import { TypographyPanel } from '../../../components/panels/TypographyPanel';
import { SizingPanel } from '../../../components/panels/SizingPanel';
import { SpacingPanel } from '../../../components/panels/SpacingPanel';
import { BackgroundPanel } from '../../../components/panels/BackgroundPanel';
import { BorderPanel } from '../../../components/panels/BorderPanel';
import { EffectsPanel } from '../../../components/panels/EffectsPanel';
import { useResponsiveStyles } from '../../../hooks/useResponsiveStyles';
import type { BlockStyles } from '../../../types/styles';

// ── Types ─────────────────────────────────────────────────────────────────

interface HeadingAttributes {
	tagName: string;
	styles: BlockStyles;
	globalClasses: string[];
	anchor: string;
	link: string;
	linkTarget: string;
	linkRel: string;
}

interface HeadingInspectorProps {
	attributes: HeadingAttributes;
	setAttributes: ( attrs: Partial< HeadingAttributes > ) => void;
}

// ── Level options ─────────────────────────────────────────────────────────

const LEVEL_OPTIONS = [
	{ label: 'H1', value: 'h1' },
	{ label: 'H2', value: 'h2' },
	{ label: 'H3', value: 'h3' },
	{ label: 'H4', value: 'h4' },
	{ label: 'H5', value: 'h5' },
	{ label: 'H6', value: 'h6' },
];

const TARGET_OPTIONS = [
	{ label: __( 'Same tab', 'goblocks' ), value: '_self' },
	{ label: __( 'New tab', 'goblocks' ), value: '_blank' },
];

// ── Component ─────────────────────────────────────────────────────────────

export function HeadingInspector( {
	attributes,
	setAttributes,
}: HeadingInspectorProps ) {
	const {
		styles,
		tagName,
		anchor,
		link,
		linkTarget,
		linkRel,
		globalClasses,
	} = attributes;

	const responsive = useResponsiveStyles( styles, ( patch ) =>
		setAttributes( { styles: patch.styles as BlockStyles } )
	);

	const stylesContent = (
		<>
			<TypographyPanel styles={ styles } responsive={ responsive } />
			<SizingPanel styles={ styles } responsive={ responsive } />
			<SpacingPanel styles={ styles } responsive={ responsive } />
			<BackgroundPanel styles={ styles } responsive={ responsive } />
			<BorderPanel styles={ styles } responsive={ responsive } />
			<EffectsPanel styles={ styles } responsive={ responsive } />
		</>
	);

	const advancedContent = (
		<>
			{ /* Heading level */ }
			<PanelBody title={ __( 'Heading Level', 'goblocks' ) } initialOpen>
				<SelectControl
					label={ __( 'Level', 'goblocks' ) }
					value={ tagName }
					options={ LEVEL_OPTIONS }
					onChange={ ( value ) =>
						setAttributes( { tagName: value } )
					}
					help={ __(
						'Choose the semantic heading level.',
						'goblocks'
					) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
			</PanelBody>

			{ /* Anchor */ }
			<PanelBody
				title={ __( 'Anchor', 'goblocks' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'HTML anchor', 'goblocks' ) }
					value={ anchor }
					help={ __(
						'Auto-generated from heading text. Override to set a custom URL fragment (#anchor).',
						'goblocks'
					) }
					onChange={ ( value ) =>
						setAttributes( {
							anchor: value
								.toLowerCase()
								.replace( /[^a-z0-9-]/g, '-' )
								.replace( /-+/g, '-' )
								.replace( /^-|-$/g, '' ),
						} )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
				{ anchor && (
					<p
						style={ {
							marginTop: 8,
							fontSize: 12,
							color: '#757575',
						} }
					>
						{ __( 'Link to this heading: ', 'goblocks' ) }
						<code>#{ anchor }</code>
					</p>
				) }
			</PanelBody>

			{ /* Link wrapping */ }
			<PanelBody title={ __( 'Link', 'goblocks' ) } initialOpen={ false }>
				<TextControl
					label={ __( 'URL', 'goblocks' ) }
					value={ link }
					type="url"
					help={ __(
						'Wraps the heading text in an <a> tag.',
						'goblocks'
					) }
					onChange={ ( value ) => setAttributes( { link: value } ) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
				{ link && (
					<SelectControl
						label={ __( 'Open in', 'goblocks' ) }
						value={ linkTarget }
						options={ TARGET_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { linkTarget: value } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
				) }
				{ link && '_blank' === linkTarget && (
					<TextControl
						label={ __( 'Rel attribute', 'goblocks' ) }
						value={ linkRel }
						help={ __(
							'noopener noreferrer added automatically for new tab.',
							'goblocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { linkRel: value } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
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
