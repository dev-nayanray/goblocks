import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { TextControl, Spinner, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { copySmall } from '@wordpress/icons';

interface PatternItem {
	slug: string;
	title: string;
	description: string;
	categories: string[];
	keywords: string[];
	viewport_width: number;
	inserter: boolean;
	content: string;
}

export function PatternsApp(): JSX.Element {
	const [ patterns, setPatterns ] = useState< PatternItem[] >( [] );
	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( '' );
	const [ search, setSearch ] = useState( '' );
	const [ copied, setCopied ] = useState( '' );

	useEffect( () => {
		apiFetch< PatternItem[] >( { path: '/goblocks/v1/patterns' } )
			.then( ( data ) => {
				setPatterns( data );
				setLoading( false );
			} )
			.catch( () => {
				setError(
					__(
						'Failed to load patterns. Please refresh and try again.',
						'goblocks'
					)
				);
				setLoading( false );
			} );
	}, [] );

	const filtered = search.trim()
		? patterns.filter( ( p ) => {
				const q = search.toLowerCase();
				return (
					p.title.toLowerCase().includes( q ) ||
					p.description.toLowerCase().includes( q ) ||
					p.keywords.some( ( k ) => k.toLowerCase().includes( q ) )
				);
		  } )
		: patterns;

	const handleCopy = ( pattern: PatternItem ): void => {
		navigator.clipboard.writeText( pattern.content ).then( () => {
			setCopied( pattern.slug );
			setTimeout( () => setCopied( '' ), 2000 );
		} );
	};

	return (
		<div className="gb-patterns wrap">
			<div className="gb-patterns__header">
				<h1 className="wp-heading-inline">
					{ __( 'GoBlocks Pattern Library', 'goblocks' ) }
				</h1>
				<p className="description">
					{ __(
						"Insert these patterns from the block editor's pattern inserter, or copy the block markup below.",
						'goblocks'
					) }
				</p>

				<div className="gb-patterns__search">
					<TextControl
						placeholder={ __( 'Search patterns…', 'goblocks' ) }
						value={ search }
						onChange={ setSearch }
						// @ts-ignore -- WP 6.6+ prop
						__nextHasNoMarginBottom
					/>
				</div>
			</div>

			{ loading && (
				<div className="gb-patterns__loading">
					<Spinner />
					<span>{ __( 'Loading patterns…', 'goblocks' ) }</span>
				</div>
			) }

			{ error && (
				<div className="notice notice-error">
					<p>{ error }</p>
				</div>
			) }

			{ ! loading && ! error && (
				<div className="gb-patterns__grid">
					{ filtered.map( ( pattern ) => (
						<div key={ pattern.slug } className="gb-patterns__item">
							<div
								className="gb-patterns__preview"
								aria-hidden="true"
							>
								<span className="gb-patterns__preview-letter">
									{ pattern.title.charAt( 0 ).toUpperCase() }
								</span>
							</div>

							<div className="gb-patterns__meta">
								<strong className="gb-patterns__title">
									{ pattern.title }
								</strong>

								{ pattern.description && (
									<p className="gb-patterns__description">
										{ pattern.description }
									</p>
								) }

								<div className="gb-patterns__footer">
									<div className="gb-patterns__categories">
										{ pattern.categories.map( ( cat ) => (
											<span
												key={ cat }
												className="gb-patterns__tag"
											>
												{ cat }
											</span>
										) ) }
									</div>

									<Button
										icon={ copySmall }
										size="small"
										variant="secondary"
										onClick={ () => handleCopy( pattern ) }
										label={ __(
											'Copy block markup',
											'goblocks'
										) }
									>
										{ copied === pattern.slug
											? __( 'Copied!', 'goblocks' )
											: __( 'Copy markup', 'goblocks' ) }
									</Button>
								</div>
							</div>
						</div>
					) ) }
				</div>
			) }

			{ ! loading && ! error && filtered.length === 0 && (
				<p className="gb-patterns__empty">
					{ search
						? __( 'No patterns match your search.', 'goblocks' )
						: __( 'No patterns registered yet.', 'goblocks' ) }
				</p>
			) }
		</div>
	);
}
