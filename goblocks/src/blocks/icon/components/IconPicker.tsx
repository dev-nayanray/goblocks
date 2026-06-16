import { useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ICONS from '../icons';
import type { IconDefinition } from '../icons';

// ── Types ─────────────────────────────────────────────────────────────────────

interface IconPickerProps {
	selected: string;
	onSelect: ( slug: string ) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function IconPicker( { selected, onSelect }: IconPickerProps ) {
	const [ search, setSearch ] = useState( '' );

	const filtered: IconDefinition[] = search
		? ICONS.filter(
				( icon ) =>
					icon.label.toLowerCase().includes( search.toLowerCase() ) ||
					icon.slug.includes( search.toLowerCase() )
		  )
		: ICONS;

	return (
		<div>
			<TextControl
				label={ __( 'Search icons', 'goblocks' ) }
				value={ search }
				onChange={ setSearch }
				placeholder={ __( 'home, arrow, star…', 'goblocks' ) }
				// @ts-ignore
				__nextHasNoMarginBottom
			/>

			<div
				style={ {
					display: 'grid',
					gridTemplateColumns: 'repeat(6, 1fr)',
					gap: '4px',
					maxHeight: '240px',
					overflowY: 'auto',
					marginTop: '8px',
					padding: '4px',
					border: '1px solid #e0e0e0',
					borderRadius: '4px',
				} }
			>
				{ filtered.map( ( icon ) => (
					<button
						key={ icon.slug }
						type="button"
						title={ icon.label }
						aria-label={ icon.label }
						aria-pressed={ icon.slug === selected }
						onClick={ () => onSelect( icon.slug ) }
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '6px',
							border:
								icon.slug === selected
									? '2px solid #007cba'
									: '2px solid transparent',
							borderRadius: '4px',
							background:
								icon.slug === selected
									? '#e8f4fd'
									: 'transparent',
							cursor: 'pointer',
							color: 'currentColor',
						} }
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
							dangerouslySetInnerHTML={ { __html: icon.inner } }
						/>
					</button>
				) ) }

				{ filtered.length === 0 && (
					<p
						style={ {
							gridColumn: '1 / -1',
							textAlign: 'center',
							color: '#888',
							margin: '12px 0',
							fontSize: '12px',
						} }
					>
						{ __( 'No icons match your search.', 'goblocks' ) }
					</p>
				) }
			</div>

			{ filtered.length > 0 && (
				<p
					style={ {
						margin: '4px 0 0',
						fontSize: '11px',
						color: '#888',
					} }
				>
					{ filtered.length } { __( 'icons', 'goblocks' ) }
				</p>
			) }
		</div>
	);
}
