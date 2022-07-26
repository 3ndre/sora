import PropTypes from 'prop-types';
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

Menu.propTypes = {
  // notDefault: PropTypes.bool,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
};


// ----------------------------------------------------------------------

export default function Menu({  open, onToggle }) {
 
  return (
    <RootStyle>
      {/* {notDefault && !open && <DotStyle />} */}
      
      <Tooltip title="Menu" placement="bottom">
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={onToggle}
        sx={{
          width: 40,
          height: 40,
          bgcolor: (theme) => alpha('#919EAB', theme.palette.action.focusOpacity),   
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'ep:menu'} width={20} height={20} />
      </IconButtonAnimate>
      </Tooltip>
   </RootStyle>
  );
}
