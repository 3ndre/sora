import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
} from '@mui/material';

// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components

import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';


// ----------------------------------------------------------------------

SpacePostCard.propTypes = {
  post: PropTypes.object,
};

export default function SpacePostCard() {
 



  const [isLiked, setLiked] = useState(null);

  const [likes, setLikes] = useState(0);


  

  const handleLike = () => {
    setLiked(true);
    setLikes(1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes(0);
  };




  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink} style={{textDecoration: 'none'}}>
            Doraemon
         
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            19th july
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={1} sx={{ p: 2 }}>

        <Typography sx={{ p: 1 }}>Welcome to the community</Typography>

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(10)}
            sx={{ minWidth: 72, mr: 0 }}
          />
         
          <Box sx={{ flexGrow: 1 }} />
          <IconButton >
            <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

      </Stack>
    </Card>
  );
}
