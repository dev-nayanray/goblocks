import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RadioControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { BlockStyles } from '../../../types/styles';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TabsBlockAttributes {
	uniqueId: string;
	tagName: string;
	styles: BlockStyles;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	dynamicContent: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
	orientation: 'horizontal' | 'vertical';
	defaultTab: number;
}

interface TabsInspectorProps {
	attributes: TabsBlockAttributes;
	setAttributes: ( attrs: Partial< TabsBlockAttributes > ) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TabsInspector( {
	attributes,
	setAttributes,
}: TabsInspectorProps ) {
	const { orientation, defaultTab, globalClasses } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Tabs Settings', 'goblocks' ) } initialOpen>
				<RadioControl
					label={ __( 'Orientation', 'goblocks' ) }
					selected={ orientation }
					options={ [
						{
							label: __( 'Horizontal', 'goblocks' ),
							value: 'horizontal',
						},
						{
							label: __( 'Vertical', 'goblocks' ),
							value: 'vertical',
						},
					] }
					onChange={ ( v ) =>
						setAttributes( {
							orientation: v as 'horizontal' | 'vertical',
						} )
					}
				/>

				<TextControl
					label={ __( 'Default Active Tab', 'goblocks' ) }
					help={ __(
						'0 = first tab. Tabs are zero-indexed.',
						'goblocks'
					) }
					type="number"
					value={ String( defaultTab ) }
					onChange={ ( v ) =>
						setAttributes( { defaultTab: parseInt( v, 10 ) || 0 } )
					}
					min={ 0 }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Advanced', 'goblocks' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'Additional CSS Classes', 'goblocks' ) }
					value={ ( globalClasses ?? [] ).join( ' ' ) }
					onChange={ ( v ) =>
						setAttributes( {
							globalClasses: v.split( ' ' ).filter( Boolean ),
						} )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
			</PanelBody>
		</InspectorControls>
	);
}
