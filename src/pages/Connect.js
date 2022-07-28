

import { useAccount, useConnect } from 'wagmi'


import { Navigate } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button} from '@mui/material';
// layouts
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// components
import Page from '../components/Page';




// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
const Connect = () => {


  const { isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()



  if (isConnected) {
    return <Navigate to="/profile" />;
  }

  

  return (
    <Page title="Connect Wallet" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center' }}>

            
               
                    <>
                    <Typography variant="h3" paragraph>
                    Connect Wallet
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                      Choose how you want to connect.
                  </Typography>

          
                </>
             
      {connectors.map((connector) => (
         <Button  disabled={!connector.ready}
         key={connector.id}
         startIcon={<img alt="Metamask Icon" height={26} width={26} src="/icons/metamask.svg" />} fullWidth size="large" style={{background: '#212B36', color: 'white'}}
        
         
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
  
           
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default Connect;
