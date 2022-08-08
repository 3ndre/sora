import PropTypes from 'prop-types';
// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

SpaceMemberInfo.propTypes = {
  profile: PropTypes.shape({
    follower: PropTypes.number,
    following: PropTypes.number,
  }),
};

export default function SpaceMemberInfo({ profile }) {
  const { follower, following } = profile;

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Memberpass
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(following)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Members
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
