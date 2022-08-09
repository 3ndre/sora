import { useState } from 'react';
import ABIS from '../../../abis/abis.json';
import { Box, Card, Avatar, Typography, Button } from '@mui/material';


// components
import Image from '../../../components/Image';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------


export default function SpaceMainCard({data, tokensCollected}) {

  const [message, updateMessage] = useState("");


  async function buyPass(tokenId) {
    try{
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
        const salePrice = ethers.utils.parseUnits(data.price, 'ether')
        updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
        //run the executeSale function
        let transaction = await contract.purchaseToken(data.listingId, 1, {value: salePrice});
        await transaction.wait();

        alert('You successfully bought the NFT!');
        updateMessage("");
    }
    catch(e) {
        alert("Upload Error"+e)
    }
}


  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt=""
          src={data.image}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
      
        <Image src={data.image} alt="" ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {data.spacename}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        {data.spacedescription}
      </Typography>

        {tokensCollected > 0 ? null : 
        <Button variant="contained" sx={{mb: 3}} onClick={() => buyPass(data.tokenId)}>
                Buy memberpass
        </Button>}


      <div>{message}</div>

    
    </Card>
  );
}
