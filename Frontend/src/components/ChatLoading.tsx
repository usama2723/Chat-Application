import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const ChatLoading = () => {
  return (
      <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} sx={{ backgroundColor: '#2a3942' }} />
          <Skeleton variant="circular" width={40} height={40} sx={{ backgroundColor: '#2a3942' }} />
          <Skeleton variant="rectangular" width={210} height={60} sx={{ backgroundColor: '#2a3942' }} />
          <Skeleton variant="rounded" width={210} height={60} sx={{ backgroundColor: '#2a3942' }} />
      </Stack>
  )
}

export default ChatLoading
