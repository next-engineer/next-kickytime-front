'use client';

import type React from 'react';

import { Typography, TextField, Button, Paper, Box, Alert, Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLogin } from '../store/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API: AWS Cognito Hosted UI URL for Sign In
    // 실제로는 Cognito 로그인 플로우로 리다이렉트
    alert('실제 로그인은 AWS Cognito를 통해 구현됩니다.');
  };

  const handleMockLogin = (userType: 'admin' | 'user') => {
    mockLogin(userType);
    navigate('/matches');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          로그인
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          실제 로그인은 AWS Cognito OAuth2를 통해 구현됩니다.
        </Alert>

        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            name="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mb: 2 }}>
            로그인
          </Button>

          <Button variant="text" fullWidth onClick={() => navigate('/signup')} sx={{ mb: 3 }}>
            계정이 없으신가요? 회원가입
          </Button>
        </form>

        <Alert severity="warning" sx={{ mb: 2 }}>
          데모용 로그인 (실제 인증 미구현)
        </Alert>

        <Stack spacing={1}>
          <Button variant="outlined" onClick={() => handleMockLogin('user')} fullWidth>
            일반 사용자로 로그인
          </Button>
          <Button variant="outlined" onClick={() => handleMockLogin('admin')} fullWidth>
            관리자로 로그인
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
