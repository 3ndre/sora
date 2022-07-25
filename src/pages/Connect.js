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

export default function Connect() {
  

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

                <Button startIcon={<img alt="Metamask Icon" height={26} width={26} src="/icons/metamask.svg" />} fullWidth size="large" style={{background: '#212B36', color: 'white'}}>
                   Metamask
                </Button>
                

                </>
           
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
