
// @mui
import { Link as RouterLink } from 'react-router-dom';

import { Box, Card, Avatar, Typography, Stack, Button } from '@mui/material';


// components
import Image from '../../components/Image';
import SvgIconStyle from '../../components/SvgIconStyle';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


export default function SpaceCard({space}) {
  

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
       
        <Image src={space.image} alt="" ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {space.spacename}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {space.spacedescription}
      </Typography>

      <Stack sx={{py: 2}} alignItems="center">
      <Button to={`/space/${space.tokenId}`} variant="contained" component={RouterLink}>Join</Button>
      </Stack>


      
    </Card>
  );
}
