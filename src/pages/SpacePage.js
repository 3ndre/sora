import { capitalCase } from 'change-case';
import { useAccount } from 'wagmi'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Typography } from '@mui/material';

// hooks
import useAuth from '../hooks/useAuth';
import useTabs from '../hooks/useTabs';
import useSettings from '../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../_mock';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

// sections

import {
    SpaceProfile,
    SpaceCover,
    SpaceMembers,
  ProfileGallery,
  SpaceMarket,
} from '../sections/spaces/spaceprofile';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function SpacePage() {
  const { themeStretch } = useSettings();

  const { isConnected } = useAccount()

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('all posts');

  const [findFriends, setFindFriends] = useState('');

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'all posts',
      icon: <Iconify icon={'gridicons:posts'} width={20} height={20} />,
      component: <SpaceProfile  myProfile={_userAbout} posts={_userFeeds}/>,
    },
    {
      value: 'market',
      icon: <Iconify icon={'healthicons:market-stall'} width={20} height={20} />,
      component: <SpaceMarket followers={_userFollowers} />,
    },
    {
      value: 'holders',
      icon: <Iconify icon={'icon-park-solid:passport'} width={20} height={20} />,
      component: <SpaceMembers friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} />,
    },
   
  ];


  

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }


  return (
    <Page title="Space">
      <Container maxWidth={themeStretch ? false : 'lg'}>

          <Typography variant="h3" sx={{mb: 3}}>
                  Soraspace
                </Typography>
       
       
            <Tabs
            sx={{
              mb: 3,
              position: 'relative',
            }}
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
            
            
          

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
