'use client';

import {
  Typography,
  Grid,
  Box,
  Fab,
  useMediaQuery,
  useTheme,
  Paper,
  Stack,
  Chip,
  Avatar,
} from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { useMatchStore } from '../store/useMatchStore';
import MatchCard from '../components/MatchCard';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SportsIcon from '@mui/icons-material/Sports';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { tokens } from '../styles/theme';

export default function MatchesPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, joinedMatchIds } = useAuthStore();
  const { matches } = useMatchStore();

  // API: GET /api/matches
  // (Authorization: Bearer <access_token>)

  const activeMatches = matches.filter((match) => match.matchStatus === 'OPEN');
  const fullMatches = matches.filter((match) => match.matchStatus === 'FULL');

  return (
    <Box>
      {/* Header Section */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          background: tokens.gradients.hero,
          border: `1px solid ${tokens.colors.neutral[200]}`,
          borderRadius: tokens.borderRadius.xl,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'center' }}
          spacing={3}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Box sx={{ width: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                mb: 2,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: tokens.gradients.primary,
                  boxShadow: tokens.shadows.md,
                }}
              >
                <SportsIcon sx={{ fontSize: 24, color: 'white' }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: tokens.colors.neutral[900],
                    mb: 0.5,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  ⚽ 전체 매칭
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  현재 <strong>{matches.length}개</strong>의 매칭이 진행 중입니다
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
              }}
            >
              <Chip
                icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
                label={`모집중 ${activeMatches.length}개`}
                color="success"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={`마감 ${fullMatches.length}개`}
                color="error"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              {user?.role === 'USER' && (
                <Chip
                  label={`참여중 ${joinedMatchIds.length}개`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Stack>
          </Box>

          {user?.role === 'ADMIN' && !isMobile && (
            <Box textAlign="center" sx={{ flexShrink: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                새로운 매칭을 개설하세요
              </Typography>
              <Fab
                color="primary"
                onClick={() => navigate('/admin/matches/new')}
                sx={{
                  background: tokens.gradients.primary,
                  boxShadow: tokens.shadows.md,
                  '&:hover': {
                    boxShadow: tokens.shadows.lg,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Box>
          )}
        </Stack>
      </Paper>

      {/* Matches Grid */}
      {matches.length > 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={3} sx={{ width: '100%', maxWidth: '1200px' }}>
            {matches.map((match) => {
              const isJoined = joinedMatchIds.includes(match.id);

              return (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={match.id}>
                  <MatchCard
                    match={match}
                    showJoinButton={user?.role === 'USER' && !isJoined}
                    showCancelButton={user?.role === 'USER' && isJoined}
                    showDeleteButton={user?.role === 'ADMIN'}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Paper
          sx={{
            textAlign: 'center',
            py: 8,
            px: 4,
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            border: `1px solid ${tokens.colors.neutral[200]}`,
            borderRadius: tokens.borderRadius.xl,
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              background: tokens.gradients.primary,
              mx: 'auto',
              mb: 3,
              boxShadow: tokens.shadows.md,
            }}
          >
            <SportsIcon sx={{ fontSize: 36, color: 'white' }} />
          </Avatar>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 700, color: tokens.colors.neutral[900] }}
          >
            아직 등록된 매칭이 없습니다
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {user?.role === 'ADMIN'
              ? '첫 번째 매칭을 개설해보세요!'
              : '관리자가 매칭을 개설할 때까지 기다려주세요.'}
          </Typography>
        </Paper>
      )}

      {/* Mobile Floating Action Button for Admin */}
      {user?.role === 'ADMIN' && isMobile && (
        <Fab
          color="primary"
          aria-label="add match"
          onClick={() => navigate('/admin/matches/new')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: tokens.gradients.primary,
            boxShadow: tokens.shadows.lg,
            '&:hover': {
              boxShadow: tokens.shadows.xl,
              transform: 'scale(1.05)',
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
}
