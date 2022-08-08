import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';


const RootStyle = styled('span')(({ theme }) => ({
  
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '24px 0 20px 24px',

}));


// const DotStyle = styled('span')(({ theme }) => ({
//   top: 8,
//   width: 8,
//   height: 8,
//   right: 10,
//   borderRadius: '50%',
//   position: 'absolute',
//   backgroundColor: theme.palette.error.main,
// }));

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function CreatePopover() {
 
  return (
    <RootStyle>
      
      <Tooltip title="Create" placement="bottom">
      <IconButtonAnimate
      to="/create"
        color={'default'}
        sx={{
          mr: 1,
          width: 40,
          height: 40,
          bgcolor: (theme) => alpha('#919EAB', theme.palette.action.focusOpacity),   
          
        }}
        component={RouterLink}
      >
        <Iconify icon={'akar-icons:plus'} width={20} height={20} />
      </IconButtonAnimate>
      </Tooltip>
   </RootStyle>
  );
}
