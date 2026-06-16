/**
 * useCssEngine — React hook for CSS generation in the block editor.
 *
 * Runs the CSS pipeline whenever `attributes.styles` changes, then:
 *  1. Stores the result in `attributes.generatedCss` via setAttributes.
 *  2. Injects a `<style>` tag into the editor iframe so the preview updates.
 *
 * Debounced at 100 ms to prevent thrash during slider drag.
 *
 * The injected <style> tag uses `data-gb-id` as a key so it is replaced,
 * not appended, on each update. It is removed on unmount.
 */

import { useEffect, useRef, useCallback } from '@wordpress/element';
import type { BlockStyles } from '../types/styles';
import { buildBlockCss } from '../utils/css/CssEngine';

// ── Types ─────────────────────────────────────────────────────────────────

interface UseCssEngineOptions {
	/** Block name without namespace, e.g. 'box'. */
	blockSlug: string;

	/** The block's `uniqueId` attribute. */
	uniqueId: string;

	/** The block's `styles` attribute object. */
	styles: BlockStyles;

	/**
	 * The block's setAttributes function.
	 * Called with `{ generatedCss }` on each CSS change.
	 */
	setAttributes: ( attrs: { generatedCss: string } ) => void;

	/** Debounce delay in ms. Default: 100. */
	debounce?: number;
}

// ── StyleTag manager ──────────────────────────────────────────────────────

function getOrCreateStyleTag( id: string ): HTMLStyleElement {
	const existing = document.querySelector< HTMLStyleElement >(
		`[data-gb-id="${ id }"]`
	);
	if ( existing ) {
		return existing;
	}

	const el = document.createElement( 'style' );
	el.setAttribute( 'data-gb-id', id );
	document.head.appendChild( el );
	return el;
}

function removeStyleTag( id: string ): void {
	const el = document.querySelector( `[data-gb-id="${ id }"]` );
	el?.parentNode?.removeChild( el );
}

// ── Hook ──────────────────────────────────────────────────────────────────

/**
 * @param root0
 * @param root0.blockSlug
 * @param root0.uniqueId
 * @param root0.styles
 * @param root0.setAttributes
 * @param root0.debounce
 * @example
 * // In edit.tsx:
 * useCssEngine({ blockSlug: 'box', uniqueId, styles: attributes.styles, setAttributes });
 */
export function useCssEngine( {
	blockSlug,
	uniqueId,
	styles,
	setAttributes,
	debounce: debounceMs = 100,
}: UseCssEngineOptions ): void {
	const timerRef = useRef< ReturnType< typeof setTimeout > | null >( null );
	const prevCssRef = useRef< string >( '' );
	const styleTagId = `gb-style-${ uniqueId }`;

	// Stable CSS builder — doesn't cause re-renders.
	const buildAndApply = useCallback( () => {
		if ( ! uniqueId ) {
			return;
		}

		const css = buildBlockCss( styles, blockSlug, uniqueId );

		// Skip DOM + setAttributes update if CSS hasn't changed.
		if ( css === prevCssRef.current ) {
			return;
		}
		prevCssRef.current = css;

		// Inject/replace <style> in the editor document.
		const styleEl = getOrCreateStyleTag( styleTagId );
		styleEl.textContent = css;

		// Persist to block attributes.
		setAttributes( { generatedCss: css } );
	}, [ styles, blockSlug, uniqueId, setAttributes, styleTagId ] );

	// Debounced effect: re-run whenever styles change.
	useEffect( () => {
		if ( timerRef.current ) {
			clearTimeout( timerRef.current );
		}

		timerRef.current = setTimeout( buildAndApply, debounceMs );

		return () => {
			if ( timerRef.current ) {
				clearTimeout( timerRef.current );
			}
		};
	}, [ buildAndApply, debounceMs ] );

	// Cleanup <style> tag on unmount.
	useEffect( () => {
		return () => {
			if ( timerRef.current ) {
				clearTimeout( timerRef.current );
			}
			removeStyleTag( styleTagId );
		};
		// Run only on mount/unmount.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );
}
