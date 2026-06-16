/**
 * Preset shape divider SVG library.
 *
 * Each shape is a full SVG string designed to span 100% width.
 * Use viewBox="0 0 1440 80" and preserveAspectRatio="none" so they
 * stretch edge-to-edge at any container width.
 *
 * PHP echo these directly (sanitized via SvgSanitizer before first save).
 */

export interface ShapeDefinition {
	slug: string;
	label: string;
	/** The path/shape data inside <svg> (no outer wrapper). */
	inner: string;
	/** Default viewBox width. */
	width: number;
	/** Default viewBox height. */
	height: number;
}

const SHAPES: ShapeDefinition[] = [
	{
		slug: 'wave',
		label: 'Wave',
		width: 1440,
		height: 80,
		inner: '<path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'wave-2',
		label: 'Double Wave',
		width: 1440,
		height: 80,
		inner: '<path d="M0,20 C180,60 360,-20 540,20 C720,60 900,-20 1080,20 C1260,60 1350,0 1440,20 L1440,80 L0,80 Z" fill="currentColor" opacity="0.4"/><path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'triangle',
		label: 'Triangle',
		width: 1440,
		height: 80,
		inner: '<path d="M720,0 L1440,80 L0,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'triangle-asymmetric',
		label: 'Triangle Asymmetric',
		width: 1440,
		height: 80,
		inner: '<path d="M0,0 L1440,80 L0,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'diagonal',
		label: 'Diagonal',
		width: 1440,
		height: 80,
		inner: '<path d="M0,80 L1440,0 L1440,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'curved',
		label: 'Curved',
		width: 1440,
		height: 80,
		inner: '<path d="M0,80 Q720,-40 1440,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'curved-up',
		label: 'Curved Up',
		width: 1440,
		height: 80,
		inner: '<path d="M0,0 Q720,120 1440,0 L1440,80 L0,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'mountains',
		label: 'Mountains',
		width: 1440,
		height: 80,
		inner: '<path d="M0,80 L360,10 L720,55 L1080,10 L1440,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'staircase',
		label: 'Staircase',
		width: 1440,
		height: 80,
		inner: '<path d="M0,80 L0,60 L360,60 L360,40 L720,40 L720,20 L1080,20 L1080,0 L1440,0 L1440,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'tilt',
		label: 'Tilt',
		width: 1440,
		height: 80,
		inner: '<path d="M1440,0 L0,80 L0,0 Z" fill="currentColor" opacity="0.4"/><path d="M0,80 L1440,0 L1440,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'clouds',
		label: 'Clouds',
		width: 1440,
		height: 80,
		inner: '<path d="M0,60 C120,60 120,20 240,20 C360,20 360,60 480,60 C600,60 600,20 720,20 C840,20 840,60 960,60 C1080,60 1080,20 1200,20 C1320,20 1320,60 1440,60 L1440,80 L0,80 Z" fill="currentColor"/>',
	},
	{
		slug: 'zigzag',
		label: 'Zigzag',
		width: 1440,
		height: 80,
		inner: '<path d="M0,40 L120,0 L240,40 L360,0 L480,40 L600,0 L720,40 L840,0 L960,40 L1080,0 L1200,40 L1320,0 L1440,40 L1440,80 L0,80 Z" fill="currentColor"/>',
	},
];

export default SHAPES;

export const SHAPE_MAP: Record< string, ShapeDefinition > = Object.fromEntries(
	SHAPES.map( ( s ) => [ s.slug, s ] )
);

export function buildShapeSvg(
	shape: ShapeDefinition,
	color = 'currentColor',
	height = shape.height,
	flipX = false,
	flipY = false
): string {
	const transform =
		flipX || flipY
			? ` transform="scale(${ flipX ? -1 : 1 },${
					flipY ? -1 : 1
			  }) translate(${ flipX ? -shape.width : 0 },${
					flipY ? -height : 0
			  })"`
			: '';

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ shape.width } ${ shape.height }" preserveAspectRatio="none" width="100%" height="${ height }" aria-hidden="true" style="color:${ color };display:block"><g${ transform }>${ shape.inner }</g></svg>`;
}
