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


//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import {Stack} from "@mui/material";


//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const DropBuy = ({listingId, availableamount, price, completed}) => {


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [buying, setBuying] = useState(false);

    const [formParams, updateFormParams] = useState({ amount: ''});
    const ethers = require("ethers");
    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');


    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
    };


    async function buylistedToken(e, listingId) {
      e.preventDefault();
  
      try {

          setBuying(true);
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
  
          const salePrice = ethers.utils.parseUnits(price, 'ether')
  
          let buylisting = await contract.purchaseToken(listingId, formParams.amount, {value: salePrice});
          await buylisting.wait();

        
  
          setMessage('Drop bought successfully!');
          setOpen2(true);
          updateFormParams({ amount: ''});
          setOpen(false);
          setBuying(false);
          
  
      } catch (e) {
        setAlertMessage(e.message.replace('MetaMask Tx Signature: User denied transaction signature.', 'User denied transaction signature!'));
        setOpen(false);
        updateFormParams({ amount: ''});
        setOpen2(true);
        setBuying(false);
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


<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
      {alertMessage ?
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
        : 
        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%', color: 'white' }}>
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
          {"Buy Drop"} <Typography variant="subtitle" sx={{color: 'gray'}}>(<span style={{color: '#00ac56'}}>{availableamount} available</span>)</Typography>
        </DialogTitle>

        <DialogContent>

        


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

        {buying === true ?
          <Button disabled form="buy-form-id"  autoFocus>
           Processing...
          </Button>
          :  <Button type="submit" form="buy-form-id"  autoFocus>
          Buy
         </Button>}



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

export default DropBuy;
