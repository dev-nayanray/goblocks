import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

import { clsx } from '../../utils/classNames';
import { ShapeInspector } from './components/Inspector';
import { SHAPE_MAP, buildShapeSvg } from './shapes';
import type { ShapeDefinition } from './shapes/index';

// ── Attribute type ─────────────────────────────────────────────────────────────

interface ShapeBlockAttributes {
	uniqueId: string;
	shapeSlug: string;
	fillColor: string;
	shapeHeight: number;
	flipX: boolean;
	flipY: boolean;
	placement: string;
	styles: Record< string, unknown >;
	globalClasses: string[];
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
}: BlockEditProps< ShapeBlockAttributes > ) {
	const {
		uniqueId,
		shapeSlug,
		fillColor,
		shapeHeight,
		flipX,
		flipY,
		placement,
		globalClasses,
	} = attributes;

	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	const shape = ( SHAPE_MAP[ shapeSlug ] ??
		SHAPE_MAP.wave ) as ShapeDefinition;

	const wrapperClass = clsx(
		'gb-shape',
		uniqueId && `gb-shape-${ uniqueId }`,
		`gb-shape--${ placement }`,
		...( globalClasses ?? [] )
	);

	const blockProps = useBlockProps( {
		className: wrapperClass,
		style: { lineHeight: '0', display: 'block' },
	} );

	const svgMarkup = buildShapeSvg(
		shape,
		fillColor,
		shapeHeight,
		flipX,
		flipY
	);

	return (
		<>
			<ShapeInspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div { ...blockProps }>
				<div
					dangerouslySetInnerHTML={ { __html: svgMarkup } }
					style={ { pointerEvents: 'none', userSelect: 'none' } }
				/>
			</div>
		</>
	);
}
