import React, { useState } from "react";
import ABIS from '../../abis/abis.json';


//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";


//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import {Stack} from "@mui/material";

//-------------------------------------------

import Iconify from '../../components/Iconify';



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const DeListDrop = ({listingId, completed}) => {


    const [open, setOpen] = useState(false);
    const ethers = require("ethers");
    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    async function delistToken(e) {
      e.preventDefault();
  
      try {
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
  
  
          let DeListDrop = await contract.deleteListing(listingId);
          await DeListDrop.wait();

        
  
          setMessage('Delisted successfully!');
          setOpen(true);
         
          
  
      } catch (e) {
        setAlertMessage(e.message.replace('MetaMask Tx Signature: User denied transaction signature.', 'User denied transaction signature!'));
        setOpen(true);
      }
    }


  



  return (
    <>

<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {alertMessage ?
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
        : 
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
        }
    
    </Snackbar>
  </Stack>

{completed === true ? 
      <Button variant="contained" color="error" disabled startIcon={<Iconify icon="carbon:not-available" />}>
              Not available
    </Button>

    : 

      <Button variant="contained" color="error" startIcon={<Iconify icon="gg:remove" />} onClick={delistToken}>
        Delist
    </Button>

}
    </>
  );
};

export default DeListDrop;
