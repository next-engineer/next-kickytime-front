import { Typography, Grid, Box, Button, Paper, Stack, Avatar, Chip } from '@mui/material';
import { useMatchStore } from '../store/useMatchStore';
import MatchCard from '../components/MatchCard';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { tokens } from '../styles/theme';
import useLoadMatches from '../hooks/useLoadMatches';

export default function MyMatchesPage() {
  const navigate = useNavigate();
  const { matches, joinedIds } = useMatchStore();

  useLoadMatches();

  const myMatches = matches.filter((match) => joinedIds.includes(match.id as number));
  const upcomingMatches = myMatches.filter((match) => new Date(match.matchDateTime) > new Date());
  const pastMatches = myMatches.filter((match) => new Date(match.matchDateTime) <= new Date());

  return (
    <Box>
      {/* Header Section */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          background: tokens.gradients.hero,
          border: `1px solid ${tokens.colors.primary[200]}`,
          borderRadius: tokens.borderRadius.xl,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            mb: 3,
            justifyContent: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
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
            <EventIcon sx={{ fontSize: 24, color: 'white' }} />
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
              📋 내 매칭
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              현재 <strong>{myMatches.length}개</strong>의 매칭에 참여 중입니다
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
            label={`예정된 매칭 ${upcomingMatches.length}개`}
            color="primary"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
            label={`완료된 매칭 ${pastMatches.length}개`}
            color="success"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
      </Paper>

      {myMatches.length > 0 ? (
        <Box>
          {/* Upcoming Matches */}
          {upcomingMatches.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: tokens.colors.neutral[900],
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <TrendingUpIcon sx={{ color: tokens.colors.primary[600] }} />
                예정된 매칭 ({upcomingMatches.length}개)
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={3} sx={{ width: '100%', maxWidth: '1200px' }}>
                  {upcomingMatches.map((match) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={match.id}>
                      <MatchCard match={match} showLeaveButton={true} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}

          {/* Past Matches */}
          {pastMatches.length > 0 && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: tokens.colors.neutral[900],
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <AccessTimeIcon sx={{ color: tokens.colors.success[600] }} />
                완료된 매칭 ({pastMatches.length}개)
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={3} sx={{ width: '100%', maxWidth: '1200px' }}>
                  {pastMatches.map((match) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={match.id}>
                      <MatchCard match={match} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
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
              width: 80,
              height: 80,
              background: tokens.gradients.secondary,
              mx: 'auto',
              mb: 3,
              boxShadow: tokens.shadows.md,
            }}
          >
            <EventIcon sx={{ fontSize: 40, color: 'white' }} />
          </Avatar>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: tokens.colors.neutral[900],
              mb: 2,
            }}
          >
            참여 중인 매칭이 없습니다
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 4,
              fontWeight: 500,
              maxWidth: 400,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            새로운 풋살 매칭에 참여해서 즐거운 시간을 보내보세요!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/matches')}
            sx={{
              px: 4,
              py: 2,
              background: tokens.gradients.primary,
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: tokens.shadows.md,
              '&:hover': {
                boxShadow: tokens.shadows.lg,
                transform: 'translateY(-2px)',
              },
            }}
          >
            매칭 찾아보기 ⚽
          </Button>
        </Paper>
      )}
    </Box>
  );
}
