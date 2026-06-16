/**
 * Box block — Edit component.
 *
 * Renders the block in the Gutenberg editor with:
 *  - InnerBlocks for nested content
 *  - CSS generation via useCssEngine (debounced, injected into editor DOM)
 *  - Full InspectorControls via BoxInspector
 *  - BlockControls toolbar with tag name quick-select
 */

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
import { BoxInspector } from './components/Inspector';
import type { BlockStyles } from '../../types/styles';

// ── Attribute type ────────────────────────────────────────────────────────

interface BoxBlockAttributes {
	uniqueId: string;
	tagName: string;
	styles: BlockStyles;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	dynamicContent: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
	link: string;
	linkTarget: string;
	linkRel: string;
	ariaLabel: string;
	animationClass: string;
}

// ── Unique ID generator ───────────────────────────────────────────────────

function makeUniqueId( clientId: string ): string {
	return clientId.replace( /-/g, '' ).slice( 0, 8 );
}

// ── Tag toolbar options ───────────────────────────────────────────────────

const SEMANTIC_TAGS = [
	{ title: 'div', value: 'div' },
	{ title: 'section', value: 'section' },
	{ title: 'article', value: 'article' },
	{ title: 'aside', value: 'aside' },
	{ title: 'header', value: 'header' },
	{ title: 'footer', value: 'footer' },
	{ title: 'nav', value: 'nav' },
	{ title: 'main', value: 'main' },
];

// ── Edit component ────────────────────────────────────────────────────────

export function Edit( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< BoxBlockAttributes > ) {
	const { uniqueId, tagName, styles, globalClasses, animationClass } =
		attributes;

	// Assign uniqueId once on first insertion.
	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	// CSS generation + injection.
	useCssEngine( {
		blockSlug: 'box',
		uniqueId,
		styles,
		setAttributes: ( patch ) =>
			setAttributes( patch as Partial< BoxBlockAttributes > ),
	} );

	// Build the wrapper class string.  Selector must match CssEngine: .gb-box-{uniqueId}
	const wrapperClass = clsx(
		'gb-box',
		uniqueId && `gb-box-${ uniqueId }`,
		...( globalClasses ?? [] ),
		animationClass || undefined
	);

	// Block props (Gutenberg editor wrapper).
	const blockProps = useBlockProps( {
		className: wrapperClass,
	} );

	// Inner blocks props — makes this block a container.
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: InnerBlocks.ButtonBlockAppender,
		template: [
			[
				'goblocks/text',
				{ placeholder: __( 'Start writing…', 'goblocks' ) },
			],
		],
	} );

	const Tag = ( tagName || 'div' ) as keyof JSX.IntrinsicElements;

	return (
		<>
			{ /* Toolbar: tag name quick-switch */ }
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						label={
							__( 'Tag: ', 'goblocks' ) + ( tagName || 'div' )
						}
						text={ tagName || 'div' }
						controls={ SEMANTIC_TAGS.map( ( t ) => ( {
							title: t.title,
							isActive: t.value === tagName,
							onClick: () =>
								setAttributes( { tagName: t.value } ),
						} ) ) }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ /* Inspector Controls */ }
			<BoxInspector
				attributes={ attributes as any }
				setAttributes={ setAttributes as any }
			/>

			{ /* Block output */ }
			<Tag { ...innerBlocksProps } />
		</>
	);
}
