import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
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

interface ButtonAttributes {
	tagName: string;
	styles: BlockStyles;
	globalClasses: string[];
	href: string;
	target: string;
	rel: string;
	download: boolean;
	buttonType: string;
	ariaLabel: string;
}

interface ButtonInspectorProps {
	attributes: ButtonAttributes;
	setAttributes: ( attrs: Partial< ButtonAttributes > ) => void;
}

// ── Option lists ──────────────────────────────────────────────────────────

const TAG_OPTIONS = [
	{ label: __( '<a> Link', 'goblocks' ), value: 'a' },
	{ label: __( '<button>', 'goblocks' ), value: 'button' },
];

const TARGET_OPTIONS = [
	{ label: __( 'Same tab', 'goblocks' ), value: '_self' },
	{ label: __( 'New tab', 'goblocks' ), value: '_blank' },
];

const BUTTON_TYPE_OPTIONS = [
	{ label: __( 'button', 'goblocks' ), value: 'button' },
	{ label: __( 'submit', 'goblocks' ), value: 'submit' },
	{ label: __( 'reset', 'goblocks' ), value: 'reset' },
];

// ── Component ─────────────────────────────────────────────────────────────

export function ButtonInspector( {
	attributes,
	setAttributes,
}: ButtonInspectorProps ) {
	const {
		styles,
		tagName,
		href,
		target,
		rel,
		download,
		buttonType,
		ariaLabel,
		globalClasses,
	} = attributes;

	const responsive = useResponsiveStyles( styles, ( patch ) =>
		setAttributes( { styles: patch.styles as BlockStyles } )
	);

	const isLink = 'a' === tagName;

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
			{ /* Element type */ }
			<PanelBody title={ __( 'Element Type', 'goblocks' ) } initialOpen>
				<SelectControl
					label={ __( 'HTML element', 'goblocks' ) }
					value={ tagName }
					options={ TAG_OPTIONS }
					onChange={ ( value ) =>
						setAttributes( { tagName: value } )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
			</PanelBody>

			{ /* Link settings — visible when tagName = a */ }
			{ isLink && (
				<PanelBody title={ __( 'Link', 'goblocks' ) } initialOpen>
					<TextControl
						label={ __( 'URL', 'goblocks' ) }
						value={ href }
						type="url"
						onChange={ ( value ) =>
							setAttributes( { href: value } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
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
					<ToggleControl
						label={ __( 'Download', 'goblocks' ) }
						help={ __(
							'Prompts the browser to download the linked file.',
							'goblocks'
						) }
						checked={ download }
						onChange={ ( value ) =>
							setAttributes( { download: value } )
						}
					/>
				</PanelBody>
			) }

			{ /* Button settings — visible when tagName = button */ }
			{ ! isLink && (
				<PanelBody title={ __( 'Button', 'goblocks' ) } initialOpen>
					<SelectControl
						label={ __( 'Button type', 'goblocks' ) }
						value={ buttonType }
						options={ BUTTON_TYPE_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { buttonType: value } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			) }

			{ /* Accessibility */ }
			<PanelBody
				title={ __( 'Accessibility', 'goblocks' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'ARIA label', 'goblocks' ) }
					value={ ariaLabel }
					help={ __(
						"Overrides the button's accessible name for screen readers.",
						'goblocks'
					) }
					onChange={ ( value ) =>
						setAttributes( { ariaLabel: value } )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
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
