import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block' as const,
			blocks: [ 'core/columns' ],
			transform(
				_attributes: Record< string, unknown >,
				innerBlocks: unknown[]
			) {
				return createBlock( 'goblocks/grid', {}, innerBlocks );
			},
		},
	],
	to: [
		{
			type: 'block' as const,
			blocks: [ 'core/group' ],
			transform(
				_attributes: Record< string, unknown >,
				innerBlocks: unknown[]
			) {
				return createBlock( 'core/group', {}, innerBlocks );
			},
		},
	],
};

export default transforms;
