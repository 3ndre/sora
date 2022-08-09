
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------


export default function SpaceMemberInfo({ data, tokensCollected }) {
  

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(data.supplypass)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Memberpass
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(tokensCollected)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Collected
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
