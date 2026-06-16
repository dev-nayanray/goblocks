import './style.css';

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
