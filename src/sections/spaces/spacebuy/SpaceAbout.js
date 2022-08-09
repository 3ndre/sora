import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

SpaceAbout.propTypes = {
  profile: PropTypes.object,
};

export default function SpaceAbout({ data }) {
  

  return (
    <Card>
      <CardHeader title="Details" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{data.spacedescription}</Typography>

        <Stack direction="row">
          <IconStyle icon={'cryptocurrency:matic'} />
          <Typography variant="body2">
            Price: &nbsp;
            <span variant="subtitle2" color="text.primary">
              {data.price} Matic
            </span>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'la:address-card-solid'} />
          <Typography variant="body2">Created by: {data.seller}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'akar-icons:link-chain'} />
          <Typography variant="body2">Contract address: {data.contractAddress}</Typography>
        </Stack>

       
      </Stack>
    </Card>
  );
}
