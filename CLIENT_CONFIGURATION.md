# Multi-Client Configuration Guide

This ecommerce platform supports multiple client themes with different branding and color schemes. You can easily switch between different client configurations by setting an environment variable.

## Quick Setup

1. **Create Environment File**:
   ```bash
   cp .env.example .env.local
   ```

2. **Set Client Name**:
   Edit `.env.local` and set your desired client:
   ```
   NEXT_PUBLIC_CLIENT_NAME=techmart
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

## Available Client Themes

### 1. ShopZen (Default)
- **Client Name**: `shopzen`
- **Primary Color**: Blue (#3B82F6)
- **Secondary Color**: Purple (#8B5CF6)
- **Style**: Modern, clean, professional

### 2. TechMart
- **Client Name**: `techmart`
- **Primary Color**: Emerald Green (#059669)
- **Secondary Color**: Cyan (#0891B2)
- **Style**: Tech-focused, modern, energetic

### 3. Luxe Boutique
- **Client Name**: `luxeboutique`
- **Primary Color**: Deep Purple (#7C2D92)
- **Secondary Color**: Pink (#BE185D)
- **Style**: Elegant, luxury, sophisticated

### 4. Ocean Blue
- **Client Name**: `oceanblue`
- **Primary Color**: Sky Blue (#0369A1)
- **Secondary Color**: Cyan (#0891B2)
- **Style**: Fresh, clean, ocean-inspired

## Adding New Client Themes

1. **Edit Theme Configuration**:
   Open `src/config/themes.ts` and add a new theme object:

   ```typescript
   yourclient: {
     name: 'yourclient',
     displayName: 'Your Client Name',
     colors: {
       primary: '#YOUR_PRIMARY_COLOR',
       primaryHover: '#YOUR_PRIMARY_HOVER_COLOR',
       // ... other colors
     },
     gradients: {
       hero: 'linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%)',
       // ... other gradients
     },
     logo: {
       text: 'Your Client Logo Text',
     },
   }
   ```

2. **Add CSS Variables**:
   Add corresponding CSS variables in `src/styles/theme.css`:

   ```css
   [data-theme="yourclient"] {
     --color-primary: #YOUR_PRIMARY_COLOR;
     --color-primary-hover: #YOUR_PRIMARY_HOVER_COLOR;
     /* ... other variables */
   }
   ```

3. **Set Environment Variable**:
   ```
   NEXT_PUBLIC_CLIENT_NAME=yourclient
   ```

## Theme Structure

Each theme includes:

- **Colors**: Primary, secondary, success, error, warning colors with hover states
- **Text Colors**: Various text color variants for different contexts
- **Border Colors**: Light, medium, and dark border variations
- **Background Colors**: Main background and surface colors
- **Gradients**: Hero section and other decorative gradients
- **Logo Configuration**: Brand name and optional logo URL

## CSS Custom Properties

The system uses CSS custom properties (variables) that automatically update based on the selected theme:

- `--color-primary`
- `--color-secondary`
- `--color-success`
- `--color-error`
- `--color-background`
- `--color-text-primary`
- And many more...

## Utility Classes

Use theme-aware utility classes in your components:

```html
<button class="btn-primary">Primary Button</button>
<div class="bg-primary text-inverse">Themed Background</div>
<section class="gradient-hero">Hero Section</section>
```

## Development Tips

1. **Hot Reloading**: Theme changes require a server restart to take effect
2. **Environment Variables**: Make sure to prefix with `NEXT_PUBLIC_` for client-side access
3. **CSS Inheritance**: All theme variables cascade throughout the application
4. **Component Consistency**: Use theme variables instead of hardcoded colors

## Production Deployment

For production deployments, set the environment variable in your hosting platform:

- **Vercel**: Set in project settings under "Environment Variables"
- **Netlify**: Set in site settings under "Environment variables"
- **Docker**: Include in your Dockerfile or docker-compose.yml
- **Server**: Export the variable in your server environment

## Troubleshooting

1. **Theme not applying**: Check that NEXT_PUBLIC_CLIENT_NAME is set correctly
2. **Missing colors**: Verify all CSS variables are defined for your theme
3. **Build errors**: Ensure theme name exists in themes.ts configuration
4. **Caching issues**: Clear browser cache after theme changes
