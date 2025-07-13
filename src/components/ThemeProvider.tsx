'use client';

import { useEffect } from 'react';
import { getCurrentTheme, getCurrentClientName } from '@/config/themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const clientName = getCurrentClientName();
    const theme = getCurrentTheme();
    
    // Set the data-theme attribute on the document body
    document.body.setAttribute('data-theme', clientName);
    
    // Set CSS custom properties based on the current theme
    const root = document.documentElement;
    
    // Set color variables
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-hover', theme.colors.primaryHover);
    root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-secondary-hover', theme.colors.secondaryHover);
    root.style.setProperty('--color-secondary-light', theme.colors.secondaryLight);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-accent-hover', theme.colors.accentHover);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-success-hover', theme.colors.successHover);
    root.style.setProperty('--color-warning', theme.colors.warning);
    root.style.setProperty('--color-warning-hover', theme.colors.warningHover);
    root.style.setProperty('--color-error', theme.colors.error);
    root.style.setProperty('--color-error-hover', theme.colors.errorHover);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text-primary', theme.colors.text.primary);
    root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--color-text-light', theme.colors.text.light);
    root.style.setProperty('--color-text-inverse', theme.colors.text.inverse);
    root.style.setProperty('--color-border-light', theme.colors.border.light);
    root.style.setProperty('--color-border-medium', theme.colors.border.medium);
    root.style.setProperty('--color-border-dark', theme.colors.border.dark);
    
    // Set gradient variables
    root.style.setProperty('--gradient-primary', theme.gradients.primary);
    root.style.setProperty('--gradient-secondary', theme.gradients.secondary);
    root.style.setProperty('--gradient-hero', theme.gradients.hero);
    
    // Set document title based on client
    document.title = `${theme.displayName} - Your Premium Shopping Destination`;
  }, []);

  return <>{children}</>;
}
