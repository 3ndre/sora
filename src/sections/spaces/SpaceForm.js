import * as React from 'react';
import { useState } from 'react';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../Pinata";
import ABIS from '../../abis/abis.json';


// mui
import { Card, Grid, Stack, Typography, TextField, Avatar, Button } from '@mui/material';

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//---------------------------------------------------------

//Dialog

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
//-------------------------------------------------


import Iconify from '../../components/Iconify';




// ----------------------------------------------------------------------

//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function SpaceForm() {

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleClose2 = () => {
    setOpen2(false);
  };

  const [formParams, updateFormParams] = useState({ spacename: '', spacedescription: '', price: '', supplypass: ''});
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");

 
  const [message1, setMessage1] = useState('Uploading image...');
  const [message2, setMessage2] = useState('Uploading metadata...');
  const [message3, setMessage3] = useState('Confirming transaction...');

  const [alertMessage, setAlertMessage] = useState('');
  const [imgPre, setImgPre] = useState(null);
  
  async function onChangeFile (e) {
    var files = e.target.files[0];

    setImgPre(URL.createObjectURL(files))
    

    try {
        const response = await uploadFileToIPFS(files);
        if(response.success === true) {
            setMessage1('Image uploaded successfully!');
            setFileURL(response.pinataURL);
        }
    } catch (e) {
        setAlertMessage('Error uploading image to IPFS!');
    }
}

  async function uploadMetadataToIPFS() {

    const {spacename, spacedescription, price, supplypass } = formParams;

    if(!spacename || !spacedescription || !price || !supplypass || !fileURL) return;

    const nftJSON = {
        spacename, spacedescription, price, supplypass, image: fileURL
    }
    


    try {

        const response = await uploadJSONToIPFS(nftJSON);
        if(response.success === true) {
            setMessage2('Metadata uploaded successfully!');
            return response.pinataURL;
        }

    } catch (e) {
        setAlertMessage('Error uploading metadata!');
    }

  }

  async function listToken(e) {
    e.preventDefault();

    try {

        setOpen2(true);

        const metadataURL = await uploadMetadataToIPFS();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();


        let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);

        const priced = ethers.utils.parseEther(formParams.price, 'ether');
        const privateAddress = [];

        const uniqueId = (length=16) => {
          return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
        }

        let minting = await contract.mint(metadataURL, uniqueId().toString(), formParams.supplypass.toString(), priced, privateAddress);
        await minting.wait();

        setMessage3('Space created successfully!');


        setOpen2(false);
        setMessage1('');
        setMessage2('');
        setMessage3('');
       
        updateFormParams({ spacename: '', spacedescription: '', price: '', supplypass: ''});
        setImgPre(null);
        setFileURL(null);
        

    } catch (e) {

        setOpen2(false);
        setMessage1('');
        setMessage2('');
        setMessage3('');
       
        updateFormParams({ spacename: '', spacedescription: '', price: '', supplypass: ''});
        setImgPre(null);
        setFileURL(null);
        setAlertMessage(e.message.replace('MetaMask Tx Signature: User denied transaction signature.', 'User denied transaction signature!'));
        setOpen(true);
        
        
    }
  }


 

  

  return (
    <>


    <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
    </Snackbar>
  </Stack>


      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Uploading (Do not close)"}
        </DialogTitle>
        <DialogContent sx={{mt:3}}>
          <DialogContentText id="alert-dialog-description">
          <List>
          <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor:'#00ac56', color: 'white' }}>
               1
            </Avatar>
          </ListItemAvatar>
          <ListItemText style={{color: 'white'}}>{message1}</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor:'#00ac56', color: 'white' }}>
               2
            </Avatar>
          </ListItemAvatar>
          <ListItemText style={{color: 'white'}}>{message2}</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor:'#00ac56', color: 'white' }}>
               3
            </Avatar>
          </ListItemAvatar>
          <ListItemText style={{color: 'white'}}>{message3}</ListItemText>
        </ListItem>
        </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>


    <form onSubmit={listToken}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            

      
          
          <div style={{ display: 'flex', justifyContent: 'center'}}>
          {imgPre === null ? 
            <Avatar style={{height: '100px', width: '100px', borderStyle: 'dotted', borderColor: 'gray', background: '#212b36' }}>
            <Iconify icon={'clarity:image-solid-badged'} width={50} height={50} />
            </Avatar>
            : <Avatar  src={imgPre} style={{ height: '100px', width: '100px', borderStyle: 'dotted', borderColor: 'gray' }}/>}
            </div>
            
         

             <br></br>
             <div>
             {imgPre === null ? 
              <Button variant="contained" component="label">
                     &nbsp;Upload
                     <input accept="image/*" hidden type="file" onChange={onChangeFile}/>
                </Button>
                  : 
                  <Button variant="contained" component="label">
                      &nbsp;Change
                      <input accept="image/*" hidden type="file" onChange={onChangeFile}/>
                </Button>}
                    </div>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3 }}>
              This image will act as a <span style={{color: '#00ac56'}}>Memberpass NFT</span> for the community.
              </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Grid container spacing={2} >
              <Grid item xs={12} >
                  <TextField placeholder="Sora" id="spacename" label="Space Name" variant="outlined" fullWidth required autoComplete='off' onChange={e => updateFormParams({...formParams, spacename: e.target.value})} value={formParams.spacename}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Description" id="spacedescription" multiline rows={4} placeholder="Community from space" variant="outlined" fullWidth required autoComplete='off' value={formParams.spacedescription} onChange={e => updateFormParams({...formParams, spacedescription: e.target.value})}/>
                </Grid>

                <Grid item xs={6} >
                  <TextField placeholder="1000" label="Memberpass supply" InputProps={{ inputProps: { min: 1 } }} type="number" variant="outlined" fullWidth required autoComplete='off' value={formParams.supplypass} onChange={e => updateFormParams({...formParams, supplypass: e.target.value})}/>
                </Grid>

                <Grid item xs={6} >
                  <TextField placeholder="0.01 Eth" label="Pass price (in ETH)" type="number" variant="outlined" fullWidth required autoComplete='off' value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}/>
                </Grid>


                </Grid>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              

              <Button type="submit" variant="contained">
                Create
              </Button>
            </Stack>

           
          </Card>
        </Grid>
      </Grid>
    </form>
    </>
  );
}
