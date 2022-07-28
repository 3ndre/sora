import {useState, useEffect} from 'react';
// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import NftCard from './profile/NftCard';


// ----------------------------------------------------------------------

export default function Profile() {
  const { themeStretch } = useSettings();
  
  const [nfts, setNfts] = useState([]);

  const walletAddress = localStorage.getItem('walletAddress');

  const getNftData = async () => {

   

    if (walletAddress === null || '')  return;

    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`);
    const data = await response.json();
    
    setNfts(data.items);


  }

  useEffect(() => {
    getNftData();
  }, [walletAddress])

  return (
    <Page title="Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

            {nfts.map((nft) => {
              return (
              <Grid item xs={12} md={8} key={nft.id}>

                <NftCard nft={nft}/>
             
            </Grid>
            )}
            )}

            
            
          </Grid>
      </Container>
    </Page>
  );
}
