import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';

import { useCssEngine } from '../../hooks/useCssEngine';
import { clsx } from '../../utils/classNames';
import { GridInspector } from './components/Inspector';
import type { BlockStyles } from '../../types/styles';

// ── Attribute type ────────────────────────────────────────────────────────

interface GridBlockAttributes {
	uniqueId: string;
	tagName: string;
	styles: BlockStyles;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	dynamicContent: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
}

// ── Unique ID generator ───────────────────────────────────────────────────

function makeUniqueId( clientId: string ): string {
	return clientId.replace( /-/g, '' ).slice( 0, 8 );
}

// ── Tag toolbar options ───────────────────────────────────────────────────

const TAG_OPTIONS = [
	{ title: 'div', value: 'div' },
	{ title: 'section', value: 'section' },
	{ title: 'article', value: 'article' },
	{ title: 'ul', value: 'ul' },
	{ title: 'ol', value: 'ol' },
];

// ── Inner blocks template ─────────────────────────────────────────────────

const INNER_TEMPLATE: [ string, Record< string, unknown > ][] = [
	[ 'goblocks/box', {} ],
	[ 'goblocks/box', {} ],
	[ 'goblocks/box', {} ],
];

// ── Edit component ────────────────────────────────────────────────────────

export function Edit( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< GridBlockAttributes > ) {
	const { uniqueId, tagName, styles, globalClasses } = attributes;

	// Assign uniqueId once on first insertion.
	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	// CSS generation + injection into editor <head>.
	useCssEngine( {
		blockSlug: 'grid',
		uniqueId,
		styles,
		setAttributes: ( patch ) =>
			setAttributes( patch as Partial< GridBlockAttributes > ),
	} );

	// Selector must match CssEngine: .gb-grid-{uniqueId}
	const wrapperClass = clsx(
		'gb-grid',
		uniqueId && `gb-grid-${ uniqueId }`,
		...( globalClasses ?? [] )
	);

	const blockProps = useBlockProps( { className: wrapperClass } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: InnerBlocks.ButtonBlockAppender,
		template: INNER_TEMPLATE,
		templateLock: false,
	} );

	const Tag = ( tagName || 'div' ) as keyof JSX.IntrinsicElements;

	return (
		<>
			{ /* Tag switcher */ }
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						label={
							__( 'Tag: ', 'goblocks' ) + ( tagName || 'div' )
						}
						text={ tagName || 'div' }
						controls={ TAG_OPTIONS.map( ( t ) => ( {
							title: t.title,
							isActive: t.value === tagName,
							onClick: () =>
								setAttributes( { tagName: t.value } ),
						} ) ) }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ /* Inspector Controls */ }
			<GridInspector
				attributes={ attributes as any }
				setAttributes={ setAttributes as any }
			/>

			{ /* Grid container with inner blocks */ }
			<Tag { ...innerBlocksProps } />
		</>
	);
}
