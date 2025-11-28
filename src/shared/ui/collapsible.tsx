'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

/**
 * Collapsible Component
 *
 * An interactive component which expands/collapses a panel.
 * Built on top of @radix-ui/react-collapsible for accessibility.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     Hidden content
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
