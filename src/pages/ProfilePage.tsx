import {
  Typography,
  Paper,
  Box,
  Avatar,
  Chip,
  Stack,
  Divider,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { useMatchStore } from '../store/useMatchStore';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SportsIcon from '@mui/icons-material/Sports';
import type { UserRank } from '../types';

export default function ProfilePage() {
  const { user, joinedMatchIds } = useAuthStore();
  const { matches } = useMatchStore();

  if (!user) {
    return (
      <Typography variant="h6" textAlign="center">
        로그인이 필요합니다.
      </Typography>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRankLabel = (rank: UserRank) => {
    switch (rank) {
      case 'BEGINNER':
        return '입문자';
      case 'INTERMEDIATE':
        return '중급자';
      case 'MASTER':
        return '상급자';
      default:
        return rank;
    }
  };

  const getRankColor = (rank: UserRank): 'success' | 'warning' | 'error' | 'default' => {
    switch (rank) {
      case 'BEGINNER':
        return 'success';
      case 'INTERMEDIATE':
        return 'warning';
      case 'MASTER':
        return 'error';
      default:
        return 'default';
    }
  };

  const myMatches = matches.filter((match) => joinedMatchIds.includes(match.id));
  const totalMatches = myMatches.length;
  const upcomingMatches = myMatches.filter(
    (match) => new Date(match.matchTime) > new Date(),
  ).length;

  // API: GET /api/users/me
  // (Authorization: Bearer <access_token>)

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        👤 내 프로필
      </Typography>

      <Grid container spacing={4} sx={{ width: '100%' }}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Stack spacing={3} alignItems="center">
              <Avatar
                src={user.imageUrl}
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: 3,
                }}
              >
                {user.nickname?.[0]}
              </Avatar>

              <Box textAlign="center">
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {user.nickname}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {user.email}
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                  <Chip
                    label={user.role === 'ADMIN' ? '관리자' : '일반 사용자'}
                    color={user.role === 'ADMIN' ? 'secondary' : 'primary'}
                    sx={{ fontWeight: 500 }}
                  />
                  <Chip
                    label={getRankLabel(user.rank)}
                    color={getRankColor(user.rank)}
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Stats Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              📊 활동 통계
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    참여 중인 매칭
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {totalMatches}개
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((totalMatches / 10) * 100, 100)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    예정된 매칭
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {upcomingMatches}개
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((upcomingMatches / 5) * 100, 100)}
                  color="secondary"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Divider />

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SportsIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      총 참여 매칭
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {totalMatches}회
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Account Info Card */}
        <Grid size={12}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              🔐 계정 정보
            </Typography>

            <Grid container spacing={3} sx={{ width: '100%' }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <PersonIcon color="primary" />
                      <Typography variant="subtitle2" color="text.secondary">
                        사용자 ID
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      #{user.id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CalendarTodayIcon color="primary" />
                      <Typography variant="subtitle2" color="text.secondary">
                        가입일
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatDate(user.createdAt)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {user.cognitoSub && (
                <Grid size={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <EmailIcon color="primary" />
                        <Typography variant="subtitle2" color="text.secondary">
                          Cognito Sub
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          backgroundColor: 'grey.100',
                          p: 1,
                          borderRadius: 1,
                          wordBreak: 'break-all',
                        }}
                      >
                        {user.cognitoSub}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
