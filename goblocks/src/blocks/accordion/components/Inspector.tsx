import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { BlockStyles } from '../../../types/styles';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AccordionBlockAttributes {
	uniqueId: string;
	tagName: string;
	styles: BlockStyles;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	dynamicContent: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
	enableFaqSchema: boolean;
	allowMultiple: boolean;
}

interface AccordionInspectorProps {
	attributes: AccordionBlockAttributes;
	setAttributes: ( attrs: Partial< AccordionBlockAttributes > ) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AccordionInspector( {
	attributes,
	setAttributes,
}: AccordionInspectorProps ) {
	const { enableFaqSchema, allowMultiple, globalClasses } = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Accordion Settings', 'goblocks' ) }
				initialOpen
			>
				<ToggleControl
					label={ __( 'Allow Multiple Open', 'goblocks' ) }
					help={
						allowMultiple
							? __(
									'Multiple panels can be open simultaneously.',
									'goblocks'
							  )
							: __(
									'Only one panel is open at a time.',
									'goblocks'
							  )
					}
					checked={ allowMultiple }
					onChange={ ( v ) => setAttributes( { allowMultiple: v } ) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>

				<ToggleControl
					label={ __( 'Enable FAQ Schema', 'goblocks' ) }
					help={ __(
						'Outputs schema.org/FAQPage markup for SEO rich results.',
						'goblocks'
					) }
					checked={ enableFaqSchema }
					onChange={ ( v ) =>
						setAttributes( { enableFaqSchema: v } )
					}
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
