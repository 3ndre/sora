import { useAccount } from 'wagmi'
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography, Box} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import SpaceForm from '../sections/spaces/SpaceForm';
import SwitchNetwork from './SwitchNetwork';
import { useNetwork } from 'wagmi'
import Iconify from '../components/Iconify'
// ----------------------------------------------------------------------

export default function CreateSpace() {
  const { themeStretch } = useSettings();

  const { isConnected } = useAccount()

  const { chain } = useNetwork()

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Create space">
      <Container maxWidth={themeStretch ? false : 'xl'}>

      {chain.id !== 80001 ? <SwitchNetwork/> : null}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
       

        <Typography variant="h3" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}>
        <Iconify icon={'cil:room'} sx={{mr: 1}} /> Create new space
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
