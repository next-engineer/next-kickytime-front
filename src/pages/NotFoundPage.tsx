'use client';

import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        페이지를 찾을 수 없습니다
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} size="large">
        홈으로 돌아가기
      </Button>
    </Box>
  );
}
