import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';

// components
import Image from '../../../components/Image';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

SpaceMainCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function SpaceMainCard() {
  

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt=""
          src=""
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
      
        <Image src="" alt="" ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        Soraspace
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Soraspace description
      </Typography>

    
    </Card>
  );
}
