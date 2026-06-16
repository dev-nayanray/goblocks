import { useEffect } from '@wordpress/element';
import {
	MediaUpload,
	MediaPlaceholder,
	RichText,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';

import { useCssEngine } from '../../hooks/useCssEngine';
import { clsx } from '../../utils/classNames';
import { ImageInspector } from './components/Inspector';
import type { BlockStyles } from '../../types/styles';

// ── Attribute type ────────────────────────────────────────────────────────

interface ImageBlockAttributes {
	uniqueId: string;
	mediaId: number;
	mediaUrl: string;
	mediaAlt: string;
	mediaWidth: number;
	mediaHeight: number;
	sizeSlug: string;
	caption: string;
	showCaption: boolean;
	href: string;
	target: string;
	rel: string;
	styles: BlockStyles;
	globalClasses: string[];
	htmlAttributes: Record< string, string >;
	dynamicContent: Record< string, string >;
	generatedCss: string;
	blockVersion: number;
}

// ── Media object shape from MediaUpload / MediaPlaceholder ────────────────

interface WPMedia {
	id?: number;
	url?: string;
	alt?: string;
	width?: number;
	height?: number;
}

// ── Unique ID generator ───────────────────────────────────────────────────

function makeUniqueId( clientId: string ): string {
	return clientId.replace( /-/g, '' ).slice( 0, 8 );
}

// ── Edit component ────────────────────────────────────────────────────────

export function Edit( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< ImageBlockAttributes > ) {
	const {
		uniqueId,
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		caption,
		showCaption,
		styles,
		globalClasses,
	} = attributes;

	// Assign uniqueId once on first insertion.
	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: makeUniqueId( clientId ) } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	// CSS generation + injection into editor <head>.
	useCssEngine( {
		blockSlug: 'image',
		uniqueId,
		styles,
		setAttributes: ( patch ) =>
			setAttributes( patch as Partial< ImageBlockAttributes > ),
	} );

	// Selector must match CssEngine: .gb-image-{uniqueId}
	const wrapperClass = clsx(
		'gb-image',
		uniqueId && `gb-image-${ uniqueId }`,
		...( globalClasses ?? [] )
	);

	const blockProps = useBlockProps( { className: wrapperClass } );

	const hasMedia = !! ( mediaId || mediaUrl );

	function onSelectMedia( media: WPMedia ) {
		setAttributes( {
			mediaId: media.id ?? 0,
			mediaUrl: media.url ?? '',
			mediaAlt: media.alt ?? '',
			mediaWidth: media.width ?? 0,
			mediaHeight: media.height ?? 0,
		} );
	}

	function onSelectURL( url: string ) {
		setAttributes( { mediaUrl: url, mediaId: 0, mediaAlt: '' } );
	}

	return (
		<>
			{ /* Replace / link toolbar — only when an image is selected */ }
			{ hasMedia && (
				<BlockControls group="other">
					<ToolbarGroup>
						<MediaUpload
							onSelect={ onSelectMedia }
							allowedTypes={ [ 'image' ] }
							value={ mediaId }
							render={ ( { open } ) => (
								<ToolbarButton
									icon="edit"
									label={ __( 'Replace image', 'goblocks' ) }
									onClick={ open }
								/>
							) }
						/>
						{ mediaId ? (
							<ToolbarButton
								icon="trash"
								label={ __( 'Remove image', 'goblocks' ) }
								onClick={ () =>
									setAttributes( {
										mediaId: 0,
										mediaUrl: '',
										mediaAlt: '',
										mediaWidth: 0,
										mediaHeight: 0,
									} )
								}
							/>
						) : null }
					</ToolbarGroup>
				</BlockControls>
			) }

			{ /* Inspector Controls */ }
			<ImageInspector
				attributes={ attributes as any }
				setAttributes={ setAttributes as any }
			/>

			{ /* Block output */ }
			<figure { ...blockProps }>
				{ hasMedia ? (
					<>
						<img
							className="gb-image__img"
							src={ mediaUrl }
							alt={ mediaAlt }
							width={ mediaWidth || undefined }
							height={ mediaHeight || undefined }
						/>
						{ showCaption && (
							<RichText
								tagName="figcaption"
								className="gb-image__caption"
								value={ caption }
								onChange={ ( value ) =>
									setAttributes( { caption: value } )
								}
								placeholder={ __( 'Caption…', 'goblocks' ) }
								allowedFormats={ [
									'core/bold',
									'core/italic',
									'core/link',
								] }
							/>
						) }
					</>
				) : (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image', 'goblocks' ) } }
						onSelect={ onSelectMedia }
						onSelectURL={ onSelectURL }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				) }
			</figure>
		</>
	);
}
