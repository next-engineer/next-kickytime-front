import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Design Tokens - 더 절제된 값들로 수정
const tokens = {
  colors: {
    primary: {
      50: '#E8F5E8',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
    },
    secondary: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF9800',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100',
    },
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    success: {
      50: '#E8F5E8',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
    },
    error: {
      50: '#FFEBEE',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
    },
    warning: {
      50: '#FFF8E1',
      500: '#FF9800',
      600: '#FB8C00',
      700: '#F57C00',
    },
    info: {
      50: '#E3F2FD',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
    secondary: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
    surface: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)',
    hero: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
  },
};

let theme = createTheme({
  palette: {
    primary: {
      main: tokens.colors.primary[600],
      light: tokens.colors.primary[400],
      dark: tokens.colors.primary[800],
      contrastText: '#ffffff',
    },
    secondary: {
      main: tokens.colors.secondary[600],
      light: tokens.colors.secondary[400],
      dark: tokens.colors.secondary[800],
      contrastText: '#ffffff',
    },
    background: {
      default: tokens.colors.neutral[50],
      paper: '#ffffff',
    },
    text: {
      primary: tokens.colors.neutral[900],
      secondary: tokens.colors.neutral[600],
    },
    success: {
      main: tokens.colors.success[500],
      light: tokens.colors.success[50],
      dark: tokens.colors.success[700],
    },
    error: {
      main: tokens.colors.error[500],
      light: tokens.colors.error[50],
      dark: tokens.colors.error[700],
    },
    warning: {
      main: tokens.colors.warning[500],
      light: tokens.colors.warning[50],
      dark: tokens.colors.warning[700],
    },
    info: {
      main: tokens.colors.info[500],
      light: tokens.colors.info[50],
      dark: tokens.colors.info[700],
    },
    divider: tokens.colors.neutral[200],
  },
  typography: {
    fontFamily:
      '"Inter", "Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
  },
  shape: {
    borderRadius: 8, // 고정값으로 설정
  },
  shadows: [
    'none',
    tokens.shadows.sm,
    tokens.shadows.md,
    tokens.shadows.lg,
    tokens.shadows.xl,
    '0 20px 40px rgba(0,0,0,0.15)',
    '0 24px 48px rgba(0,0,0,0.18)',
    '0 28px 56px rgba(0,0,0,0.21)',
    '0 32px 64px rgba(0,0,0,0.24)',
    '0 36px 72px rgba(0,0,0,0.27)',
    '0 40px 80px rgba(0,0,0,0.30)',
    '0 44px 88px rgba(0,0,0,0.33)',
    '0 48px 96px rgba(0,0,0,0.36)',
    '0 52px 104px rgba(0,0,0,0.39)',
    '0 56px 112px rgba(0,0,0,0.42)',
    '0 60px 120px rgba(0,0,0,0.45)',
    '0 64px 128px rgba(0,0,0,0.48)',
    '0 68px 136px rgba(0,0,0,0.51)',
    '0 72px 144px rgba(0,0,0,0.54)',
    '0 76px 152px rgba(0,0,0,0.57)',
    '0 80px 160px rgba(0,0,0,0.60)',
    '0 84px 168px rgba(0,0,0,0.63)',
    '0 88px 176px rgba(0,0,0,0.66)',
    '0 92px 184px rgba(0,0,0,0.69)',
    '0 96px 192px rgba(0,0,0,0.72)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.colors.neutral[50],
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${tokens.colors.neutral[300]} transparent`,
        },
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: tokens.colors.neutral[300],
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: tokens.colors.neutral[400],
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          paddingLeft: tokens.spacing.lg,
          paddingRight: tokens.spacing.lg,
          '@media (max-width: 600px)': {
            paddingLeft: tokens.spacing.md,
            paddingRight: tokens.spacing.md,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'medium',
        disableElevation: false,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8, // 고정값
          padding: '10px 20px', // 더 적절한 패딩으로 수정
          fontSize: '0.95rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: tokens.gradients.primary,
          boxShadow: tokens.shadows.sm,
          '&:hover': {
            background: tokens.gradients.primary,
            boxShadow: tokens.shadows.md,
            filter: 'brightness(1.05)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(76, 175, 80, 0.04)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.04)',
          },
        },
        sizeSmall: {
          padding: '6px 12px', // 작은 버튼 패딩
          fontSize: '0.875rem',
        },
        sizeMedium: {
          padding: '10px 20px', // 중간 버튼 패딩
          fontSize: '0.95rem',
        },
        sizeLarge: {
          padding: '14px 28px', // 큰 버튼 패딩 (기존보다 줄임)
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // 고정값
            backgroundColor: '#ffffff',
            transition: 'all 0.2s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: tokens.colors.primary[400],
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
                borderColor: tokens.colors.primary[600],
              },
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // 고정값
          boxShadow: tokens.shadows.sm,
          border: `1px solid ${tokens.colors.neutral[200]}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: tokens.shadows.md,
            transform: 'translateY(-2px)',
            borderColor: tokens.colors.primary[200],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important', // !important로 강제 적용
          boxShadow: tokens.shadows.sm,
          border: `1px solid ${tokens.colors.neutral[200]}`,
        },
        elevation1: {
          boxShadow: tokens.shadows.sm,
        },
        elevation2: {
          boxShadow: tokens.shadows.md,
        },
        elevation3: {
          boxShadow: tokens.shadows.lg,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: tokens.gradients.primary,
          boxShadow: tokens.shadows.md,
          borderBottom: 'none',
          borderRadius: '0 !important', // AppBar는 둥글지 않게
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16, // 고정값
          fontWeight: 600,
          fontSize: '0.8125rem',
          height: 28,
          '&.MuiChip-filled': {
            '&.MuiChip-colorPrimary': {
              background: tokens.gradients.primary,
            },
            '&.MuiChip-colorSecondary': {
              background: tokens.gradients.secondary,
            },
          },
        },
        sizeSmall: {
          height: 24,
          fontSize: '0.75rem',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: tokens.gradients.primary,
          boxShadow: tokens.shadows.lg,
          '&:hover': {
            background: tokens.gradients.primary,
            filter: 'brightness(1.1)',
            transform: 'scale(1.05)',
            boxShadow: tokens.shadows.xl,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4, // 고정값
          height: 6,
          backgroundColor: tokens.colors.neutral[200],
        },
        bar: {
          borderRadius: 4, // 고정값
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          background: tokens.gradients.primary,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 고정값
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: tokens.colors.neutral[200],
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme, tokens };
