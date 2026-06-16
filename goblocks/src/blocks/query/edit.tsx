import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';

import { clsx } from '../../utils/classNames';
import { QueryInspector } from './components/Inspector';
import { QUERY_DEFAULTS } from '../../types/query';
import type { QueryAttributes } from '../../types/query';

// ── Attribute type ─────────────────────────────────────────────────────────────

interface QueryBlockAttributes {
	uniqueId: string;
	query: QueryAttributes;
	paginationType: string;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeUniqueId( clientId: string ): string {
	return clientId.replace( /-/g, '' ).slice( 0, 8 );
}

// ── Default inner block template ───────────────────────────────────────────────

const INNER_TEMPLATE: [ string, Record< string, unknown > ][] = [
	[ 'goblocks/query-loop', {} ],
	[ 'goblocks/pagination', {} ],
];

// ── Edit component ────────────────────────────────────────────────────────────

export function Edit( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< QueryBlockAttributes > ) {
	const { uniqueId, query, paginationType, globalClasses } = attributes;

	const mergedQuery: QueryAttributes = { ...QUERY_DEFAULTS, ...query };

	// Assign uniqueId once on first insertion.
	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	const wrapperClass = clsx(
		'gb-query',
		uniqueId && `gb-query-${ uniqueId }`,
		...( globalClasses ?? [] )
	);

	const blockProps = useBlockProps( { className: wrapperClass } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: INNER_TEMPLATE,
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<QueryInspector
				query={ mergedQuery }
				paginationType={ paginationType ?? 'standard' }
				globalClasses={ globalClasses ?? [] }
				setQuery={ ( patch ) =>
					setAttributes( { query: { ...mergedQuery, ...patch } } )
				}
				setPagination={ ( type ) =>
					setAttributes( { paginationType: type } )
				}
				setGlobalClasses={ ( classes ) =>
					setAttributes( { globalClasses: classes } )
				}
			/>

			<div { ...innerBlocksProps } />
		</>
	);
}
