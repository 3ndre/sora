
import { useAccount } from 'wagmi'
import {useState, useEffect} from 'react';
// @mui
import { Box } from '@mui/material';

//
import NFTCard from './NFTCard';


export default function NFTList() {

  const [nfts, setNfts] = useState([]);

  const { isConnected, address } = useAccount()

  const getNftData = async () => {


    if (!isConnected)  return;

    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${address}`);
    const data = await response.json();
    
    setNfts(data.items);


  }

  useEffect(() => {
    getNftData();
  }, [address])


  
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
     
       {nfts.map((nft) => {
              return (       

                <NFTCard key={nft.id} nft={nft}/>
             
           
            )}
            )}
    </Box>
  );
}
