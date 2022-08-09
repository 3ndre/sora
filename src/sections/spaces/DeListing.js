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





const DeListing = ({listingId, completed}) => {


   
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');


    async function delistToken(e) {
      e.preventDefault();
  
      try {
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
  
  
          let delisting = await contract.deleteListing(listingId);
          await delisting.wait();

        
  
          updateMessage('Delisted successfully!');
          updateMessage('');
          
  
      } catch (e) {
          console.log(e);
      }
    }


  



  return (
    <>

{completed === true ? 
      <Button variant="contained" color="error" disabled startIcon={<Iconify icon="gg:remove" />}>
              Delisted
    </Button>

    : 

      <Button variant="contained" color="error" startIcon={<Iconify icon="gg:remove" />} onClick={delistToken}>
        Delist
    </Button>

}
    </>
  );
};

export default DeListing;
