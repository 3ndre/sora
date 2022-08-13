import React from 'react';
import { useAccount } from 'wagmi';
import axios from "axios";
import { useState } from "react";
// @mui
import { Box, Card, Button, TextField, Stack} from '@mui/material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


// ----------------------------------------------------------------------


//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SpacePostInput({tokenId}) {

  const { address } = useAccount()

  const userSignature = JSON.parse(localStorage.getItem('signature'))

  const [formParams, updateFormParams] = useState({ text: ''});

  const [spacepostid, setSpacePostId] = useState(null);
  const [dataFetched, updateFetched] = useState(false);

  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(false);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  async function getAllSpaces() {
   
    let meta = await axios.get('http://localhost:5000/api/spaces');

   const space_id = meta.data.find(x => x.tokenId === parseInt(tokenId))._id;

    updateFetched(true);
    setSpacePostId(space_id); //getting space Id for backend
}



  function createSpacePost() {
      
    var postData = {
      text: formParams.text,
      wallet: address,
      signature: userSignature,
      members: checked,
    };
    
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": userSignature.toString(),
      }
    };
    
    
    axios.post(`http://localhost:5000/api/spaces/post/${spacepostid}`, postData, axiosConfig)
    .then((res) => {
      setAlertMessage("")
      setMessage("Post created successfully!");
      setOpen(true);
      updateFormParams({ text: ''});
      window.location.reload();
    })
    .catch((err) => {
      setMessage("");
      console.log("Post creation unsuccessful", err );
      setAlertMessage("Couldn't post. Please try again later.");
      setOpen(true);
      updateFormParams({ text: ''});
    })
  }




if(!dataFetched)
    getAllSpaces();
  

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


    <Card sx={{ p: 2 }}>
      <TextField
        multiline
        fullWidth
        rows={3}
        placeholder="Share what's on your mind..."
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
          },
        }}
        id="text"
        onChange={e => updateFormParams({...formParams, text: e.target.value})} value={formParams.text}
      />

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
          <Box sx={{ display: 'flex' }}>
          <FormControlLabel
           control={  
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          } label="Members only"  sx={{color: checked === true ? '#00ac56' : 'gray'}}/>
        
          
        </Box>
        <Button variant="contained" onClick={createSpacePost}>Post</Button>
      </Box>

      
    </Card>
    </>
  );
}
