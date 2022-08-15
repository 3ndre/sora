import React from 'react';
// @mui
import { Card, Container } from '@mui/material';

// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import ChatWindow  from '../spacechat/ChatWindow';
import SpaceTopCard from '../../../sections/card/SpaceTopCard';
import Dialog from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export default function SpaceChat({tokenamount, spaceDropById}) {
  const { themeStretch } = useSettings();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

 
  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <Dialog onClose={handleClose} open={open}>
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatWindow tokenamount={tokenamount} spaceDropById={spaceDropById}/>
        </Card>
        </Dialog>
        
      </Container>
      <span onClick={handleOpen} style={{cursor: 'pointer'}} >
        <SpaceTopCard title="Chat room" color='info' icon={'bi:chat-left-text-fill'}/>
        </span>
    </Page>
  );
}
