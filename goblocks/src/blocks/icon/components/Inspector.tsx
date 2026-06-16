import { useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	TextareaControl,
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { IconPicker } from './IconPicker';
import { iconToSvg } from '../icons';
import type { BlockStyles } from '../../../types/styles';

// ── Types ─────────────────────────────────────────────────────────────────────

interface IconAttributes {
	iconSlug: string;
	svgContent: string;
	iconSize: number;
	ariaHidden: boolean;
	ariaLabel: string;
	link: string;
	linkTarget: string;
	linkRel: string;
	styles: BlockStyles;
	globalClasses: string[];
}

interface IconInspectorProps {
	attributes: IconAttributes;
	setAttributes: ( attrs: Partial< IconAttributes > ) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TARGET_OPTIONS = [
	{ label: __( 'Same tab', 'goblocks' ), value: '_self' },
	{ label: __( 'New tab', 'goblocks' ), value: '_blank' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function IconInspector( {
	attributes,
	setAttributes,
}: IconInspectorProps ) {
	const {
		iconSlug,
		svgContent,
		iconSize,
		ariaHidden,
		ariaLabel,
		link,
		linkTarget,
		linkRel,
		globalClasses,
	} = attributes;

	const [ showCustom, setShowCustom ] = useState(
		!! svgContent && ! iconSlug
	);

	const handleSelectIcon = ( slug: string ) => {
		setAttributes( {
			iconSlug: slug,
			svgContent: iconToSvg( slug, iconSize ),
		} );
	};

	const handleCustomSvg = ( raw: string ) => {
		setAttributes( {
			svgContent: raw,
			iconSlug: '',
		} );
	};

	return (
		<InspectorControls>
			{ /* ── Icon selection ────────────────────────────────────────── */ }
			<PanelBody title={ __( 'Icon', 'goblocks' ) } initialOpen>
				<div
					style={ {
						display: 'flex',
						gap: '8px',
						marginBottom: '12px',
					} }
				>
					<Button
						variant={ ! showCustom ? 'primary' : 'secondary' }
						size="small"
						onClick={ () => setShowCustom( false ) }
					>
						{ __( 'Library', 'goblocks' ) }
					</Button>
					<Button
						variant={ showCustom ? 'primary' : 'secondary' }
						size="small"
						onClick={ () => setShowCustom( true ) }
					>
						{ __( 'Custom SVG', 'goblocks' ) }
					</Button>
				</div>

				{ ! showCustom && (
					<IconPicker
						selected={ iconSlug }
						onSelect={ handleSelectIcon }
					/>
				) }

				{ showCustom && (
					<>
						<TextareaControl
							label={ __( 'Paste SVG markup', 'goblocks' ) }
							help={ __(
								'SVG is sanitized before saving. Script tags and event handlers are removed.',
								'goblocks'
							) }
							value={ svgContent }
							onChange={ handleCustomSvg }
							rows={ 6 }
							// @ts-ignore
							__nextHasNoMarginBottom
						/>
					</>
				) }

				<NumberControl
					label={ __( 'Size (px)', 'goblocks' ) }
					value={ iconSize }
					min={ 8 }
					max={ 512 }
					onChange={ ( val ) => {
						const size = parseInt( String( val ?? 32 ), 10 ) || 32;
						setAttributes( { iconSize: size } );
						if ( iconSlug ) {
							setAttributes( {
								svgContent: iconToSvg( iconSlug, size ),
							} );
						}
					} }
					// @ts-ignore
					__next40pxDefaultSize
				/>
			</PanelBody>

			{ /* ── Link ─────────────────────────────────────────────────── */ }
			<PanelBody title={ __( 'Link', 'goblocks' ) } initialOpen={ false }>
				<TextControl
					label={ __( 'URL', 'goblocks' ) }
					value={ link }
					type="url"
					onChange={ ( val ) => setAttributes( { link: val } ) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
				{ link && (
					<>
						<SelectControl
							label={ __( 'Open in', 'goblocks' ) }
							value={ linkTarget }
							options={ TARGET_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { linkTarget: val } )
							}
							// @ts-ignore
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Rel', 'goblocks' ) }
							value={ linkRel }
							placeholder="noopener noreferrer"
							onChange={ ( val ) =>
								setAttributes( { linkRel: val } )
							}
							// @ts-ignore
							__nextHasNoMarginBottom
						/>
					</>
				) }
			</PanelBody>

			{ /* ── Accessibility ───────────────────────────────────────────── */ }
			<PanelBody
				title={ __( 'Accessibility', 'goblocks' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __(
						'Hide from screen readers (aria-hidden)',
						'goblocks'
					) }
					help={ __(
						'Decorative icons should be hidden. Meaningful icons need an aria-label.',
						'goblocks'
					) }
					checked={ ariaHidden }
					onChange={ ( val ) => setAttributes( { ariaHidden: val } ) }
					// @ts-ignore
					__nextHasNoMarginBottom
				/>
				{ ! ariaHidden && (
					<TextControl
						label={ __( 'Aria label', 'goblocks' ) }
						value={ ariaLabel }
						onChange={ ( val ) =>
							setAttributes( { ariaLabel: val } )
						}
						// @ts-ignore
						__nextHasNoMarginBottom
					/>
				) }
			</PanelBody>

			{ /* ── Advanced ─────────────────────────────────────────────────── */ }
			<PanelBody
				title={ __( 'Advanced', 'goblocks' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'Additional CSS classes', 'goblocks' ) }
					value={ ( globalClasses ?? [] ).join( ' ' ) }
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
