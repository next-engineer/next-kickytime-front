'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Tooltip,
  Stack,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { appConfig } from '../config/app';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SportsIcon from '@mui/icons-material/Sports';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { tokens } from '../styles/theme';
import { goLogin, goSignup } from '../auth/hostedUi';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user, logout } = useAuthStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { label: '전체 매칭', path: '/matches', icon: '⚽' },
    ...(user?.role === 'USER' ? [{ label: '내 매칭', path: '/matches/mine', icon: '📋' }] : []),
    ...(user?.role === 'ADMIN'
      ? [{ label: '매칭 개설', path: '/admin/matches/new', icon: '➕' }]
      : []),
  ];

  const MobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          background: tokens.gradients.surface,
          borderRight: `1px solid ${tokens.colors.neutral[200]}`,
        },
      }}
    >
      <Box sx={{ pt: 3, pb: 2 }}>
        <Box sx={{ px: 3, pb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: tokens.gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: tokens.shadows.sm,
              }}
            >
              <SportsIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.colors.neutral[900] }}>
              {appConfig.name}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <List sx={{ px: 2, pt: 2 }}>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: tokens.borderRadius.md,
                  py: 1.5,
                  px: 2,
                  '&.Mui-selected': {
                    backgroundColor: tokens.colors.primary[50],
                    color: tokens.colors.primary[700],
                    '&:hover': {
                      backgroundColor: tokens.colors.primary[100],
                    },
                  },
                  '&:hover': {
                    backgroundColor: tokens.colors.neutral[100],
                  },
                }}
              >
                <Box sx={{ mr: 2, fontSize: '1.25rem' }}>{item.icon}</Box>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 600 : 500,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              sx={{
                borderRadius: tokens.borderRadius.md,
                py: 1.5,
                px: 2,
                color: tokens.colors.error[600],
                '&:hover': {
                  backgroundColor: tokens.colors.error[50],
                },
              }}
            >
              <Box sx={{ mr: 2 }}>
                <LogoutIcon sx={{ fontSize: 20 }} />
              </Box>
              <ListItemText
                primary="로그아웃"
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
          {isAuthenticated && isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <SportsIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                color: 'white',
                letterSpacing: '-0.01em',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
              onClick={() => navigate('/')}
            >
              {appConfig.name}
            </Typography>
          </Stack>

          {isAuthenticated ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              {!isMobile && (
                <Stack direction="row" spacing={0.5}>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.path}
                      color="inherit"
                      onClick={() => navigate(item.path)}
                      sx={{
                        borderRadius: tokens.borderRadius.md,
                        px: 2,
                        py: 1,
                        backgroundColor: isActive(item.path)
                          ? 'rgba(255,255,255,0.15)'
                          : 'transparent',
                        fontWeight: isActive(item.path) ? 600 : 500,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        },
                      }}
                    >
                      <Box sx={{ mr: 1, fontSize: '1.1rem' }}>{item.icon}</Box>
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              )}

              <Tooltip title="프로필 보기">
                <IconButton
                  onClick={handleProfileClick}
                  sx={{
                    ml: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <Avatar
                    src={user?.imageUrl}
                    sx={{
                      width: 36,
                      height: 36,
                      border: '2px solid rgba(255,255,255,0.3)',
                      background: tokens.gradients.secondary,
                    }}
                  >
                    {user?.nickname?.[0] || <PersonIcon sx={{ fontSize: 18 }} />}
                  </Avatar>
                </IconButton>
              </Tooltip>

              {!isMobile && (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    borderRadius: tokens.borderRadius.md,
                    px: 2,
                    py: 1,
                    ml: 1,
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  로그아웃
                </Button>
              )}
            </Stack>
          ) : (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{
                alignItems: 'center',
                minWidth: { xs: 'auto', sm: 'auto' },
              }}
            >
              <Button
                color="inherit"
                onClick={() => goLogin()}
                sx={{
                  borderRadius: tokens.borderRadius.md,
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  fontWeight: 500,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                로그인
              </Button>
              <Button
                variant="contained"
                onClick={() => goSignup()}
                sx={{
                  borderRadius: tokens.borderRadius.md,
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                회원가입
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <MobileDrawer />

      <Container
        component="main"
        sx={{
          flex: 1,
          py: { xs: 3, md: 4 },
        }}
      >
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: 'auto',
          background: tokens.gradients.surface,
          borderTop: `1px solid ${tokens.colors.neutral[200]}`,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              © 2025 {appConfig.name}. 풋살 매칭의 새로운 경험.
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <SportsIcon sx={{ fontSize: 16, color: tokens.colors.primary[600] }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                Made with ❤️ for football lovers
                {appConfig.isDevelopment && (
                  <span style={{ marginLeft: 8, color: tokens.colors.warning[600] }}>
                    v{appConfig.version}
                  </span>
                )}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
