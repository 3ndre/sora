import { capitalCase } from 'change-case';
import { useAccount } from 'wagmi'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';

// hooks
import useAuth from '../hooks/useAuth';
import useTabs from '../hooks/useTabs';
import useSettings from '../hooks/useSettings';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

// sections
import {
  Profile,
  ProfileCover,
} from '../sections/user/profile';
import SwitchNetwork from './SwitchNetwork';
import { useNetwork } from 'wagmi'


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

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('collected');


  const PROFILE_TABS = [
    {
      value: 'collected',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile  />,
    },
    
  ];




  if (!isConnected) {
    return <Navigate to="/connect" />;
  }


  return (
    <Page title="Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>

      {chain.id !== 80001 ? <SwitchNetwork/> : null}
       
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover />

          <TabsWrapperStyle>
            <Tabs
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
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
