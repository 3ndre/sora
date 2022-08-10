import React, { useState } from "react";
import ABIS from '../../abis/abis.json';


//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Grid,Typography, Stack} from "@mui/material";
import TextField from '@mui/material/TextField';
//-------------------------------------------

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//---------------------------------------------------------

import Iconify from '../../components/Iconify';



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const ListMemberpass = ({data, tokenamount}) => {


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false); //alert
    const [listingLoad, setListingLoad] = useState(false); //listing loading

    const [formParams, updateFormParams] = useState({ amount: '', price: ''});
    const ethers = require("ethers");
    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');


    async function listToken(e) {
      e.preventDefault();
  
      try {

          setListingLoad(true);
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
  
          const priced = ethers.utils.parseEther(formParams.price, 'ether');
          const privateAddress = [];
  
          let listing = await contract.listToken(data.contractAddress, data.tokenId, formParams.amount.toString(), priced, privateAddress);
          await listing.wait();

        
  
          setMessage('Memberpass listed successfully!');
          setListingLoad(false);
          updateFormParams({ price: '', amount: ''});
          setOpen(false);
          setOpen2(true);
  
      } catch (e) {
        setOpen(false);
        setListingLoad(false);
        updateFormParams({ price: '', amount: ''});
        setAlertMessage(e.message.replace('MetaMask Tx Signature: User denied transaction signature.', 'User denied transaction signature!'));
        setOpen2(true);
      }
    }


  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };





  return (
    <>



<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>

        {alertMessage ?
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
        : 
        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
        }
    
    </Snackbar>
  </Stack>



      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
         <DialogTitle id="alert-dialog-title" >
          {"List Memberpass"}
        </DialogTitle>

        <DialogContent>

       

          <Typography variant="subtitle" sx={{color: 'gray'}}>(You have <span style={{color: '#00ac56'}}>{tokenamount} memberpass</span>)</Typography>


        <Grid style={{ maxWidth: 450, padding: "5px 5px", margin: "0 auto" }}>

        <Typography variant="body2" style={{color: 'white'}} component="p" gutterBottom>
          
          </Typography> 


      
                <form id="listing-form-id" onSubmit={listToken}>
            <Grid container spacing={1} style={{color: 'white', marginTop: '8px'}}>


                <Grid item xs={12}>
                    <TextField type="number" name="amount" sx={{ input: { color: 'black', background: 'white' } }} InputProps={{ inputProps: { min: 1, max: tokenamount } }} InputLabelProps={{ style: { color: 'black' } }} placeholder="1" label="Amount" variant="filled" fullWidth required autoComplete='off' value={formParams.amount} onChange={e => updateFormParams({...formParams, amount: e.target.value})}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField type="number" name="price" sx={{ input: { color: 'black', background: 'white' } }} InputLabelProps={{ style: { color: 'black' } }} placeholder="0.05 Eth" label="Price" variant="filled" fullWidth required autoComplete='off' value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}/>
                </Grid>


              

                </Grid>

            </form>
     
    </Grid>

        </DialogContent>
        <DialogActions>

          {listingLoad === true ? 

           <Button type="submit" disabled autoFocus>
             Listing...
          </Button>
          
          :
          <>
          <Button onClick={handleClose} style={{color: 'white'}}>Cancel</Button>

          <Button type="submit" form="listing-form-id"  autoFocus>
           List
          </Button>
          </>
          }



        </DialogActions>
      </Dialog>


    

      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
              Sell memberpass
            </Button>
    </>
  );
};

export default ListMemberpass;
