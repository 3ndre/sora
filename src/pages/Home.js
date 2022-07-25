// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HomeBanner from '../sections/general/HomeBanner';
import HomeSpotlight from '../sections/general/HomeSpotlight';
import HomeTrending from '../sections/general/HomeTrending';

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <HomeBanner/>
            </Grid>

            <Grid item xs={12} md={4}>
              <HomeSpotlight />
            </Grid>

            <Grid item xs={12}>
              <HomeTrending />
            </Grid>

            
          </Grid>
      </Container>
    </Page>
  );
}
