import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorTabs } from '../../../components/ui/InspectorTabs';
import { SizingPanel } from '../../../components/panels/SizingPanel';
import { SpacingPanel } from '../../../components/panels/SpacingPanel';
import { BackgroundPanel } from '../../../components/panels/BackgroundPanel';
import { BorderPanel } from '../../../components/panels/BorderPanel';
import { EffectsPanel } from '../../../components/panels/EffectsPanel';
import { useResponsiveStyles } from '../../../hooks/useResponsiveStyles';
import type { BlockStyles } from '../../../types/styles';

import { GridPanel } from './GridPanel';

// ── Types ─────────────────────────────────────────────────────────────────

interface GridAttributes {
	tagName: string;
	styles: BlockStyles;
	globalClasses: string[];
}

interface GridInspectorProps {
	attributes: GridAttributes;
	setAttributes: ( attrs: Partial< GridAttributes > ) => void;
}

// ── Tag options ───────────────────────────────────────────────────────────

const TAG_OPTIONS = [
	{ label: 'div', value: 'div' },
	{ label: 'section', value: 'section' },
	{ label: 'article', value: 'article' },
	{ label: 'ul', value: 'ul' },
	{ label: 'ol', value: 'ol' },
];

// ── Component ─────────────────────────────────────────────────────────────

export function GridInspector( {
	attributes,
	setAttributes,
}: GridInspectorProps ) {
	const { styles, tagName, globalClasses } = attributes;

	const responsive = useResponsiveStyles( styles, ( patch ) =>
		setAttributes( { styles: patch.styles as BlockStyles } )
	);

	const stylesContent = (
		<>
			<GridPanel responsive={ responsive } />
			<SizingPanel styles={ styles } responsive={ responsive } />
			<SpacingPanel styles={ styles } responsive={ responsive } />
			<BackgroundPanel styles={ styles } responsive={ responsive } />
			<BorderPanel styles={ styles } responsive={ responsive } />
			<EffectsPanel styles={ styles } responsive={ responsive } />
		</>
	);

	const advancedContent = (
		<>
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
			</PanelBody>

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
