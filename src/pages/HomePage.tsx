import { Button, Stack, Typography } from '@mui/material';
import { useAppStore } from '../store/useAppStore';

export default function HomePage() {
  const { count, inc, reset } = useAppStore();
  return (
    <Stack spacing={2} alignItems="flex-start" p={3}>
      <Typography variant="h5">Kickytime Front — Home</Typography>
      <Typography>count: {count}</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={inc}>
          +1
        </Button>
        <Button variant="outlined" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
