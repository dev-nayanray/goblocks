import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PaginationAttributes {
	showPrevNext: boolean;
	showFirstLast: boolean;
	prevLabel: string;
	nextLabel: string;
	loadMoreLabel: string;
	globalClasses: string[];
}

interface PaginationInspectorProps {
	attributes: PaginationAttributes;
	setAttributes: ( attrs: Partial< PaginationAttributes > ) => void;
	paginationType: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PaginationInspector( {
	attributes,
	setAttributes,
	paginationType,
}: PaginationInspectorProps ) {
	const {
		showPrevNext,
		showFirstLast,
		prevLabel,
		nextLabel,
		loadMoreLabel,
		globalClasses,
	} = attributes;

	return (
		<InspectorControls>
			{ paginationType === 'standard' && (
				<PanelBody
					title={ __( 'Standard Pagination', 'goblocks' ) }
					initialOpen
				>
					<ToggleControl
						label={ __( 'Show previous / next links', 'goblocks' ) }
						checked={ showPrevNext }
						onChange={ ( val ) =>
							setAttributes( { showPrevNext: val } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __(
							'Show first / last page links',
							'goblocks'
						) }
						checked={ showFirstLast }
						onChange={ ( val ) =>
							setAttributes( { showFirstLast: val } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
					{ showPrevNext && (
						<>
							<TextControl
								label={ __( 'Previous label', 'goblocks' ) }
								value={ prevLabel }
								placeholder={ __( '← Previous', 'goblocks' ) }
								onChange={ ( val ) =>
									setAttributes( { prevLabel: val } )
								}
								// @ts-ignore
								__nextHasNoMarginBottom
							/>
							<TextControl
								label={ __( 'Next label', 'goblocks' ) }
								value={ nextLabel }
								placeholder={ __( 'Next →', 'goblocks' ) }
								onChange={ ( val ) =>
									setAttributes( { nextLabel: val } )
								}
								// @ts-ignore
								__nextHasNoMarginBottom
							/>
						</>
					) }
				</PanelBody>
			) }

			{ paginationType === 'load-more' && (
				<PanelBody title={ __( 'Load More', 'goblocks' ) } initialOpen>
					<TextControl
						label={ __( 'Button label', 'goblocks' ) }
						value={ loadMoreLabel }
						placeholder={ __( 'Load More', 'goblocks' ) }
						onChange={ ( val ) =>
							setAttributes( { loadMoreLabel: val } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			) }

			{ paginationType === 'infinite' && (
				<PanelBody
					title={ __( 'Infinite Scroll', 'goblocks' ) }
					initialOpen
				>
					<p style={ { margin: 0, color: '#888', fontSize: '12px' } }>
						{ __(
							'Next page loads automatically when the user scrolls to the bottom of the list.',
							'goblocks'
						) }
					</p>
				</PanelBody>
			) }

			<PanelBody
				title={ __( 'Advanced', 'goblocks' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'Additional CSS classes', 'goblocks' ) }
					value={ ( globalClasses ?? [] ).join( ' ' ) }
					help={ __(
						'Space-separated list of extra classes.',
						'goblocks'
					) }
					onChange={ ( val ) =>
						setAttributes( {
							globalClasses: val.split( /\s+/ ).filter( Boolean ),
						} )
					}
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
			</PanelBody>
		</InspectorControls>
	);
}
