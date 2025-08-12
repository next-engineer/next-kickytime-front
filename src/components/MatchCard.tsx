'use client';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider,
} from '@mui/material';
import type { Match } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useMatchStore } from '../store/useMatchStore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { tokens } from '../styles/theme';

interface MatchCardProps {
  match: Match;
  showJoinButton?: boolean;
  showCancelButton?: boolean;
  showDeleteButton?: boolean;
}

export default function MatchCard({
  match,
  showJoinButton = false,
  showCancelButton = false,
  showDeleteButton = false,
}: MatchCardProps) {
  const { user, joinMatch, leaveMatch, joinedMatchIds } = useAuthStore();
  const { removeMatch, updateMatchParticipants } = useMatchStore();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const timeStr = date.toLocaleString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    if (diffDays === 0) return `오늘 ${timeStr}`;
    if (diffDays === 1) return `내일 ${timeStr}`;
    if (diffDays > 0 && diffDays <= 7) return `${diffDays}일 후 ${timeStr}`;
    return timeStr;
  };

  const handleJoin = () => {
    // API: POST /api/matches/{matchId}/participants
    // (Authorization: Bearer <access_token>)
    joinMatch(match.id);
    updateMatchParticipants(match.id, (match.currentPlayers || 0) + 1);
  };

  const handleCancel = () => {
    // API: DELETE /api/matches/{matchId}/participants
    // (Authorization: Bearer <access_token>)
    leaveMatch(match.id);
    updateMatchParticipants(match.id, (match.currentPlayers || 0) - 1);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 매칭을 삭제하시겠습니까?')) {
      // API: DELETE /api/matches/{matchId}
      // (Authorization: Bearer <access_token>)
      removeMatch(match.id);
    }
  };

  const isJoined = joinedMatchIds.includes(match.id);
  const currentPlayers = match.currentPlayers || 0;
  const isFull = match.matchStatus === 'FULL' || currentPlayers >= match.maxPlayers;
  const isClosed = match.matchStatus === 'CLOSED';
  const isCanceled = match.matchStatus === 'CANCELED';
  const participationRate = (currentPlayers / match.maxPlayers) * 100;

  const getStatusColor = () => {
    switch (match.matchStatus) {
      case 'FULL':
        return tokens.colors.error[500];
      case 'CLOSED':
        return tokens.colors.neutral[500];
      case 'CANCELED':
        return tokens.colors.error[700];
      case 'OPEN':
      default:
        if (participationRate >= 80) return tokens.colors.warning[500];
        return tokens.colors.success[500];
    }
  };

  const getStatusLabel = () => {
    switch (match.matchStatus) {
      case 'FULL':
        return '정원 마감';
      case 'CLOSED':
        return '마감됨';
      case 'CANCELED':
        return '취소됨';
      case 'OPEN':
      default:
        if (participationRate >= 80) return '마감 임박';
        return '모집중';
    }
  };

  // 매치 제목을 장소 기반으로 생성
  const getMatchTitle = () => {
    const locationParts = match.location.split(' ');
    const area = locationParts[0] || '풋살장';
    const time = new Date(match.matchTime).toLocaleString('ko-KR', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${area} ${time} 매칭`;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        opacity: isCanceled ? 0.6 : 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: isJoined ? tokens.gradients.primary : tokens.gradients.secondary,
          borderRadius: `12px 12px 0 0`,
        },
      }}
    >
      {isJoined && !isCanceled && (
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            zIndex: 2,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: tokens.gradients.primary,
              border: '3px solid white',
              boxShadow: tokens.shadows.md,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 16, color: 'white' }} />
          </Avatar>
        </Box>
      )}

      <CardContent sx={{ flex: 1, p: 3, pb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2.5 }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: '1.125rem',
                lineHeight: 1.3,
                color: tokens.colors.neutral[900],
                mb: 0.5,
              }}
            >
              {getMatchTitle()}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip
                label={getStatusLabel()}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                }}
              />
              {isJoined && !isCanceled && (
                <Chip
                  label="참여중"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: tokens.colors.primary[400],
                    color: tokens.colors.primary[700],
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24,
                  }}
                />
              )}
            </Stack>
          </Box>
          {showDeleteButton && user?.role === 'ADMIN' && (
            <Tooltip title="매칭 삭제">
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{
                  color: tokens.colors.error[500],
                  '&:hover': {
                    backgroundColor: tokens.colors.error[50],
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: tokens.colors.primary[50],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocationOnIcon sx={{ fontSize: 16, color: tokens.colors.primary[600] }} />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: tokens.colors.neutral[700],
              }}
            >
              {match.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: tokens.colors.secondary[50],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 16, color: tokens.colors.secondary[600] }} />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: tokens.colors.neutral[700],
              }}
            >
              {formatDateTime(match.matchTime)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: tokens.colors.info[50],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PeopleIcon sx={{ fontSize: 16, color: tokens.colors.info[600] }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 0.5 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: tokens.colors.neutral[800],
                  }}
                >
                  {currentPlayers}/{match.maxPlayers}명
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: tokens.colors.neutral[600],
                  }}
                >
                  {Math.round(participationRate)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={participationRate}
                sx={{
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: tokens.colors.neutral[200],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getStatusColor(),
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <SportsSoccerIcon sx={{ fontSize: 16, color: tokens.colors.primary[600] }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            매칭 ID: #{match.id}
          </Typography>
        </Stack>
      </CardContent>

      <Box sx={{ p: 3, pt: 0 }}>
        {showJoinButton && !isJoined && !isClosed && !isCanceled && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleJoin}
            disabled={isFull}
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: '0.95rem',
              background: isFull ? undefined : tokens.gradients.primary,
              boxShadow: tokens.shadows.sm,
              '&:hover': {
                boxShadow: tokens.shadows.md,
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: tokens.colors.neutral[300],
                color: tokens.colors.neutral[500],
              },
            }}
          >
            {isFull ? '정원 마감' : '매칭 참여하기'}
          </Button>
        )}

        {showCancelButton && isJoined && !isClosed && !isCanceled && (
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleCancel}
            startIcon={<CancelIcon sx={{ fontSize: 18 }} />}
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: '0.95rem',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                backgroundColor: tokens.colors.error[50],
                transform: 'translateY(-1px)',
              },
            }}
          >
            참여 취소
          </Button>
        )}

        {(isClosed || isCanceled) && (
          <Button
            variant="outlined"
            fullWidth
            disabled
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: '0.95rem',
              borderWidth: 2,
              color: tokens.colors.neutral[500],
              borderColor: tokens.colors.neutral[300],
            }}
          >
            {isCanceled ? '취소된 매칭' : '마감된 매칭'}
          </Button>
        )}
      </Box>
    </Card>
  );
}
