import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	ColorPicker,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import SHAPES from '../shapes';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ShapeAttributes {
	shapeSlug: string;
	fillColor: string;
	shapeHeight: number;
	flipX: boolean;
	flipY: boolean;
	placement: string;
	globalClasses: string[];
}

interface ShapeInspectorProps {
	attributes: ShapeAttributes;
	setAttributes: ( attrs: Partial< ShapeAttributes > ) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SHAPE_OPTIONS = SHAPES.map( ( s ) => ( {
	label: s.label,
	value: s.slug,
} ) );

const PLACEMENT_OPTIONS = [
	{ label: __( 'Bottom of section above', 'goblocks' ), value: 'bottom' },
	{ label: __( 'Top of section below', 'goblocks' ), value: 'top' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function ShapeInspector( {
	attributes,
	setAttributes,
}: ShapeInspectorProps ) {
	const {
		shapeSlug,
		fillColor,
		shapeHeight,
		flipX,
		flipY,
		placement,
		globalClasses,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Shape', 'goblocks' ) } initialOpen>
				<SelectControl
					label={ __( 'Shape preset', 'goblocks' ) }
					value={ shapeSlug }
					options={ SHAPE_OPTIONS }
					onChange={ ( val ) => setAttributes( { shapeSlug: val } ) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>

				<NumberControl
					label={ __( 'Height (px)', 'goblocks' ) }
					value={ shapeHeight }
					min={ 10 }
					max={ 400 }
					onChange={ ( val ) =>
						setAttributes( {
							shapeHeight:
								parseInt( String( val ?? 80 ), 10 ) || 80,
						} )
					}
					// @ts-ignore
					__next40pxDefaultSize
				/>

				<SelectControl
					label={ __( 'Placement', 'goblocks' ) }
					value={ placement }
					options={ PLACEMENT_OPTIONS }
					onChange={ ( val ) => setAttributes( { placement: val } ) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>

				<div style={ { display: 'flex', gap: '12px' } }>
					<ToggleControl
						label={ __( 'Flip horizontal', 'goblocks' ) }
						checked={ flipX }
						onChange={ ( val ) => setAttributes( { flipX: val } ) }
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Flip vertical', 'goblocks' ) }
						checked={ flipY }
						onChange={ ( val ) => setAttributes( { flipY: val } ) }
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
				</div>
			</PanelBody>

			<PanelBody
				title={ __( 'Color', 'goblocks' ) }
				initialOpen={ false }
			>
				<p style={ { margin: '0 0 8px', fontSize: '12px' } }>
					{ __( 'Fill color', 'goblocks' ) }
				</p>
				<ColorPicker
					color={ fillColor }
					onChange={ ( val ) => setAttributes( { fillColor: val } ) }
					enableAlpha
					defaultValue="#ffffff"
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Advanced', 'goblocks' ) }
				initialOpen={ false }
			>
				<p style={ { margin: '0 0 4px', fontSize: '12px' } }>
					{ __( 'Additional CSS classes', 'goblocks' ) }
				</p>
				<input
					type="text"
					value={ ( globalClasses ?? [] ).join( ' ' ) }
					onChange={ ( e ) =>
						setAttributes( {
							globalClasses: e.target.value
								.split( /\s+/ )
								.filter( Boolean ),
						} )
					}
					style={ {
						width: '100%',
						padding: '6px',
						border: '1px solid #ddd',
						borderRadius: '4px',
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
