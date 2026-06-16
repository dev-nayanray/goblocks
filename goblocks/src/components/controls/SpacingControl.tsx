/**
 * SpacingControl — Four-side dimension inputs (top/right/bottom/left).
 *
 * When linked (all sides locked together), renders a single input.
 * Auto-detects linked state if all four incoming values are equal.
 * Used for padding, margin.
 *
 * For gap (two-axis), use `twoAxis` prop which shows only top (row) + left (column).
 */

import { useState, useCallback } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { Icon, link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { UnitInput } from './UnitInput';
import type { UnitOption } from '../../types/controls';

// ── Types ─────────────────────────────────────────────────────────────────

export interface SpacingSides {
	top?: string | undefined;
	right?: string | undefined;
	bottom?: string | undefined;
	left?: string | undefined;
}

interface SpacingControlProps {
	label: string;
	values: Partial< SpacingSides >;
	onChange: ( side: keyof SpacingSides, value: string ) => void;
	/** Inherited values from smaller breakpoints (shown as placeholders). */
	inherited?: Partial< SpacingSides >;
	disabled?: boolean;
	/** Default unit for the UnitInputs. Default: 'px'. */
	defaultUnit?: UnitOption;
	/** Show only row-gap and column-gap (for gap property). */
	twoAxis?: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function allSidesEqual( v: Partial< SpacingSides > ): boolean {
	const vals = [ v.top, v.right, v.bottom, v.left ].filter( Boolean );
	return vals.length > 0 && vals.every( ( s ) => s === vals[ 0 ] );
}

// ── Component ─────────────────────────────────────────────────────────────

export function SpacingControl( {
	label,
	values,
	onChange,
	inherited,
	disabled = false,
	defaultUnit = 'px',
	twoAxis = false,
}: SpacingControlProps ) {
	const [ linked, setLinked ] = useState( () => allSidesEqual( values ) );

	const handleChange = useCallback(
		( side: keyof SpacingSides, value: string ) => {
			if ( linked ) {
				onChange( 'top', value );
				onChange( 'right', value );
				onChange( 'bottom', value );
				onChange( 'left', value );
			} else {
				onChange( side, value );
			}
		},
		[ linked, onChange ]
	);

	if ( twoAxis ) {
		return (
			<div className="gb-spacing-control gb-spacing-control--two-axis">
				<span className="gb-spacing-control__label">{ label }</span>
				<div className="gb-spacing-control__inputs">
					<UnitInput
						label={ __( 'Row gap', 'goblocks' ) }
						value={ values.top }
						inheritedValue={ inherited?.top }
						onChange={ ( v ) => onChange( 'top', v ) }
						defaultUnit={ defaultUnit }
						disabled={ disabled }
						breakpoint="base"
					/>
					<UnitInput
						label={ __( 'Column gap', 'goblocks' ) }
						value={ values.left }
						inheritedValue={ inherited?.left }
						onChange={ ( v ) => onChange( 'left', v ) }
						defaultUnit={ defaultUnit }
						disabled={ disabled }
						breakpoint="base"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="gb-spacing-control">
			<div className="gb-spacing-control__header">
				<span className="gb-spacing-control__label">{ label }</span>
				<Button
					className="gb-spacing-control__link"
					isSmall
					variant={ linked ? 'primary' : 'tertiary' }
					onClick={ () => setLinked( ( l ) => ! l ) }
					aria-label={
						linked
							? __( 'Unlink sides', 'goblocks' )
							: __( 'Link all sides', 'goblocks' )
					}
					aria-pressed={ linked }
					disabled={ disabled }
				>
					<Icon icon={ linked ? link : linkOff } size={ 16 } />
				</Button>
			</div>

			{ linked ? (
				<UnitInput
					label={ label }
					value={ values.top }
					inheritedValue={ inherited?.top }
					onChange={ ( v ) => handleChange( 'top', v ) }
					defaultUnit={ defaultUnit }
					disabled={ disabled }
					breakpoint="base"
				/>
			) : (
				<div className="gb-spacing-control__grid">
					<UnitInput
						label={ __( 'Top', 'goblocks' ) }
						value={ values.top }
						inheritedValue={ inherited?.top }
						onChange={ ( v ) => handleChange( 'top', v ) }
						defaultUnit={ defaultUnit }
						disabled={ disabled }
						breakpoint="base"
					/>
					<UnitInput
						label={ __( 'Right', 'goblocks' ) }
						value={ values.right }
						inheritedValue={ inherited?.right }
						onChange={ ( v ) => handleChange( 'right', v ) }
						defaultUnit={ defaultUnit }
						disabled={ disabled }
						breakpoint="base"
					/>
					<UnitInput
						label={ __( 'Bottom', 'goblocks' ) }
						value={ values.bottom }
						inheritedValue={ inherited?.bottom }
						onChange={ ( v ) => handleChange( 'bottom', v ) }
						defaultUnit={ defaultUnit }
						disabled={ disabled }
						breakpoint="base"
					/>
					<UnitInput
						label={ __( 'Left', 'goblocks' ) }
						value={ values.left }
						inheritedValue={ inherited?.left }
						onChange={ ( v ) => handleChange( 'left', v ) }
						defaultUnit={ defaultUnit }
						disabled={ disabled }
						breakpoint="base"
					/>
				</div>
			) }
		</div>
	);
}
