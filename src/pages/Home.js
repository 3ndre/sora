import { useState} from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Grid, Button } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HomeBanner from '../sections/general/HomeBanner';
import HomeSpotlight from '../sections/general/HomeSpotlight';
import HomeTrending from '../sections/general/HomeTrending';
import Category from '../sections/general/Category';

// ----------------------------------------------------------------------

export default function Home() {
  const { themeStretch } = useSettings();


  const [spaceData, setSpaceData] = useState(null);

  //----------------------------------------------------------------------
  async function getSpace() {
   
    let meta = await axios.get('https://sora-backend.glitch.me/api/spaces');

    setSpaceData(meta.data); //getting space data 
}


//----------------------------------------------------------------------
if(spaceData === null)
  getSpace();




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
              <HomeTrending spaceData={spaceData} />
            </Grid>

            <Grid item xs={12}>
              <Category spaceData={spaceData} />
            </Grid>


        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}} >
            <Button to="/explore" variant="contained" endIcon={<Iconify icon="fluent-emoji-flat:compass" />} size="large" sx={{mt: 5}} component={RouterLink}>Explore</Button>
            </Grid>
            
          </Grid>
      </Container>
    </Page>
  );
}
