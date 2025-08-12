'use client';

import {
  Typography,
  Box,
  Button,
  Stack,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, mockLogin } from '../store/useAuthStore';
import { appConfig } from '../config/app';
import SportsIcon from '@mui/icons-material/Sports';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import SecurityIcon from '@mui/icons-material/Security';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { tokens } from '../styles/theme';
import { goLogin, goSignup } from '../auth/hostedUi';

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useAuthStore();

  const handleMockLogin = (userType: 'admin' | 'user') => {
    mockLogin(userType);
    navigate('/matches');
  };

  const features = [
    {
      icon: <SportsIcon sx={{ fontSize: 32, color: tokens.colors.primary[600] }} />,
      title: '쉬운 매칭',
      description: '원하는 시간과 장소의 풋살 매칭을 쉽게 찾아보세요',
      color: tokens.colors.primary[50],
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 32, color: tokens.colors.secondary[600] }} />,
      title: '실시간 참여',
      description: '실시간으로 참여 현황을 확인하고 바로 참여하세요',
      color: tokens.colors.secondary[50],
    },
    {
      icon: <EventIcon sx={{ fontSize: 32, color: tokens.colors.success[600] }} />,
      title: '일정 관리',
      description: '내가 참여한 매칭을 한눈에 관리할 수 있어요',
      color: tokens.colors.success[50],
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32, color: tokens.colors.info[600] }} />,
      title: '안전한 인증',
      description: 'AWS Cognito 기반의 안전한 회원 인증 시스템',
      color: tokens.colors.info[50],
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: tokens.gradients.hero,
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 3 },
          borderRadius: tokens.borderRadius.xl,
          mb: 6,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${tokens.colors.neutral[200]}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.08) 0%, transparent 50%)
            `,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: tokens.gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: tokens.shadows.lg,
                border: `3px solid ${tokens.colors.primary[100]}`,
              }}
            >
              <SportsIcon sx={{ fontSize: 32, color: 'white' }} />
            </Box>
          </Box>

          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              background: tokens.gradients.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            {appConfig.name}
          </Typography>

          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              mb: 3,
              color: tokens.colors.neutral[700],
              fontWeight: 600,
            }}
          >
            풋살 매칭의 새로운 경험을 시작하세요
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: tokens.colors.neutral[600],
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7,
              fontSize: '1.1rem',
            }}
          >
            언제 어디서나 쉽게 풋살 매칭을 찾고 참여할 수 있습니다. 실시간 참여 현황 확인부터 안전한
            매칭 관리까지, 모든 것이 한 곳에서!
          </Typography>

          {isAuthenticated ? (
            <Paper
              sx={{
                p: 4,
                maxWidth: 420,
                mx: 'auto',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: tokens.shadows.lg,
                border: `1px solid ${tokens.colors.neutral[200]}`,
                borderRadius: tokens.borderRadius.xl,
              }}
            >
              <Stack alignItems="center" spacing={3}>
                <Avatar
                  src={user?.imageUrl}
                  sx={{
                    width: 56,
                    height: 56,
                    background: tokens.gradients.primary,
                    border: `2px solid ${tokens.colors.primary[200]}`,
                    fontSize: '1.25rem',
                    fontWeight: 700,
                  }}
                >
                  {user?.nickname?.[0]}
                </Avatar>

                <Box textAlign="center">
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700, color: tokens.colors.neutral[900] }}
                  >
                    안녕하세요, {user?.nickname}님! 👋
                  </Typography>
                  <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      label={user?.role === 'ADMIN' ? '관리자' : '일반 사용자'}
                      color={user?.role === 'ADMIN' ? 'secondary' : 'primary'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip
                      label={
                        user?.rank === 'BEGINNER'
                          ? '입문자'
                          : user?.rank === 'INTERMEDIATE'
                            ? '중급자'
                            : '상급자'
                      }
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, fontWeight: 500 }}
                  >
                    지금 바로 매칭에 참여해보세요!
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/matches')}
                  sx={{
                    py: 1.5,
                    px: 4,
                    background: tokens.gradients.primary,
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: tokens.shadows.md,
                    borderRadius: tokens.borderRadius.md,
                    '&:hover': {
                      boxShadow: tokens.shadows.lg,
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  매칭 보러가기 ⚽
                </Button>
              </Stack>
            </Paper>
          ) : (
            <Stack spacing={4} alignItems="center">
              <Paper
                sx={{
                  p: 4,
                  maxWidth: 420,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: tokens.shadows.lg,
                  border: `1px solid ${tokens.colors.neutral[200]}`,
                  borderRadius: tokens.borderRadius.xl,
                }}
              >
                <Stack alignItems="center" spacing={3}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: tokens.gradients.secondary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: tokens.shadows.md,
                    }}
                  >
                    <RocketLaunchIcon sx={{ fontSize: 24, color: 'white' }} />
                  </Box>

                  <Box textAlign="center">
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 700, color: tokens.colors.neutral[900] }}
                    >
                      🚀 데모 체험하기
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3, fontWeight: 500 }}
                    >
                      실제 인증 없이 바로 체험해보세요
                      {appConfig.useMockData && (
                        <span
                          style={{
                            display: 'block',
                            marginTop: 4,
                            fontSize: '0.75rem',
                            color: tokens.colors.warning[600],
                          }}
                        >
                          (Mock 데이터 사용 중)
                        </span>
                      )}
                    </Typography>
                  </Box>

                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <Button
                      variant="contained"
                      onClick={() => handleMockLogin('user')}
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontWeight: 700,
                        background: tokens.gradients.primary,
                        boxShadow: tokens.shadows.sm,
                        '&:hover': {
                          boxShadow: tokens.shadows.md,
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      일반 사용자로 체험
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleMockLogin('admin')}
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontWeight: 700,
                        borderWidth: 2,
                        borderColor: tokens.colors.primary[400],
                        color: tokens.colors.primary[700],
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: tokens.colors.primary[600],
                          backgroundColor: tokens.colors.primary[50],
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      관리자로 체험
                    </Button>
                  </Stack>
                </Stack>
              </Paper>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button
                  variant="outlined"
                  onClick={() => goSignup()}
                  sx={{
                    borderColor: tokens.colors.neutral[400],
                    color: tokens.colors.neutral[700],
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: tokens.colors.neutral[600],
                      backgroundColor: tokens.colors.neutral[50],
                    },
                  }}
                >
                  회원가입
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => goLogin()}
                  sx={{
                    borderColor: tokens.colors.neutral[400],
                    color: tokens.colors.neutral[700],
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: tokens.colors.neutral[600],
                      backgroundColor: tokens.colors.neutral[50],
                    },
                  }}
                >
                  로그인
                </Button>
              </Stack>
            </Stack>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: tokens.colors.neutral[900],
              mb: 2,
            }}
          >
            왜 {appConfig.name}인가요?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem',
              fontWeight: 500,
            }}
          >
            풋살을 사랑하는 모든 사람들을 위한 완벽한 매칭 플랫폼
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ width: '100%' }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  border: `1px solid ${tokens.colors.neutral[200]}`,
                  background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: tokens.shadows.lg,
                    borderColor: tokens.colors.primary[300],
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      mb: 3,
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: feature.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      boxShadow: tokens.shadows.sm,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: tokens.colors.neutral[900],
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
