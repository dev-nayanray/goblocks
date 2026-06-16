/**
 * EffectsPanel — Opacity, box-shadow, transform, transition, filter, cursor.
 */

import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RangeControl } from '../controls/RangeControl';
import { ShadowControl } from '../controls/ShadowControl';
import { ToggleGroupControl } from '../controls/ToggleGroupControl';
import type { BlockStyles } from '../../types/styles';
import type { UseResponsiveStylesReturn } from '../../hooks/useResponsiveStyles';

// ── Types ─────────────────────────────────────────────────────────────────

interface EffectsPanelProps {
	styles: BlockStyles;
	responsive: UseResponsiveStylesReturn;
}

// ── Options ───────────────────────────────────────────────────────────────

const CURSOR_OPTIONS = [
	{ label: __( 'Auto', 'goblocks' ), value: 'auto' },
	{ label: __( 'Pointer', 'goblocks' ), value: 'pointer' },
	{ label: __( 'Default', 'goblocks' ), value: 'default' },
	{ label: __( 'None', 'goblocks' ), value: 'none' },
];

// ── Component ─────────────────────────────────────────────────────────────

export function EffectsPanel( { responsive }: EffectsPanelProps ) {
	const { getStyle, setStyle } = responsive;

	function get( prop: string ) {
		return getStyle( 'effects', prop );
	}
	function set( prop: string ) {
		return ( v: string ) => setStyle( 'effects', prop, v );
	}

	return (
		<PanelBody title={ __( 'Effects', 'goblocks' ) } initialOpen={ false }>
			<RangeControl
				label={ __( 'Opacity', 'goblocks' ) }
				value={ get( 'opacity' ) }
				onChange={ set( 'opacity' ) }
				min={ 0 }
				max={ 1 }
				step={ 0.01 }
			/>

			<ShadowControl
				label={ __( 'Box shadow', 'goblocks' ) }
				value={ get( 'boxShadow' ) }
				onChange={ set( 'boxShadow' ) }
			/>

			<TextControl
				label={ __( 'Transform', 'goblocks' ) }
				value={ get( 'transform' ) ?? '' }
				placeholder="translateY(-2px) rotate(3deg)"
				onChange={ set( 'transform' ) }
				help={ __( 'CSS transform value', 'goblocks' ) }
				// @ts-ignore
				__nextHasNoMarginBottom
			/>

			<TextControl
				label={ __( 'Transition', 'goblocks' ) }
				value={ get( 'transition' ) ?? '' }
				placeholder="all 0.2s ease"
				onChange={ set( 'transition' ) }
				help={ __( 'CSS transition shorthand', 'goblocks' ) }
				// @ts-ignore
				__nextHasNoMarginBottom
			/>

			<TextControl
				label={ __( 'Filter', 'goblocks' ) }
				value={ get( 'filter' ) ?? '' }
				placeholder="blur(4px) brightness(0.8)"
				onChange={ set( 'filter' ) }
				// @ts-ignore
				__nextHasNoMarginBottom
			/>

			<ToggleGroupControl
				label={ __( 'Cursor', 'goblocks' ) }
				value={ get( 'cursor' ) }
				options={ CURSOR_OPTIONS }
				onChange={ set( 'cursor' ) }
				deselectable
			/>
		</PanelBody>
	);
}
