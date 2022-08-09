import { useAccount } from 'wagmi'
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography, Box } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import SpaceForm from '../sections/spaces/SpaceForm';


// ----------------------------------------------------------------------

export default function CreateSpace() {
  const { themeStretch } = useSettings();

  const { isConnected } = useAccount()

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Create space">
      <Container maxWidth={themeStretch ? false : 'xl'}>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3">
           Create new space
        </Typography>

        <Typography variant="body" sx={{mb: 3, color: 'gray'}}>
          (Create a private space for your community with <span style={{color: '#00ac56'}}>Memberpass NFT</span>)
        </Typography>
      
        </Box>
        </Box>


        <SpaceForm/>
      </Container>
    </Page>
  );
}
