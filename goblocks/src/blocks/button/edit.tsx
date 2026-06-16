import { useEffect } from '@wordpress/element';
import {
	RichText,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';

import { useCssEngine } from '../../hooks/useCssEngine';
import { clsx } from '../../utils/classNames';
import { ButtonInspector } from './components/Inspector';
import type { BlockStyles } from '../../types/styles';

// ── Attribute type ────────────────────────────────────────────────────────

interface ButtonBlockAttributes {
	uniqueId: string;
	tagName: string;
	text: string;
	styles: BlockStyles;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	dynamicContent: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
	href: string;
	target: string;
	rel: string;
	download: boolean;
	buttonType: string;
	ariaLabel: string;
}

// ── Unique ID generator ───────────────────────────────────────────────────

function makeUniqueId( clientId: string ): string {
	return clientId.replace( /-/g, '' ).slice( 0, 8 );
}

// ── Allowed rich-text formats ─────────────────────────────────────────────

const ALLOWED_FORMATS = [ 'core/bold', 'core/italic' ];

// ── Element switcher toolbar options ─────────────────────────────────────

const TAG_OPTIONS = [
	{ title: '<a> Link', value: 'a' },
	{ title: '<button>', value: 'button' },
];

// ── Edit component ────────────────────────────────────────────────────────

export function Edit( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< ButtonBlockAttributes > ) {
	const { uniqueId, tagName, text, styles, globalClasses } = attributes;

	// Assign uniqueId once on first insertion.
	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	// CSS generation + injection into editor <head>.
	useCssEngine( {
		blockSlug: 'button',
		uniqueId,
		styles,
		setAttributes: ( patch ) =>
			setAttributes( patch as Partial< ButtonBlockAttributes > ),
	} );

	// Selector must match CssEngine: .gb-button-{uniqueId}
	const wrapperClass = clsx(
		'gb-button',
		uniqueId && `gb-button-${ uniqueId }`,
		...( globalClasses ?? [] )
	);

	const blockProps = useBlockProps( { className: wrapperClass } );
	const Tag = ( tagName || 'a' ) as keyof JSX.IntrinsicElements;

	return (
		<>
			{ /* Element type switcher */ }
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						label={ __( 'Element', 'goblocks' ) }
						text={ tagName || 'a' }
						controls={ TAG_OPTIONS.map( ( opt ) => ( {
							title: opt.title,
							isActive: opt.value === tagName,
							onClick: () =>
								setAttributes( { tagName: opt.value } ),
						} ) ) }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ /* Inspector Controls */ }
			<ButtonInspector
				attributes={ attributes as any }
				setAttributes={ setAttributes as any }
			/>

			{ /*
			 * Outer element carries blockProps (editor wrapper metadata).
			 * No href in editor — prevents accidental navigation.
			 * RichText inside span for clean BEM structure and future icon slots.
			 */ }
			<Tag { ...blockProps }>
				<RichText
					tagName="span"
					className="gb-button__text"
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Button text…', 'goblocks' ) }
					allowedFormats={ ALLOWED_FORMATS }
					withoutInteractiveFormatting
				/>
			</Tag>
		</>
	);
}
