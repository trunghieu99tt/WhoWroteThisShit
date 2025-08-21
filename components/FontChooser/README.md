# FontChooser Component

A customizable font chooser component that allows users to select from a predefined set of fonts and persists their choice using localStorage.

## Features

- ✅ Dropdown selection with preview text
- ✅ Persistent font selection via localStorage
- ✅ Google Fonts integration
- ✅ Local font support
- ✅ Accessibility features (ARIA attributes)
- ✅ Dark mode support
- ✅ Mobile responsive
- ✅ Click outside to close
- ✅ Font preloading for better performance

## Usage

### Basic Usage

```tsx
import FontChooser from './FontChooser';

function MyComponent() {
    const handleFontChange = (fontFamily: string) => {
        console.log('Selected font:', fontFamily);
    };

    return (
        <FontChooser onFontChange={handleFontChange} />
    );
}
```

### With Custom CSS Classes

```tsx
<FontChooser 
    onFontChange={handleFontChange}
    className="my-custom-class"
/>
```

### Using the Hook

```tsx
import { useFontChooser } from './FontChooser/useFontChooser';

function MyComponent() {
    const { selectedFont, changeFont, hasMounted } = useFontChooser();
    
    // Use selectedFont in your component
    return (
        <div style={{ fontFamily: selectedFont }}>
            Content with dynamic font
        </div>
    );
}
```

## Available Fonts

The component comes with 8 predefined fonts:

### Local Fonts (included in the project)
- **CMU Serif Roman** - Academic serif font (default)
- **TeX Gyre Bonum** - Classical serif font

### Google Fonts
- **Inter** - Modern sans-serif
- **Mali** - Handwritten style
- **Poppins** - Geometric sans-serif
- **Source Sans Pro** - Clean sans-serif
- **Roboto** - Material Design font
- **Open Sans** - Friendly sans-serif

## Customization

### Adding New Fonts

1. Edit the `FONT_OPTIONS` array in `FontChooser.tsx`:

```tsx
const FONT_OPTIONS: FontOption[] = [
    // existing fonts...
    {
        name: 'Your Font Name',
        displayName: 'Display Name',
        googleFont: true, // or false for local fonts
        preview: 'Preview text for this font'
    }
];
```

2. If it's a Google Font, add it to the `GOOGLE_FONTS` array in `CustomFont.tsx`:

```tsx
const GOOGLE_FONTS = [
    // existing fonts...
    'Your Font Name'
];
```

3. If it's a local font, add the `@font-face` declaration to `global.css`.

### Styling

The component uses CSS modules. Override styles by targeting these classes:

- `.fontChooser` - Main container
- `.fontToggle` - Button that opens dropdown
- `.fontDropdown` - Dropdown container
- `.fontOption` - Individual font option
- `.fontPreview` - Preview text

## Position and Layout

The font chooser is positioned as a floating element in the top-right corner of the page:

- **Desktop**: Fixed position top-right (20px from top and right edges)
- **Mobile/Tablet**: Moves to bottom-right for better accessibility
- **Very small screens**: Hidden to avoid cluttering

### TopFontChooser Component

The main implementation uses the `TopFontChooser` wrapper component:

```tsx
import TopFontChooser from './TopFontChooser';

function Page() {
    return (
        <>
            {/* Your page content */}
            <TopFontChooser />
        </>
    );
}
```

## Integration with CustomFont

The FontChooser works seamlessly with the existing `CustomFont` component:

```tsx
import { CustomFont } from './CustomFont';
import { useFontChooser } from './FontChooser/useFontChooser';

function Page({ site }) {
    const { selectedFont } = useFontChooser();
    
    return (
        <>
            <CustomFont site={site} fontFamily={selectedFont} />
            {/* Your page content */}
        </>
    );
}
```

## Font Preloading

The `FontPreloader` component preloads Google Fonts for better performance:

```tsx
import { FontPreloader } from './FontChooser/FontPreloader';

function App() {
    return (
        <>
            <FontPreloader />
            {/* Rest of your app */}
        </>
    );
}
```

## Accessibility

- Uses proper ARIA attributes (`aria-label`, `aria-expanded`, `aria-selected`)
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Browser Support

- Modern browsers with ES6+ support
- Graceful fallback when localStorage is unavailable
- SSR compatible (hydration-safe)
