import { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function Home() {
  const { themeStretch } = useSettings();


  const [spaceData, setSpaceData] = useState(null);

  //----------------------------------------------------------------------
  async function getSpace() {
   
    let meta = await axios.get('http://localhost:5000/api/spaces');

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

            
          </Grid>
      </Container>
    </Page>
  );
}
