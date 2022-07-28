
import { Link as RouterLink } from 'react-router-dom';

//wagmi

import { useAccount } from 'wagmi'

// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Button } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER } from '../../../config';
// components
import Logo from '../../../components/Logo';


//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import ChatPopover from './ChatPopover';
// import NotificationsPopover from './NotificationsPopover';
import Settings from '../../../components/settings';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ theme }) => ({
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
}));

//----------------------------------------------------------------------

export default function DashboardHeader() {
  
  const isDesktop = useResponsive('up', 'lg');

  const { isConnected } = useAccount()

  return (
    <RootStyle>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && <Logo sx={{ mr: 1 }}/>}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" >

        {isConnected ? null : <>
        {isDesktop && <Button sx={{ mr: 2 }} to="/connect" fullWidth variant="contained" component={RouterLink}>Connect Wallet</Button>}
        {!isDesktop && <Button sx={{ mr: 1 }} to="/connect" fullWidth variant="contained" component={RouterLink}>Connect</Button>}
        </>
        }
        
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          {/* <ChatPopover/> */}
          {isConnected && <AccountPopover />}
          <Settings/>
        </Stack>
        
      </Toolbar>
    </RootStyle>
  );
}
