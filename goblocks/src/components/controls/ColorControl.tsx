/**
 * ColorControl — Color picker with plugin + theme token support.
 *
 * Features:
 *  - Plugin global palette (from globalStylesStore)
 *  - WordPress theme palette (from wp.data editor store)
 *  - Hex text input
 *  - Passes CSS color string or var(--gb-color-*) as value
 *
 * Wraps @wordpress/components ColorPicker + a token grid popover.
 */

import { useState, useCallback } from '@wordpress/element';
import {
	Button,
	ColorPicker,
	Popover,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useColorPalette } from '../../store/globalStylesStore';
import { isValidCssColor, isCssVar } from '../../utils/color';
import type { ControlProps } from '../../types/controls';

// ── Types ─────────────────────────────────────────────────────────────────

type ColorControlProps = Omit< ControlProps, 'tokenOptions' >;

// ── Swatch ────────────────────────────────────────────────────────────────

function ColorSwatch( {
	color,
	label,
	active,
	onClick,
}: {
	color: string;
	label: string;
	active: boolean;
	onClick: () => void;
} ) {
	return (
		<button
			className={ `gb-color-swatch${ active ? ' is-active' : '' }` }
			style={ { background: color } }
			onClick={ onClick }
			title={ label }
			aria-label={ label }
			aria-pressed={ active }
		/>
	);
}

// ── Component ─────────────────────────────────────────────────────────────

export function ColorControl( {
	value,
	onChange,
	label,
	help,
	inheritedValue,
	resetable = true,
	disabled = false,
}: ColorControlProps ) {
	const [ pickerOpen, setPickerOpen ] = useState( false );
	const colorPalette = useColorPalette();

	const displayValue = value ?? '';
	const isVar = isCssVar( displayValue );

	const handleColorChange = useCallback(
		( color: string ) => {
			onChange( color );
			setPickerOpen( false );
		},
		[ onChange ]
	);

	function handleHexInput( hex: string ) {
		if ( '' === hex ) {
			onChange( '' );
			return;
		}
		if ( isValidCssColor( hex ) ) {
			onChange( hex );
		}
	}

	function handleReset() {
		onChange( '' );
		setPickerOpen( false );
	}

	return (
		<div className="gb-color-control">
			<div className="gb-color-control__header">
				{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
				<label className="gb-color-control__label">{ label }</label>
				{ resetable && displayValue && (
					<Button
						isSmall
						variant="tertiary"
						onClick={ handleReset }
						aria-label={ __( 'Reset', 'goblocks' ) }
						disabled={ disabled }
					>
						{ __( 'Reset', 'goblocks' ) }
					</Button>
				) }
			</div>

			{ /* Plugin color palette */ }
			{ colorPalette.length > 0 && (
				<div
					className="gb-color-control__palette"
					aria-label={ __( 'Plugin color palette', 'goblocks' ) }
				>
					{ colorPalette.map( ( entry ) => {
						const varVal = `var(--gb-color-${ entry.slug })`;
						return (
							<ColorSwatch
								key={ entry.slug }
								color={ entry.color }
								label={ entry.name }
								active={
									displayValue === varVal ||
									displayValue === entry.color
								}
								onClick={ () => onChange( varVal ) }
							/>
						);
					} ) }
				</div>
			) }

			{ /* Color picker button */ }
			<div className="gb-color-control__row">
				<Button
					className="gb-color-control__preview"
					style={ {
						background: isVar
							? `var(${ displayValue.slice( 4, -1 ) })`
							: displayValue ||
							  ( inheritedValue ?? 'transparent' ),
					} }
					onClick={ () => setPickerOpen( ( o ) => ! o ) }
					aria-label={ __( 'Open color picker', 'goblocks' ) }
					disabled={ disabled }
				>
					<span className="screen-reader-text">
						{ __( 'Open color picker', 'goblocks' ) }
					</span>
				</Button>

				<TextControl
					className="gb-color-control__hex"
					value={ isVar ? displayValue : displayValue }
					placeholder={
						inheritedValue ?? __( 'Color or var()', 'goblocks' )
					}
					onChange={ handleHexInput }
					disabled={ disabled }
					label=""
					hideLabelFromVision
					// @ts-ignore
					__nextHasNoMarginBottom
				/>

				{ pickerOpen && (
					<Popover
						className="gb-color-control__popover"
						onClose={ () => setPickerOpen( false ) }
						placement="bottom-start"
					>
						<ColorPicker
							color={ isVar ? undefined : displayValue }
							onChange={ ( hex ) => handleColorChange( hex ) }
							enableAlpha
						/>
					</Popover>
				) }
			</div>

			{ help && <p className="gb-color-control__help">{ help }</p> }
		</div>
	);
}
