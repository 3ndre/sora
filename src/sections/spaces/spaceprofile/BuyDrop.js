import React, { useState , useEffect } from 'react';
import ABIS from '../../../abis/abis.json';
import { Avatar, Typography, Button, Grid } from '@mui/material';
import { useAccount } from 'wagmi';

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {Stack} from "@mui/material";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContentText from '@mui/material/DialogContentText';


// components
import SpaceTopCard from '../../../sections/card/SpaceTopCard';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





export default function BuyDrop({spaceDropById}) {


 const { address } = useAccount();


  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [message, setMessage] = useState("");
  const [collectedTokens, setCollectedTokens] = useState(null);
  

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };


      const handleClickOpen = () => {
        setOpen2(true);
      };
    
    
    const dropDetails = spaceDropById.drops[0] !== null ? spaceDropById.drops[0] : {};
    var dropId = dropDetails.dropId;


      async function getDropSize() {

        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);


        let transactionbyId = await contract.viewAllListings()

        const items = await Promise.all(transactionbyId.map(async i => {
                    
                    let item = {
                        dropId: parseInt(i.tokenId.toString()),
                        listingId: parseInt(i.listingId.toString()),
                    }
                    return item;
        }))

        const key = 'dropId';
        const arrayUniqueByKey = [...new Map(items.map(item => [item[key], item])).values()];
       
        
        const uniquelistingID = arrayUniqueByKey.find(x => x.dropId === dropId).listingId;

        
        const listedToken = await contract.viewListingById(uniquelistingID);
        const allBuyers = listedToken.buyer;
        const collected = allBuyers.length;

        setCollectedTokens(collected);
        
      }




  async function buyPass(dropId) {
    try{
        
        setLoadButton(true);

        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);


        let transactionbyId = await contract.viewAllListings()

        const items = await Promise.all(transactionbyId.map(async i => {
                    
                    let item = {
                        dropId: parseInt(i.tokenId.toString()),
                        listingId: parseInt(i.listingId.toString()),
                    }
                    return item;
        }))

        const key = 'dropId';
        const arrayUniqueByKey = [...new Map(items.map(item => [item[key], item])).values()];
       
        
        const uniquelistingID = arrayUniqueByKey.find(x => x.dropId === dropId).listingId;

        
  //-----------------------------------------------------------------------------------------------
        const buyPrice = dropDetails.price.toString();
        const salePrice = ethers.utils.parseUnits(buyPrice, 'ether')
        
      
        //run the executeSale function
        let transaction = await contract.purchaseToken(uniquelistingID, 1, {value: salePrice});
        await transaction.wait();

        setMessage("You successfully bought the drop!");
        setLoadButton(false);
        setOpen(false);
        setOpen(true);
        window.location.reload();
        
    }
    catch(e) {
      setAlertMessage(e.message.replace('MetaMask Tx Signature: User denied transaction signature.', 'User denied transaction signature!'));
      setLoadButton(false);
      setOpen(true);
      setOpen2(false);
    }
}




useEffect(() => {
    getDropSize();
}, [])
    

  return (

    <>
<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {alertMessage ?
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
        : 
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: 'white' }}>
        {message}
      </Alert>
        }
    
    </Snackbar>
  </Stack>

  <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Iconify icon={'fa6-solid:gift'} sx={{mr: 1}} /> Buy <span style={{color: '#00ac56'}}>{dropDetails.name}</span> Nft Drop
        </DialogTitle>
        <DialogContent sx={{mt:3}}>
          <DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
        

         
              <Grid item xs={12} sx={{mb: 2}}>    
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Avatar  src={dropDetails.image} style={{ height: '100px', width: '100px', borderStyle: 'dotted', borderColor: 'gray' }}/>
              </div>
              </Grid>

            <Grid item xs={12} sx={{mb: 1}} style={{display: 'flex', justifyContent: 'center'}}>
                <Typography variant="body">Description: <span style={{color: 'white'}}>{dropDetails.description}</span></Typography>
            </Grid>

            <Grid item xs={12} sx={{mb: 1}} style={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="body">
            Price: &nbsp;
            <span variant="title" color="text.primary">
              <span style={{color: 'white'}}>{dropDetails.price} Matic</span>
              </span>  
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{mb: 1}} style={{display: 'flex', justifyContent: 'center'}}>
                <Typography variant="body">Supply: <span style={{color: 'white'}}>{dropDetails.supply}</span></Typography>
            </Grid>



        {dropDetails.creatorAddress === address ? null :
        <>

        {collectedTokens === dropDetails.supply ? 
        <><Button variant="contained" disabled sx={{mb: 1}}>
           Sold out
          </Button>
        
          </>

        : loadButton === true ?
        <>
        <Button variant="contained" disabled sx={{mb: 1}} >
                Processing...
        </Button>
        </>
        :
        <>
        <Button variant="contained" sx={{mb: 1}}  onClick={() => buyPass(dropId)} >
                Buy Drop
        </Button>
        </>}
        </>}
      
    
    </DialogContentText>
        </DialogContent>
      </Dialog>


         <span onClick={handleClickOpen} style={{cursor: 'pointer'}}  >
            <SpaceTopCard title="Drops available" icon={'fa6-solid:gift'} />
            </span>



    </>
  );
}
