/**
 * GoBlocks Editor Entry Point
 *
 * Loaded on every Gutenberg editor page. Responsible for:
 *  - Registering all GoBlocks block types
 *  - Injecting the BreakpointBar into the block toolbar
 *  - Wiring up the global styles sidebar panel
 *  - Registering block patterns
 *
 * Block registration is handled via each block's index.ts entry;
 * this file only registers editor-level UI extensions.
 *
 * Built to: build/editor.js + build/editor.asset.php
 */

// Global type augmentation — ensures window.goblocksEditor is typed.
import './types/block';

// Placeholder: editor plugin registrations will be added here as
// blocks and UI components are built in subsequent steps.
