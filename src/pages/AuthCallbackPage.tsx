import { useEffect, useState } from 'react';
import { Box, Container, Paper, Typography, Button, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '../auth/callback';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await handleAuthCallback();
        if (result) {
          useAuthStore.getState().syncFromStorage();
        }
        navigate('/', { replace: true });
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : '인증 처리 중 오류가 발생했습니다.';
        setError(message);
        navigate('/login', { replace: true });
      }
    })();
  }, [navigate]);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight={700}>
              로그인 실패
            </Typography>
            <Typography color="text.secondary">{error}</Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => navigate('/', { replace: true })}>
                홈으로
              </Button>
              <Button variant="contained" onClick={() => navigate(-1)}>
                이전으로
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress />
          <Typography color="text.secondary">로그인 처리 중…</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
