import React, { useState } from 'react';
import ABIS from '../../../abis/abis.json';
import { Box, Card, Avatar, Typography, Button } from '@mui/material';

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import {Stack} from "@mui/material";



// components
import Image from '../../../components/Image';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function SpaceMainCard({data, tokensCollected}) {

  console.log(data.price)

  
  const totalSupply = parseInt(data.supplypass);

  const [open, setOpen] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [message, setMessage] = useState("");

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    


  async function buyPass(tokenId) {
    try{

        setLoadButton(true);

        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
        const salePrice = ethers.utils.parseUnits(data.price.toString(), 'ether')

       
      
        //run the executeSale function
        let transaction = await contract.purchaseToken(data.listingId, 1, {value: salePrice});
        await transaction.wait();

        setMessage("You successfully bought the Memberpass!");
        setLoadButton(false);
        setOpen(true);
        window.location.reload();
        
    }
    catch(e) {
      setAlertMessage(e.message.replace('MetaMask Tx Signature: User denied transaction signature.', 'User denied transaction signature!'));
      setLoadButton(false);
      setOpen(true);
    }
}


  return (

    <>
<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {alertMessage ?
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%', color: 'white' }}>
          {alertMessage}
        </Alert>
        : 
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: 'white' }}>
        {message}
      </Alert>
        }
    
    </Snackbar>
  </Stack>

    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="/icons/shape-avatar.svg"
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
        {data.name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        {data.description}
      </Typography>

        {tokensCollected === totalSupply ? 
        <><Button variant="contained" disabled sx={{mb: 1}}>
           Sold out
          </Button>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            (Check the market for available memberpass)
          </Typography>
          </>

        : loadButton === true ?
        <>
        <Button variant="contained" disabled sx={{mb: 3}} >
                Processing...
        </Button>
        </>
        :
        <>
        <Button variant="contained" sx={{mb: 3}} onClick={() => buyPass(data.tokenId)}>
                Buy memberpass
        </Button>
        </>}

    
    </Card>
    </>
  );
}
