'use client';

import type React from 'react';

import { Typography, TextField, Button, Paper, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API: AWS Cognito Hosted UI URL for Sign Up
    // 실제로는 Cognito 회원가입 플로우로 리다이렉트
    alert('실제 회원가입은 AWS Cognito를 통해 구현됩니다.');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          회원가입
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          실제 회원가입은 AWS Cognito를 통해 구현됩니다. 이메일 검증 절차가 포함됩니다.
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
            name="nickname"
            label="닉네임"
            value={formData.nickname}
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
            sx={{ mb: 2 }}
          />

          <TextField
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mb: 2 }}>
            회원가입
          </Button>

          <Button variant="text" fullWidth onClick={() => navigate('/login')}>
            이미 계정이 있으신가요? 로그인
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
