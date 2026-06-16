import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NoResultsAttributes {}

const DEFAULT_TEMPLATE: [ string, Record< string, unknown > ][] = [
	[ 'goblocks/text', { content: __( 'No posts were found.', 'goblocks' ) } ],
];

export function Edit( _props: BlockEditProps< NoResultsAttributes > ) {
	const blockProps = useBlockProps( { className: 'gb-query-no-results' } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: DEFAULT_TEMPLATE,
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<p
				style={ {
					margin: '0 0 8px',
					padding: '4px 8px',
					background: '#fff3cd',
					borderLeft: '3px solid #f59e0b',
					fontSize: '11px',
					fontWeight: 600,
					textTransform: 'uppercase',
					letterSpacing: '0.05em',
					color: '#92400e',
				} }
			>
				{ __( 'No Results — shown only when query returns 0 posts', 'goblocks' ) }
			</p>
			<div { ...innerBlocksProps } />
		</>
	);
}
