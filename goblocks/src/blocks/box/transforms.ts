/**
 * Box block — block transforms.
 *
 * FROM: core/group → goblocks/box  (common migration path)
 * FROM: core/cover → goblocks/box
 * TO:   goblocks/box → core/group
 */

import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block' as const,
			blocks: [ 'core/group' ],
			transform(
				attributes: Record< string, unknown >,
				innerBlocks: unknown[]
			) {
				return createBlock( 'goblocks/box', {}, innerBlocks );
			},
		},
		{
			type: 'block' as const,
			blocks: [ 'core/cover' ],
			transform(
				_attributes: Record< string, unknown >,
				innerBlocks: unknown[]
			) {
				return createBlock( 'goblocks/box', {}, innerBlocks );
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
