/**
 * Accordion Item block — Edit component.
 *
 * Renders a <details>/<summary> element. The question is editable inline via
 * RichText (no formats). Answer content is inner blocks.
 * Always rendered open in the editor for easy access to inner blocks.
 */

import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';
import type { BlockStyles } from '../../types/styles';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AccordionItemAttributes {
	uniqueId: string;
	styles: BlockStyles;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	dynamicContent: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
	question: string;
	isOpen: boolean;
}

// ── Unique ID ─────────────────────────────────────────────────────────────────

function makeUniqueId( clientId: string ): string {
	return clientId.replace( /-/g, '' ).slice( 0, 8 );
}

// ── Edit component ────────────────────────────────────────────────────────────

export function Edit( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< AccordionItemAttributes > ) {
	const { uniqueId, question, isOpen } = attributes;

	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	const blockProps = useBlockProps( { className: 'gb-accordion-item' } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'gb-accordion-item__content' },
		{
			template: [
				[
					'goblocks/text',
					{ placeholder: __( 'Answer…', 'goblocks' ) },
				],
			],
		}
	);

	return (
		<>
			{ /* Inspector — isOpen toggle only */ }
			<InspectorControls>
				<PanelBody
					title={ __( 'Item Settings', 'goblocks' ) }
					initialOpen
				>
					<ToggleControl
						label={ __( 'Open by default', 'goblocks' ) }
						help={ __(
							'Panel starts expanded on page load.',
							'goblocks'
						) }
						checked={ isOpen }
						onChange={ ( v ) => setAttributes( { isOpen: v } ) }
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>

			{ /* Always open in editor for inner-block access */ }
			<details { ...blockProps } open>
				<summary className="gb-accordion-item__trigger">
					<RichText
						tagName="span"
						className="gb-accordion-item__question"
						value={ question }
						onChange={ ( v ) => setAttributes( { question: v } ) }
						placeholder={ __( 'Question…', 'goblocks' ) }
						allowedFormats={ [] }
						keepPlaceholderOnFocus
					/>
					<span
						className="gb-accordion-item__icon"
						aria-hidden="true"
					/>
				</summary>

				<div { ...innerBlocksProps } />
			</details>
		</>
	);
}
