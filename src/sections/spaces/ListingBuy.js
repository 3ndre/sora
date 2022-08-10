import React, { useState } from "react";
import ABIS from '../../abis/abis.json';


//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Grid,Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
//-------------------------------------------

import Iconify from '../../components/Iconify';





const ListingBuy = ({listingId, availableamount, price, completed}) => {


    const [open, setOpen] = useState(false);

    const [formParams, updateFormParams] = useState({ amount: ''});
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');


    async function buylistedToken(e, listingId) {
      e.preventDefault();
  
      try {
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
  
          const salePrice = ethers.utils.parseUnits(price, 'ether')
  
          let buylisting = await contract.purchaseToken(listingId, formParams.amount, {value: salePrice});
          await buylisting.wait();

        
  
          updateMessage('Memberpass bought successfully!');
          updateMessage('');
          updateFormParams({ amount: ''});
          setOpen(false);
          
  
      } catch (e) {
          console.log(e);
      }
    }


  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
  };





  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
         <DialogTitle id="alert-dialog-title" >
          {"Buy Memberpass"} <Typography variant="subtitle" sx={{color: 'gray'}}>(<span style={{color: '#00ac56'}}>{availableamount} available</span>)</Typography>
        </DialogTitle>

        <DialogContent>

        <Typography variant="subtitle" sx={{color: 'gray'}}>{message}</Typography>

          


        <Grid style={{ maxWidth: 450, padding: "5px 5px", margin: "0 auto" }}>

        <Typography variant="body2" style={{color: 'white'}} component="p" gutterBottom>
          
          </Typography> 


      
                <form id="buy-form-id" onSubmit={(e) => buylistedToken(e, listingId)}>
            <Grid container spacing={1} style={{color: 'white', marginTop: '8px'}}>


                <Grid item xs={12}>
                    <TextField type="number" name="amount" sx={{ input: { color: 'black', background: 'white' } }} InputProps={{ inputProps: { min: 1, max: availableamount } }} InputLabelProps={{ style: { color: 'black' } }} placeholder="1" label="Amount" variant="filled" fullWidth required autoComplete='off' value={formParams.amount} onChange={e => updateFormParams({...formParams, amount: e.target.value})}/>
                </Grid>

              

                </Grid>

            </form>
     
    </Grid>

        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} style={{color: 'white'}}>Cancel</Button>

          <Button type="submit" form="buy-form-id"  autoFocus>
           Buy
          </Button>



        </DialogActions>
      </Dialog>


    
      {completed === true ? 
      <Button variant="contained" startIcon={<Iconify icon="carbon:not-available" />} disabled>
              Not available
            </Button>
            : 

            <Button variant="contained" startIcon={<Iconify icon="uiw:pay" />} onClick={handleClickOpen}>
              Buy
            </Button>}

    </>
  );
};

export default ListingBuy;
