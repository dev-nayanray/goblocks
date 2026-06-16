/**
 * Tabs block — frontend view script (vanilla JS, no React).
 *
 * Handles:
 *  - Click on tab button → activate tab + panel
 *  - Arrow Left/Right (or Up/Down for vertical) → move focus
 *  - Home / End → jump to first / last tab
 *
 * Runs only when the block is present on the page (enqueued via viewScript
 * in block.json by WordPress automatically).
 */

( function () {
	'use strict';

	interface TabsEl extends HTMLElement {
		dataset: { orientation?: string };
	}

	function initTabs( tabsEl: TabsEl ): void {
		const tablist =
			tabsEl.querySelector< HTMLElement >( '[role="tablist"]' );
		if ( ! tablist ) {
			return;
		}

		const buttons = Array.from(
			tabsEl.querySelectorAll< HTMLButtonElement >( '[role="tab"]' )
		);

		if ( ! buttons.length ) {
			return;
		}

		const panels = Array.from(
			tabsEl.querySelectorAll< HTMLElement >( '[role="tabpanel"]' )
		);

		function activate( btn: HTMLButtonElement ): void {
			buttons.forEach( ( b ) => {
				const active = b === btn;
				b.setAttribute( 'aria-selected', active ? 'true' : 'false' );
				b.setAttribute( 'tabindex', active ? '0' : '-1' );
				b.classList.toggle( 'is-active', active );
			} );
			panels.forEach( ( p ) => {
				const active = p.id === btn.getAttribute( 'aria-controls' );
				p.classList.toggle( 'is-active', active );
				if ( active ) {
					p.removeAttribute( 'hidden' );
				} else {
					p.setAttribute( 'hidden', '' );
				}
			} );
		}

		// Click.
		tablist.addEventListener( 'click', ( e ) => {
			const btn = (
				e.target as HTMLElement
			 ).closest< HTMLButtonElement >( '[role="tab"]' );
			if ( btn ) {
				activate( btn );
				btn.focus();
			}
		} );

		// Keyboard.
		tablist.addEventListener( 'keydown', ( e ) => {
			const idx = buttons.indexOf(
				tablist.ownerDocument.activeElement as HTMLButtonElement
			);
			if ( idx === -1 ) {
				return;
			}

			const vertical = tabsEl.dataset.orientation === 'vertical';
			const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
			const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
			let target = -1;

			switch ( e.key ) {
				case prevKey:
					target = ( idx - 1 + buttons.length ) % buttons.length;
					break;
				case nextKey:
					target = ( idx + 1 ) % buttons.length;
					break;
				case 'Home':
					target = 0;
					break;
				case 'End':
					target = buttons.length - 1;
					break;
				default:
					return;
			}

			e.preventDefault();
			const targetBtn = buttons[ target ];
			if ( targetBtn ) {
				targetBtn.focus();
				activate( targetBtn );
			}
		} );
	}

	document.querySelectorAll< TabsEl >( '.gb-tabs' ).forEach( initTabs );
} )();
