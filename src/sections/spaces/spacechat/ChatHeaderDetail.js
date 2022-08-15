import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Avatar, Typography, AvatarGroup, IconButton } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import BadgeStatus from '../../../components/BadgeStatus';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
}));

// ----------------------------------------------------------------------

ChatHeaderDetail.propTypes = {
  participants: PropTypes.array.isRequired,
};

export default function ChatHeaderDetail({spaceDropById}) {
  

  return (
    <RootStyle>
     <OneAvatar spaceDropById={spaceDropById}/>

      
    </RootStyle>
  );
}

// ----------------------------------------------------------------------


function OneAvatar({spaceDropById}) {

 
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src={spaceDropById.image} alt="" />
        <BadgeStatus status="active" sx={{ position: 'absolute', right: 2, bottom: 2 }} />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" style={{textTransform: 'capitalize'}}>{spaceDropById.name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Members only
        </Typography>
      </Box>
    </Box>
  );
}
