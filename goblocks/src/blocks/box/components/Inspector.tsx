/**
 * Box block — Inspector Controls.
 *
 * Composes all style panels + advanced settings for the Box block.
 * Uses InspectorTabs to separate Styles / Advanced tabs.
 */

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorTabs } from '../../../components/ui/InspectorTabs';
import { LayoutPanel } from '../../../components/panels/LayoutPanel';
import { SizingPanel } from '../../../components/panels/SizingPanel';
import { SpacingPanel } from '../../../components/panels/SpacingPanel';
import { TypographyPanel } from '../../../components/panels/TypographyPanel';
import { BackgroundPanel } from '../../../components/panels/BackgroundPanel';
import { BorderPanel } from '../../../components/panels/BorderPanel';
import { EffectsPanel } from '../../../components/panels/EffectsPanel';
import { useResponsiveStyles } from '../../../hooks/useResponsiveStyles';
import type { BlockAttributes } from '../../../types/block';
import type { BlockStyles } from '../../../types/styles';

// ── Box-specific attribute extensions ─────────────────────────────────────

interface BoxAttributes extends BlockAttributes {
	link: string;
	linkTarget: string;
	linkRel: string;
	ariaLabel: string;
	animationClass: string;
}

interface BoxInspectorProps {
	attributes: BoxAttributes;
	setAttributes: ( attrs: Partial< BoxAttributes > ) => void;
}

// ── Tag name options ──────────────────────────────────────────────────────

const TAG_OPTIONS = [
	{ label: 'div', value: 'div' },
	{ label: 'section', value: 'section' },
	{ label: 'article', value: 'article' },
	{ label: 'aside', value: 'aside' },
	{ label: 'header', value: 'header' },
	{ label: 'footer', value: 'footer' },
	{ label: 'nav', value: 'nav' },
	{ label: 'main', value: 'main' },
	{ label: 'figure', value: 'figure' },
	{ label: 'ul', value: 'ul' },
	{ label: 'ol', value: 'ol' },
	{ label: 'a', value: 'a' },
	{ label: 'form', value: 'form' },
	{ label: 'span', value: 'span' },
];

const ANIMATION_OPTIONS = [
	{ label: __( 'None', 'goblocks' ), value: '' },
	{ label: __( 'Fade in', 'goblocks' ), value: 'gb-anim-fade-in' },
	{ label: __( 'Slide up', 'goblocks' ), value: 'gb-anim-slide-up' },
	{ label: __( 'Slide left', 'goblocks' ), value: 'gb-anim-slide-left' },
	{ label: __( 'Slide right', 'goblocks' ), value: 'gb-anim-slide-right' },
	{ label: __( 'Zoom in', 'goblocks' ), value: 'gb-anim-zoom-in' },
];

// ── Component ─────────────────────────────────────────────────────────────

export function BoxInspector( {
	attributes,
	setAttributes,
}: BoxInspectorProps ) {
	const {
		styles,
		tagName,
		link,
		linkTarget,
		linkRel,
		ariaLabel,
		animationClass,
		globalClasses,
	} = attributes;

	const responsive = useResponsiveStyles( styles as BlockStyles, ( patch ) =>
		setAttributes( { styles: patch.styles as BlockStyles } )
	);

	const isLink = 'a' === tagName;

	const stylesContent = (
		<>
			<LayoutPanel
				styles={ styles as BlockStyles }
				responsive={ responsive }
			/>
			<SizingPanel
				styles={ styles as BlockStyles }
				responsive={ responsive }
			/>
			<SpacingPanel
				styles={ styles as BlockStyles }
				responsive={ responsive }
			/>
			<TypographyPanel
				styles={ styles as BlockStyles }
				responsive={ responsive }
			/>
			<BackgroundPanel
				styles={ styles as BlockStyles }
				responsive={ responsive }
			/>
			<BorderPanel
				styles={ styles as BlockStyles }
				responsive={ responsive }
			/>
			<EffectsPanel
				styles={ styles as BlockStyles }
				responsive={ responsive }
			/>
		</>
	);

	const advancedContent = (
		<>
			{ /* Tag name */ }
			<PanelBody title={ __( 'HTML Element', 'goblocks' ) } initialOpen>
				<SelectControl
					label={ __( 'Tag name', 'goblocks' ) }
					value={ tagName }
					options={ TAG_OPTIONS }
					onChange={ ( value ) =>
						setAttributes( { tagName: value } )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>

				<TextControl
					label={ __( 'ARIA label', 'goblocks' ) }
					value={ ariaLabel }
					help={ __(
						"Overrides the element's accessible name.",
						'goblocks'
					) }
					onChange={ ( value ) =>
						setAttributes( { ariaLabel: value } )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
			</PanelBody>

			{ /* Link settings — only when tagName = a */ }
			{ isLink && (
				<PanelBody title={ __( 'Link', 'goblocks' ) } initialOpen>
					<TextControl
						label={ __( 'URL', 'goblocks' ) }
						value={ link }
						type="url"
						onChange={ ( value ) =>
							setAttributes( { link: value } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={ __( 'Target', 'goblocks' ) }
						value={ linkTarget }
						options={ [
							{
								label: __( 'Same tab', 'goblocks' ),
								value: '_self',
							},
							{
								label: __( 'New tab', 'goblocks' ),
								value: '_blank',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { linkTarget: value } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Rel attribute', 'goblocks' ) }
						value={ linkRel }
						help={ __(
							'noopener noreferrer added automatically for _blank.',
							'goblocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { linkRel: value } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			) }

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

			{ /* Entrance animation */ }
			<PanelBody
				title={ __( 'Animation', 'goblocks' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Entrance animation', 'goblocks' ) }
					value={ animationClass }
					options={ ANIMATION_OPTIONS }
					onChange={ ( value ) =>
						setAttributes( { animationClass: value } )
					}
					help={ __(
						'CSS-only animation applied via class. No JS required.',
						'goblocks'
					) }
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
