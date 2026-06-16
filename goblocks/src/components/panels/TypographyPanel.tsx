/**
 * TypographyPanel — Font, size, weight, line-height, alignment, transform, color.
 */

import { PanelBody } from '@wordpress/components';
import { Icon, alignLeft, alignCenter, alignRight, alignJustify } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { FontControl } from '../controls/FontControl';
import { UnitInput } from '../controls/UnitInput';
import { ToggleGroupControl } from '../controls/ToggleGroupControl';
import { ColorControl } from '../controls/ColorControl';
import type { BlockStyles } from '../../types/styles';
import type { UseResponsiveStylesReturn } from '../../hooks/useResponsiveStyles';

// ── Option sets ───────────────────────────────────────────────────────────

const WEIGHT_OPTIONS = [
	{ label: '100', value: '100' },
	{ label: '200', value: '200' },
	{ label: '300', value: '300' },
	{ label: '400', value: '400' },
	{ label: '500', value: '500' },
	{ label: '600', value: '600' },
	{ label: '700', value: '700' },
	{ label: '800', value: '800' },
	{ label: '900', value: '900' },
];

const ALIGN_OPTIONS = [
	{ label: 'Left',    value: 'left',    ariaLabel: __( 'Left', 'goblocks' ),    icon: <Icon icon={ alignLeft }    size={ 16 } /> },
	{ label: 'Center',  value: 'center',  ariaLabel: __( 'Center', 'goblocks' ),  icon: <Icon icon={ alignCenter }  size={ 16 } /> },
	{ label: 'Right',   value: 'right',   ariaLabel: __( 'Right', 'goblocks' ),   icon: <Icon icon={ alignRight }   size={ 16 } /> },
	{ label: 'Justify', value: 'justify', ariaLabel: __( 'Justify', 'goblocks' ), icon: <Icon icon={ alignJustify } size={ 16 } /> },
];

const TRANSFORM_OPTIONS = [
	{ label: __( 'None', 'goblocks' ), value: 'none' },
	{ label: __( 'UPPER', 'goblocks' ), value: 'uppercase' },
	{ label: __( 'lower', 'goblocks' ), value: 'lowercase' },
	{ label: __( 'Capitalize', 'goblocks' ), value: 'capitalize' },
];

const DECORATION_OPTIONS = [
	{ label: __( 'None', 'goblocks' ), value: 'none' },
	{ label: __( 'Underline', 'goblocks' ), value: 'underline' },
	{ label: __( 'Line-through', 'goblocks' ), value: 'line-through' },
];

const STYLE_OPTIONS = [
	{ label: __( 'Normal', 'goblocks' ), value: 'normal' },
	{ label: __( 'Italic', 'goblocks' ), value: 'italic' },
];

// ── Types ─────────────────────────────────────────────────────────────────

interface TypographyPanelProps {
	styles: BlockStyles;
	responsive: UseResponsiveStylesReturn;
}

// ── Component ─────────────────────────────────────────────────────────────

export function TypographyPanel( { responsive }: TypographyPanelProps ) {
	const { getStyle, getInheritedValue, setStyle } = responsive;

	function get( prop: string ) {
		return getStyle( 'typography', prop );
	}
	function inh( prop: string ) {
		return getInheritedValue( 'typography', prop );
	}
	function set( prop: string ) {
		return ( v: string ) => setStyle( 'typography', prop, v );
	}

	return (
		<PanelBody
			title={ __( 'Typography', 'goblocks' ) }
			initialOpen={ false }
		>
			<FontControl
				label={ __( 'Font family', 'goblocks' ) }
				value={ get( 'fontFamily' ) }
				onChange={ set( 'fontFamily' ) }
			/>

			<UnitInput
				label={ __( 'Font size', 'goblocks' ) }
				value={ get( 'fontSize' ) }
				inheritedValue={ inh( 'fontSize' ) }
				onChange={ set( 'fontSize' ) }
				defaultUnit="rem"
				units={ [ 'rem', 'em', 'px', '%', 'vw' ] }
				breakpoint="base"
			/>

			<ToggleGroupControl
				label={ __( 'Font weight', 'goblocks' ) }
				value={ get( 'fontWeight' ) }
				options={ WEIGHT_OPTIONS }
				onChange={ set( 'fontWeight' ) }
			/>

			<UnitInput
				label={ __( 'Line height', 'goblocks' ) }
				value={ get( 'lineHeight' ) }
				inheritedValue={ inh( 'lineHeight' ) }
				onChange={ set( 'lineHeight' ) }
				defaultUnit=""
				units={ [ '' as any, 'em', 'px' ] }
				breakpoint="base"
			/>

			<UnitInput
				label={ __( 'Letter spacing', 'goblocks' ) }
				value={ get( 'letterSpacing' ) }
				inheritedValue={ inh( 'letterSpacing' ) }
				onChange={ set( 'letterSpacing' ) }
				defaultUnit="em"
				units={ [ 'em', 'px', 'rem' ] }
				breakpoint="base"
			/>

			<ToggleGroupControl
				label={ __( 'Text align', 'goblocks' ) }
				value={ get( 'textAlign' ) }
				options={ ALIGN_OPTIONS }
				onChange={ set( 'textAlign' ) }
				deselectable
			/>

			<ToggleGroupControl
				label={ __( 'Text transform', 'goblocks' ) }
				value={ get( 'textTransform' ) }
				options={ TRANSFORM_OPTIONS }
				onChange={ set( 'textTransform' ) }
				deselectable
			/>

			<ToggleGroupControl
				label={ __( 'Text decoration', 'goblocks' ) }
				value={ get( 'textDecoration' ) }
				options={ DECORATION_OPTIONS }
				onChange={ set( 'textDecoration' ) }
				deselectable
			/>

			<ToggleGroupControl
				label={ __( 'Font style', 'goblocks' ) }
				value={ get( 'fontStyle' ) }
				options={ STYLE_OPTIONS }
				onChange={ set( 'fontStyle' ) }
				deselectable
			/>

			<ColorControl
				label={ __( 'Color', 'goblocks' ) }
				value={ get( 'color' ) }
				inheritedValue={ inh( 'color' ) }
				onChange={ set( 'color' ) }
				breakpoint="base"
			/>
		</PanelBody>
	);
}
