/**
 * Example shadcn/ui Button Component Usage
 *
 * This file demonstrates how to use shadcn/ui components
 * following Diamond Standard conventions.
 *
 * Location: src/shared/ui/examples/
 */

import { Button } from '../button';

/**
 * Example component demonstrating various Button variants.
 * Part of the shared UI layer.
 *
 * This is a reference implementation showing:
 * - All available button variants
 * - Proper Diamond Standard structure
 * - TSDoc documentation
 *
 * @returns Example button showcase component
 *
 * @example
 * <ButtonExample />
 */
export function ButtonExample() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-bold">shadcn/ui Button Examples</h2>

      <div className="flex flex-wrap gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Variants</h3>
          <div className="flex gap-2">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Sizes</h3>
          <div className="flex items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔥</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">States</h3>
          <div className="flex gap-2">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">With Icons</h3>
          <div className="flex gap-2">
            <Button>
              <span>→</span> Next
            </Button>
            <Button variant="outline">← Back</Button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-muted p-4">
        <h3 className="mb-2 text-sm font-semibold">Usage:</h3>
        <pre className="text-xs">
          {`import { Button } from '@/shared/ui/button';

<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Cancel</Button>`}
        </pre>
      </div>
    </div>
  );
}

/**
 * Example of composing shadcn/ui components in a feature layer.
 *
 * This shows the Diamond Standard pattern:
 * 1. Import from shared layer
 * 2. Add business logic in feature layer
 * 3. Keep shared components pure
 */
export function FeatureButtonExample() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="p-4">
      <h3 className="mb-2 text-lg font-semibold">Feature Layer Example</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        This button adds business logic on top of the shared Button component.
      </p>
      <Button onClick={handleClick} variant="default">
        Click Me (with Business Logic)
      </Button>
    </div>
  );
}
