export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    secondary: string;
    secondaryHover: string;
    secondaryLight: string;
    accent: string;
    accentHover: string;
    success: string;
    successHover: string;
    warning: string;
    warningHover: string;
    error: string;
    errorHover: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      light: string;
      inverse: string;
    };
    border: {
      light: string;
      medium: string;
      dark: string;
    };
  };
  gradients: {
    primary: string;
    secondary: string;
    hero: string;
  };
  logo?: {
    text: string;
    url?: string;
  };
}

export const themes: Record<string, ThemeConfig> = {
  shopzen: {
    name: 'shopzen',
    displayName: 'ShopZen',
    colors: {
      primary: '#3B82F6', // Blue-500
      primaryHover: '#2563EB', // Blue-600
      primaryLight: '#EFF6FF', // Blue-50
      secondary: '#8B5CF6', // Purple-500
      secondaryHover: '#7C3AED', // Purple-600
      secondaryLight: '#F3E8FF', // Purple-50
      accent: '#F59E0B', // Amber-500
      accentHover: '#D97706', // Amber-600
      success: '#10B981', // Emerald-500
      successHover: '#059669', // Emerald-600
      warning: '#F59E0B', // Amber-500
      warningHover: '#D97706', // Amber-600
      error: '#EF4444', // Red-500
      errorHover: '#DC2626', // Red-600
      background: '#F9FAFB', // Gray-50
      surface: '#FFFFFF', // White
      text: {
        primary: '#111827', // Gray-900
        secondary: '#6B7280', // Gray-500
        light: '#9CA3AF', // Gray-400
        inverse: '#FFFFFF', // White
      },
      border: {
        light: '#E5E7EB', // Gray-200
        medium: '#D1D5DB', // Gray-300
        dark: '#9CA3AF', // Gray-400
      },
    },
    gradients: {
      primary: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      secondary: 'linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)',
      hero: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    },
    logo: {
      text: 'ShopZen',
    },
  },
  
  techmart: {
    name: 'techmart',
    displayName: 'TechMart',
    colors: {
      primary: '#059669', // Emerald-600
      primaryHover: '#047857', // Emerald-700
      primaryLight: '#ECFDF5', // Emerald-50
      secondary: '#0891B2', // Cyan-600
      secondaryHover: '#0E7490', // Cyan-700
      secondaryLight: '#ECFEFF', // Cyan-50
      accent: '#DC2626', // Red-600
      accentHover: '#B91C1C', // Red-700
      success: '#10B981', // Emerald-500
      successHover: '#059669', // Emerald-600
      warning: '#F59E0B', // Amber-500
      warningHover: '#D97706', // Amber-600
      error: '#EF4444', // Red-500
      errorHover: '#DC2626', // Red-600
      background: '#F0FDF4', // Green-50
      surface: '#FFFFFF', // White
      text: {
        primary: '#064E3B', // Emerald-900
        secondary: '#047857', // Emerald-700
        light: '#6B7280', // Gray-500
        inverse: '#FFFFFF', // White
      },
      border: {
        light: '#D1FAE5', // Emerald-100
        medium: '#A7F3D0', // Emerald-200
        dark: '#6EE7B7', // Emerald-300
      },
    },
    gradients: {
      primary: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      secondary: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
      hero: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
    },
    logo: {
      text: 'TechMart',
    },
  },

  luxeboutique: {
    name: 'luxeboutique',
    displayName: 'Luxe Boutique',
    colors: {
      primary: '#7C2D92', // Purple-800
      primaryHover: '#581C87', // Purple-900
      primaryLight: '#FAF5FF', // Purple-50
      secondary: '#BE185D', // Pink-700
      secondaryHover: '#9D174D', // Pink-800
      secondaryLight: '#FDF2F8', // Pink-50
      accent: '#D97706', // Amber-600
      accentHover: '#B45309', // Amber-700
      success: '#10B981', // Emerald-500
      successHover: '#059669', // Emerald-600
      warning: '#F59E0B', // Amber-500
      warningHover: '#D97706', // Amber-600
      error: '#EF4444', // Red-500
      errorHover: '#DC2626', // Red-600
      background: '#FEFCFF', // Very light purple
      surface: '#FFFFFF', // White
      text: {
        primary: '#581C87', // Purple-900
        secondary: '#7C2D92', // Purple-800
        light: '#A855F7', // Purple-500
        inverse: '#FFFFFF', // White
      },
      border: {
        light: '#E9D5FF', // Purple-200
        medium: '#C084FC', // Purple-400
        dark: '#A855F7', // Purple-500
      },
    },
    gradients: {
      primary: 'linear-gradient(135deg, #7C2D92 0%, #581C87 100%)',
      secondary: 'linear-gradient(135deg, #BE185D 0%, #9D174D 100%)',
      hero: 'linear-gradient(135deg, #7C2D92 0%, #BE185D 100%)',
    },
    logo: {
      text: 'Luxe Boutique',
    },
  },

  oceanblue: {
    name: 'oceanblue',
    displayName: 'Ocean Blue',
    colors: {
      primary: '#0369A1', // Sky-700
      primaryHover: '#0284C7', // Sky-600
      primaryLight: '#F0F9FF', // Sky-50
      secondary: '#0891B2', // Cyan-600
      secondaryHover: '#0E7490', // Cyan-700
      secondaryLight: '#ECFEFF', // Cyan-50
      accent: '#F97316', // Orange-500
      accentHover: '#EA580C', // Orange-600
      success: '#10B981', // Emerald-500
      successHover: '#059669', // Emerald-600
      warning: '#F59E0B', // Amber-500
      warningHover: '#D97706', // Amber-600
      error: '#EF4444', // Red-500
      errorHover: '#DC2626', // Red-600
      background: '#F0F9FF', // Sky-50
      surface: '#FFFFFF', // White
      text: {
        primary: '#0C4A6E', // Sky-900
        secondary: '#0369A1', // Sky-700
        light: '#0891B2', // Cyan-600
        inverse: '#FFFFFF', // White
      },
      border: {
        light: '#E0F2FE', // Sky-100
        medium: '#BAE6FD', // Sky-200
        dark: '#7DD3FC', // Sky-300
      },
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0369A1 0%, #0284C7 100%)',
      secondary: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
      hero: 'linear-gradient(135deg, #0369A1 0%, #0891B2 100%)',
    },
    logo: {
      text: 'Ocean Blue',
    },
  },
};

// Get the current client theme from environment variable or default to shopzen
export const getCurrentClientName = (): string => {
  return process.env.NEXT_PUBLIC_CLIENT_NAME || 'shopzen';
};

export const getCurrentTheme = (): ThemeConfig => {
  const clientName = getCurrentClientName();
  return themes[clientName] || themes.shopzen;
};
