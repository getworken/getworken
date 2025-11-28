/**
 * Shared UI Components Public API
 * Part of the shared layer (shadcn/ui integration).
 *
 * This barrel file exports all shadcn/ui components for easy importing.
 * Components are organized following the Diamond Standard v2.0.
 *
 * @module shared/ui
 *
 * @example
 * ```tsx
 * import { Button, Card, Dialog, Input } from '@/shared/ui';
 * ```
 */

// Button Components
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

export { GradientButton, gradientButtonVariants } from './gradient-button';
export type { GradientButtonProps } from './gradient-button';

// Card Components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

// Dialog Components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog';

// Form Components
export { Input } from './input';
export type { InputProps } from './input';

export { Label } from './label';

export { Textarea } from './textarea';
export type { TextareaProps } from './textarea';

export { Checkbox } from './checkbox';

export { Switch } from './switch';

// Feedback Components
export { Alert, AlertTitle, AlertDescription } from './alert';

export { Badge, badgeVariants } from './badge';
export type { BadgeProps } from './badge';

export { StatusBadge, statusBadgeVariants } from './status-badge';
export type { StatusBadgeProps } from './status-badge';

export { Skeleton } from './skeleton';

// Layout Components
export { Separator } from './separator';

// Navigation Components
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

// Menu Components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from './context-menu';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from './menubar';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './navigation-menu';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './select';

// Overlay Components
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './tooltip';

export { Popover, PopoverTrigger, PopoverContent } from './popover';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './sheet';

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog';

// Display Components
export { Avatar, AvatarImage, AvatarFallback } from './avatar';

export { Progress } from './progress';

export { Slider } from './slider';

export { ScrollArea, ScrollBar } from './scroll-area';

export { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card';

// Form Input Components
export { RadioGroup, RadioGroupItem } from './radio-group';

// Toggle Components
export { Toggle, toggleVariants } from './toggle';

export { ToggleGroup, ToggleGroupItem } from './toggle-group';

// Utility Components
export { AspectRatio } from './aspect-ratio';

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';

// Navigation Components
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './breadcrumb';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

// Data Display
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

// Toast Components
export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './toast';
export type { ToastProps, ToastActionElement } from './toast';

export { Toaster } from './toaster';
export { useToast, toast } from './use-toast';

// Date & Time Components
export { Calendar } from './calendar';
export type { CalendarProps } from './calendar';

export { DatePicker } from './date-picker';
export type { DatePickerProps } from './date-picker';

// Carousel Components
export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './carousel';

// Form Components (react-hook-form integration)
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from './form';

// Input Components
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from './input-otp';

// Combobox Component
export { Combobox } from './combobox';
export type { ComboboxProps, ComboboxOption } from './combobox';

// Drawer Components
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from './drawer';

// Resizable Components
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './resizable';

// Sonner Toast (alternative to toast)
export { Toaster as SonnerToaster } from './sonner';

// Legacy Components (to be migrated)
// Note: The old Button component has been replaced by the shadcn/ui button
// Files importing from '@/shared/ui/Button' should update to '@/shared/ui'
export { ErrorBoundary } from './ErrorBoundary';
export { LoadingState } from './LoadingState';
