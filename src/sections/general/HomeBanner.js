import {Link as RouterLink} from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
//
import { MotivationIllustration } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

export default function HomeBanner() {

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome to,
          <br /> Sora!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
        An NFT gated social platform for your community and your content. Explore some of the popular gated communities right away.
        </Typography>

        <Button variant="contained" to="/explore" component={RouterLink}>Explore</Button>
      </CardContent>

      {isDesktop && <MotivationIllustration
        sx={{
        
          width: 250,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />}

    
      
    </RootStyle>
  );
}
