import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const ChatLoading = () => {
  return (
      <Stack m={3} spacing={3}>
          <Skeleton variant="rectangular" width={395} height={60} sx={{ backgroundColor: '#2a3942' }} />
          <Skeleton variant="rectangular" width={395} height={60} sx={{ backgroundColor: '#2a3942' }} />
          <Skeleton variant="rectangular" width={395} height={60} sx={{ backgroundColor: '#2a3942' }} />
          <Skeleton variant="rectangular" width={395} height={60} sx={{ backgroundColor: '#2a3942' }} />
      </Stack>
  )
}

export default ChatLoading
