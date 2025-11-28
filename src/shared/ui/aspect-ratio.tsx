'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

/**
 * Aspect Ratio Component
 *
 * Displays content within a desired ratio.
 * Built on top of @radix-ui/react-aspect-ratio for accessibility.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="..." alt="..." className="object-cover" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
