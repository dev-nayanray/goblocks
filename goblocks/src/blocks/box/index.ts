/**
 * Box block — registration entry point.
 *
 * Registers the goblocks/box block type with the WordPress block editor.
 * Metadata (attributes, supports, etc.) is read from block.json.
 */

import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import { Edit } from './edit';
import { save } from './save';
import transforms from './transforms';

registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save,
	transforms,
} );
