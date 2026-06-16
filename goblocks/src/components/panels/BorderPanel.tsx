/**
 * BorderPanel — Border width/style/color (per-side) + border-radius (per-corner).
 */

import { PanelBody, Button, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { UnitInput } from '../controls/UnitInput';
import { ColorControl } from '../controls/ColorControl';
import type { BlockStyles } from '../../types/styles';
import type { UseResponsiveStylesReturn } from '../../hooks/useResponsiveStyles';

// ── Types ─────────────────────────────────────────────────────────────────

interface BorderPanelProps {
	styles: BlockStyles;
	responsive: UseResponsiveStylesReturn;
}

type Side = 'Top' | 'Right' | 'Bottom' | 'Left';

const SIDES: Side[] = [ 'Top', 'Right', 'Bottom', 'Left' ];

const BORDER_STYLE_OPTIONS = [
	{ label: __( 'None', 'goblocks' ), value: 'none' },
	{ label: __( 'Solid', 'goblocks' ), value: 'solid' },
	{ label: __( 'Dashed', 'goblocks' ), value: 'dashed' },
	{ label: __( 'Dotted', 'goblocks' ), value: 'dotted' },
	{ label: __( 'Double', 'goblocks' ), value: 'double' },
];

// ── Component ─────────────────────────────────────────────────────────────

export function BorderPanel( { responsive }: BorderPanelProps ) {
	const { getStyle, getInheritedValue, setStyle } = responsive;
	const [ linkedBorder, setLinkedBorder ] = useState( true );
	const [ linkedRadius, setLinkedRadius ] = useState( true );

	function getBorder( side: Side, prop: 'Width' | 'Style' | 'Color' ) {
		return getStyle( 'border', `border${ side }${ prop }` );
	}
	function setBorder( side: Side, prop: 'Width' | 'Style' | 'Color' ) {
		return ( v: string ) => {
			if ( linkedBorder ) {
				SIDES.forEach( ( s ) =>
					setStyle( 'border', `border${ s }${ prop }`, v )
				);
			} else {
				setStyle( 'border', `border${ side }${ prop }`, v );
			}
		};
	}

	type Corner = 'TopLeft' | 'TopRight' | 'BottomRight' | 'BottomLeft';
	const CORNERS: Corner[] = [
		'TopLeft',
		'TopRight',
		'BottomRight',
		'BottomLeft',
	];

	function getRadius( corner: Corner ) {
		return getStyle( 'border', `border${ corner }Radius` );
	}
	function setRadius( corner: Corner ) {
		return ( v: string ) => {
			if ( linkedRadius ) {
				CORNERS.forEach( ( c ) =>
					setStyle( 'border', `border${ c }Radius`, v )
				);
			} else {
				setStyle( 'border', `border${ corner }Radius`, v );
			}
		};
	}

	return (
		<PanelBody title={ __( 'Border', 'goblocks' ) } initialOpen={ false }>
			{ /* Border sides */ }
			<div className="gb-border-panel__header">
				<span>{ __( 'Border', 'goblocks' ) }</span>
				<Button
					isSmall
					variant="tertiary"
					onClick={ () => setLinkedBorder( ( l ) => ! l ) }
					aria-pressed={ linkedBorder }
					aria-label={
						linkedBorder
							? __( 'Per-side border', 'goblocks' )
							: __( 'All sides', 'goblocks' )
					}
				>
					{ linkedBorder
						? __( 'Per side', 'goblocks' )
						: __( 'All sides', 'goblocks' ) }
				</Button>
			</div>

			{ ( linkedBorder ? [ 'Top' as Side ] : SIDES ).map( ( side ) => (
				<div key={ side } className="gb-border-panel__side">
					{ ! linkedBorder && (
						<span className="gb-border-panel__side-label">
							{ side }
						</span>
					) }

					<div className="gb-border-panel__side-row">
						<UnitInput
							label={ __( 'Width', 'goblocks' ) }
							value={ getBorder( side, 'Width' ) }
							inheritedValue={ getInheritedValue(
								'border',
								`border${ side }Width`
							) }
							onChange={ setBorder( side, 'Width' ) }
							defaultUnit="px"
							min={ 0 }
							breakpoint="base"
						/>

						<SelectControl
							label={ __( 'Style', 'goblocks' ) }
							value={ getBorder( side, 'Style' ) ?? 'solid' }
							options={ BORDER_STYLE_OPTIONS }
							onChange={ setBorder( side, 'Style' ) }
							// @ts-ignore
							__nextHasNoMarginBottom
						/>
					</div>

					<ColorControl
						label={ __( 'Color', 'goblocks' ) }
						value={ getBorder( side, 'Color' ) }
						inheritedValue={ getInheritedValue(
							'border',
							`border${ side }Color`
						) }
						onChange={ setBorder( side, 'Color' ) }
						breakpoint="base"
					/>
				</div>
			) ) }

			{ /* Border radius */ }
			<div className="gb-border-panel__header gb-border-panel__header--radius">
				<span>{ __( 'Border radius', 'goblocks' ) }</span>
				<Button
					isSmall
					variant="tertiary"
					onClick={ () => setLinkedRadius( ( l ) => ! l ) }
					aria-pressed={ linkedRadius }
				>
					{ linkedRadius
						? __( 'Per corner', 'goblocks' )
						: __( 'All corners', 'goblocks' ) }
				</Button>
			</div>

			<div className="gb-border-panel__radius-grid">
				{ ( linkedRadius ? [ 'TopLeft' as Corner ] : CORNERS ).map(
					( corner ) => (
						<UnitInput
							key={ corner }
							label={
								linkedRadius
									? __( 'Radius', 'goblocks' )
									: corner.replace( /([A-Z])/g, ' $1' ).trim()
							}
							value={ getRadius( corner ) }
							inheritedValue={ getInheritedValue(
								'border',
								`border${ corner }Radius`
							) }
							onChange={ setRadius( corner ) }
							defaultUnit="px"
							min={ 0 }
							units={ [ 'px', 'rem', 'em', '%' ] }
							breakpoint="base"
						/>
					)
				) }
			</div>
		</PanelBody>
	);
}
