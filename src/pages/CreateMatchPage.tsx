'use client';

import type React from 'react';

import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Stack,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '../store/useMatchStore';
import { useAuthStore } from '../store/useAuthStore';
import type { CreateMatchRequest, Match } from '../types';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import { tokens } from '../styles/theme';

export default function CreateMatchPage() {
  const navigate = useNavigate();
  const { addMatch } = useMatchStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState<CreateMatchRequest>({
    location: '',
    matchTime: '',
    maxPlayers: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'maxPlayers' ? Number.parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    // API: POST /api/matches
    // (Authorization: Bearer <access_token>)
    // Body: formData

    const newMatch: Match = {
      id: Date.now(), // Mock ID generation
      ...formData,
      matchStatus: 'OPEN',
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      currentPlayers: 0,
    };

    addMatch(newMatch);
    navigate('/matches');
  };

  // Get current datetime for min attribute
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      {/* Header */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: tokens.gradients.hero,
          border: `1px solid ${tokens.colors.neutral[200]}`,
          borderRadius: tokens.borderRadius.xl,
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            background: tokens.gradients.primary,
            mx: 'auto',
            mb: 2,
            boxShadow: tokens.shadows.md,
          }}
        >
          <AddIcon sx={{ fontSize: 28, color: 'white' }} />
        </Avatar>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: tokens.colors.neutral[900],
            mb: 1,
          }}
        >
          새 매칭 개설
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          새로운 풋살 매칭을 만들어 함께할 팀원들을 모집하세요
        </Typography>
      </Paper>

      {/* Form */}
      <Paper
        sx={{
          p: 4,
          border: `1px solid ${tokens.colors.neutral[200]}`,
          borderRadius: tokens.borderRadius.xl,
          boxShadow: tokens.shadows.sm,
        }}
      >
        <Alert
          severity="info"
          sx={{
            mb: 4,
            borderRadius: tokens.borderRadius.md,
            fontWeight: 500,
          }}
        >
          매칭 정보를 정확히 입력해주세요. 참여자들이 쉽게 찾을 수 있도록 도와줍니다.
        </Alert>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Location Field */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <LocationOnIcon sx={{ fontSize: 20, color: tokens.colors.primary[600] }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  경기 장소
                </Typography>
              </Stack>
              <TextField
                name="location"
                placeholder="예: 서울 강남구 OO풋살장 A코트"
                value={formData.location}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '1rem',
                  },
                }}
              />
            </Box>

            <Divider />

            {/* Time Field */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <AccessTimeIcon sx={{ fontSize: 20, color: tokens.colors.info[600] }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  경기 시간
                </Typography>
              </Stack>
              <TextField
                name="matchTime"
                type="datetime-local"
                value={formData.matchTime}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: minDateTime }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '1rem',
                  },
                }}
              />
            </Box>

            <Divider />

            {/* Max Players Field */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 20, color: tokens.colors.success[600] }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  최대 참여 인원
                </Typography>
              </Stack>
              <TextField
                name="maxPlayers"
                type="number"
                value={formData.maxPlayers}
                onChange={handleChange}
                required
                inputProps={{ min: 2, max: 22 }}
                helperText="2명 이상 22명 이하로 설정해주세요"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '1rem',
                  },
                }}
              />
            </Box>

            <Divider />

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 2,
                  background: tokens.gradients.primary,
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: tokens.shadows.md,
                  '&:hover': {
                    boxShadow: tokens.shadows.lg,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                매칭 개설하기 ⚽
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => navigate('/matches')}
                sx={{
                  py: 2,
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: tokens.colors.neutral[50],
                  },
                }}
              >
                취소
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
