import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

import { useCssEngine } from '../../hooks/useCssEngine';
import { clsx } from '../../utils/classNames';
import { IconInspector } from './components/Inspector';
import { iconToSvg } from './icons';
import type { BlockStyles } from '../../types/styles';

// ── Attribute type ─────────────────────────────────────────────────────────────

interface IconBlockAttributes {
	uniqueId: string;
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
	htmlAttributes: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeUniqueId( clientId: string ): string {
	return clientId.replace( /-/g, '' ).slice( 0, 8 );
}

// ── Edit component ─────────────────────────────────────────────────────────────

export function Edit( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< IconBlockAttributes > ) {
	const {
		uniqueId,
		iconSlug,
		svgContent,
		iconSize,
		ariaHidden,
		ariaLabel,
		link,
		styles,
		globalClasses,
	} = attributes;

	// Assign uniqueId once on first insertion.
	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
		// Set default icon SVG if nothing is stored yet.
		if ( ! svgContent && iconSlug ) {
			setAttributes( { svgContent: iconToSvg( iconSlug, iconSize ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	useCssEngine( {
		blockSlug: 'icon',
		uniqueId,
		styles,
		setAttributes: ( patch ) =>
			setAttributes( patch as Partial< IconBlockAttributes > ),
	} );

	const wrapperClass = clsx(
		'gb-icon',
		uniqueId && `gb-icon-${ uniqueId }`,
		...( globalClasses ?? [] )
	);

	const blockProps = useBlockProps( { className: wrapperClass } );

	const resolvedSvg = svgContent || iconToSvg( iconSlug || 'star', iconSize );

	const svgEl = (
		<span
			className="gb-icon__svg"
			aria-hidden={ ariaHidden ? 'true' : undefined }
			aria-label={ ! ariaHidden && ariaLabel ? ariaLabel : undefined }
			dangerouslySetInnerHTML={ { __html: resolvedSvg } }
		/>
	);

	return (
		<>
			<IconInspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div { ...blockProps }>
				{ link ? (
					// Render as <span> in editor to prevent accidental navigation.
					<span
						className="gb-icon__link"
						style={ { cursor: 'pointer' } }
					>
						{ svgEl }
					</span>
				) : (
					svgEl
				) }
			</div>
		</>
	);
}
