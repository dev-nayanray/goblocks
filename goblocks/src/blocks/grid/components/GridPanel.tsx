import {
	PanelBody,
	Button,
	ButtonGroup,
	TextControl,
	ToggleControl,
	UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { BreakpointTabs } from '../../../components/controls/BreakpointTabs';
import type { UseResponsiveStylesReturn } from '../../../hooks/useResponsiveStyles';

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Parse column count from repeat(N, 1fr). Returns null for custom templates.
 * @param template
 */
function getColumnCount( template: string ): number | null {
	const m = template.match( /^repeat\((\d+),/ );
	return m ? parseInt( m[ 1 ] ?? '0', 10 ) : null;
}

/**
 * Return true when the template uses repeat(auto-fill, …) or repeat(auto-fit, …).
 * @param template
 */
function isAutoMode( template: string ): boolean {
	return /^repeat\(auto-(fill|fit),/.test( template );
}

/**
 * Extract min-width from repeat(auto-fill, minmax(Xpx, 1fr)).
 * @param template
 */
function getAutoMinWidth( template: string ): string {
	const m = template.match( /minmax\(([^,]+),/ );
	return m ? ( m[ 1 ] ?? '' ).trim() : '250px';
}

const PRESET_COUNTS = [ 1, 2, 3, 4, 5, 6 ];

// ── Component ─────────────────────────────────────────────────────────────

interface GridPanelProps {
	responsive: UseResponsiveStylesReturn;
}

export function GridPanel( { responsive }: GridPanelProps ) {
	const { setStyle, getInheritedValue, activeBreakpoint } = responsive;

	const rawTemplate = ( getInheritedValue(
		'layout',
		'gridTemplateColumns'
	) ?? '' ) as string;
	const columnCount = getColumnCount( rawTemplate );
	const autoMode = isAutoMode( rawTemplate );
	const autoMinWidth = getAutoMinWidth( rawTemplate );

	function setTemplate( template: string ) {
		setStyle( 'layout', 'display', 'grid' );
		setStyle( 'layout', 'gridTemplateColumns', template );
	}

	function onPresetClick( n: number ) {
		setTemplate( `repeat(${ n }, 1fr)` );
	}

	function onAutoToggle( checked: boolean ) {
		if ( checked ) {
			setTemplate( `repeat(auto-fill, minmax(${ autoMinWidth }, 1fr))` );
		} else {
			setTemplate( `repeat(${ columnCount ?? 3 }, 1fr)` );
		}
	}

	function onAutoMinWidthChange( value: string | undefined ) {
		if ( value ) {
			setTemplate( `repeat(auto-fill, minmax(${ value }, 1fr))` );
		}
	}

	return (
		<PanelBody title={ __( 'Grid Layout', 'goblocks' ) } initialOpen>
			<BreakpointTabs />

			{ /* Column presets */ }
			{ ! autoMode && (
				<div style={ { marginBottom: 16 } }>
					<p style={ { marginBottom: 8 } }>
						{ __( 'Columns', 'goblocks' ) }
					</p>
					<ButtonGroup>
						{ PRESET_COUNTS.map( ( n ) => (
							<Button
								key={ n }
								variant={
									n === columnCount ? 'primary' : 'secondary'
								}
								onClick={ () => onPresetClick( n ) }
								style={ { minWidth: 36 } }
							>
								{ n }
							</Button>
						) ) }
					</ButtonGroup>
				</div>
			) }

			{ /* Auto-fill responsive columns */ }
			<ToggleControl
				label={ __(
					'Auto columns (responsive without breakpoints)',
					'goblocks'
				) }
				help={ __(
					'Uses repeat(auto-fill, minmax) for natural wrapping.',
					'goblocks'
				) }
				checked={ autoMode }
				onChange={ onAutoToggle }
			/>

			{ autoMode && (
				<UnitControl
					label={ __( 'Minimum column width', 'goblocks' ) }
					value={ autoMinWidth }
					onChange={ onAutoMinWidthChange }
					units={ [
						{ value: 'px', label: 'px', default: 250 },
						{ value: 'rem', label: 'rem', default: 15 },
						{ value: '%', label: '%', default: 25 },
					] }
				/>
			) }

			{ /* Custom template override */ }
			<TextControl
				label={ __( 'Custom column template', 'goblocks' ) }
				value={ rawTemplate }
				help={ __(
					'CSS grid-template-columns value. Overrides preset.',
					'goblocks'
				) }
				onChange={ ( value ) => setTemplate( value ) }
				// @ts-ignore
				__nextHasNoMarginBottom
			/>
		</PanelBody>
	);
}
