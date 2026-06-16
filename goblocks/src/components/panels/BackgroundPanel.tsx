/**
 * BackgroundPanel — Background color, image URL, gradient, overlay.
 */

import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ColorControl } from '../controls/ColorControl';
import { GradientControl } from '../controls/GradientControl';
import { RangeControl } from '../controls/RangeControl';
import type { BlockStyles } from '../../types/styles';
import type { UseResponsiveStylesReturn } from '../../hooks/useResponsiveStyles';

// ── Option sets ───────────────────────────────────────────────────────────

const BG_SIZE_OPTIONS = [
	{ label: __( 'Cover', 'goblocks' ), value: 'cover' },
	{ label: __( 'Contain', 'goblocks' ), value: 'contain' },
	{ label: __( 'Auto', 'goblocks' ), value: 'auto' },
];

const BG_REPEAT_OPTIONS = [
	{ label: __( 'No repeat', 'goblocks' ), value: 'no-repeat' },
	{ label: __( 'Repeat', 'goblocks' ), value: 'repeat' },
	{ label: __( 'Repeat X', 'goblocks' ), value: 'repeat-x' },
	{ label: __( 'Repeat Y', 'goblocks' ), value: 'repeat-y' },
];

// ── Types ─────────────────────────────────────────────────────────────────

interface BackgroundPanelProps {
	styles: BlockStyles;
	responsive: UseResponsiveStylesReturn;
}

// ── Component ─────────────────────────────────────────────────────────────

export function BackgroundPanel( { responsive }: BackgroundPanelProps ) {
	const { getStyle, getInheritedValue, setStyle } = responsive;

	function get( prop: string ) {
		return getStyle( 'background', prop );
	}
	function inh( prop: string ) {
		return getInheritedValue( 'background', prop );
	}
	function set( prop: string ) {
		return ( v: string ) => setStyle( 'background', prop, v );
	}

	const hasOverlay = Boolean( get( 'overlayColor' ) );

	return (
		<PanelBody
			title={ __( 'Background', 'goblocks' ) }
			initialOpen={ false }
		>
			<ColorControl
				label={ __( 'Background color', 'goblocks' ) }
				value={ get( 'backgroundColor' ) }
				inheritedValue={ inh( 'backgroundColor' ) }
				onChange={ set( 'backgroundColor' ) }
				breakpoint="base"
			/>

			<GradientControl
				label={ __( 'Gradient', 'goblocks' ) }
				value={ get( 'gradient' ) }
				onChange={ set( 'gradient' ) }
			/>

			<SelectControl
				label={ __( 'Background size', 'goblocks' ) }
				value={ get( 'backgroundSize' ) ?? '' }
				options={ [
					{ label: __( '— Default —', 'goblocks' ), value: '' },
					...BG_SIZE_OPTIONS,
				] }
				onChange={ set( 'backgroundSize' ) }
				// @ts-ignore
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'Background repeat', 'goblocks' ) }
				value={ get( 'backgroundRepeat' ) ?? '' }
				options={ [
					{ label: __( '— Default —', 'goblocks' ), value: '' },
					...BG_REPEAT_OPTIONS,
				] }
				onChange={ set( 'backgroundRepeat' ) }
				// @ts-ignore
				__nextHasNoMarginBottom
			/>

			{ /* Overlay section */ }
			<div className="gb-background-panel__overlay">
				<ToggleControl
					label={ __( 'Overlay', 'goblocks' ) }
					help={ __(
						'Add a color overlay via ::before pseudo-element.',
						'goblocks'
					) }
					checked={ hasOverlay }
					onChange={ ( checked ) => {
						if ( ! checked ) {
							set( 'overlayColor' )( '' );
							set( 'overlayOpacity' )( '' );
						}
					} }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>

				{ hasOverlay && (
					<>
						<ColorControl
							label={ __( 'Overlay color', 'goblocks' ) }
							value={ get( 'overlayColor' ) }
							onChange={ set( 'overlayColor' ) }
							breakpoint="base"
						/>
						<RangeControl
							label={ __( 'Overlay opacity', 'goblocks' ) }
							value={ get( 'overlayOpacity' ) }
							onChange={ set( 'overlayOpacity' ) }
							min={ 0 }
							max={ 1 }
							step={ 0.01 }
						/>
					</>
				) }
			</div>
		</PanelBody>
	);
}
