import React, { useState } from "react";
import ABIS from '../../../abis/abis.json';
import { useAccount } from "wagmi";
import axios from 'axios';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../../Pinata";

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from '@mui/material/DialogContentText';
//--------------List Item
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Grid,Typography, Stack, Avatar} from "@mui/material";
import TextField from '@mui/material/TextField';
//-------------------------------------------

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//---------------------------------------------------------

import Iconify from '../../../components/Iconify';
import SpaceTopCard from "../../../sections/card/SpaceTopCard";



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const CreateDrop = ({spaceDropById}) => {

    const { address } = useAccount()

    const userSignature = JSON.parse(localStorage.getItem('signature'))


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false); //alert
    const [open3, setOpen3] = useState(false); //alert
    
    const [alertMessage, setAlertMessage] = useState('');



    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '', supplypass: ''});

    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");

    const [message1, setMessage1] = useState('Uploading image...');
    const [message2, setMessage2] = useState('Uploading metadata...');
    const [message3, setMessage3] = useState('Confirming transaction...');
    const [imgPre, setImgPre] = useState(null);


    var IPFSImage;

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
    
        const {name, description, price, supplypass } = formParams;
    
        if(!name || !description || !price || !supplypass || !fileURL) return;
    
        const nftJSON = {
            name, description, price, supplypass, image: fileURL
        }
    
        IPFSImage = fileURL //this state will send data to backend
        
    
    
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
            setOpen(false);
    
            const metadataURL = await uploadMetadataToIPFS();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
    
    
            let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
    
            const priced = ethers.utils.parseEther(formParams.price, 'ether');
            const privateAddress = [];
    
            const uniqueId = (length=16) => {
              return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
            }
    
            const id = uniqueId();
    
            let minting = await contract.mint(metadataURL, id.toString(), formParams.supplypass.toString(), priced, privateAddress);
            await minting.wait();
    
            
            var postData = {
              dropId: id,
              creatorAddress: address,
              signature: userSignature,
              name: formParams.name,
              description: formParams.description,
              supply: formParams.supplypass,
              price: formParams.price,
              image: IPFSImage,
            };
            
            
            let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  "x-auth-token": userSignature.toString(),
              }
            };
            
            
            axios.post(`http://localhost:5000/api/spaces/drop/${spaceDropById._id}`, postData, axiosConfig)
            .then((res) => {
              console.log("Drop created successfully!");
            })
            .catch((err) => {
              console.log("Sign In unsuccessful");
            })
    
        
    
    
    
            setMessage3('Drop created successfully!');
    
    
            setOpen2(false);
            setMessage1('');
            setMessage2('');
            setMessage3('');
           
            updateFormParams({ name: '', description: '', price: '', supplypass: ''});
            setImgPre(null);
            setFileURL(null);
        
    
        } catch (e) {
    
            setOpen2(false);
            setMessage1('');
            setMessage2('');
            setMessage3('');
           
            updateFormParams({ name: '', description: '', price: '', supplypass: ''});
            setImgPre(null);
            setFileURL(null);
            setAlertMessage(e.message.replace('MetaMask Tx Signature: User denied transaction signature.', 'User denied transaction signature!'));
            setOpen3(true);
            setOpen(false);
            
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

  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };






  return (
    <>


<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
        {alertMessage ?
        <Alert onClose={handleClose3} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
        : 
        <Alert onClose={handleClose3} severity="success" sx={{ width: '100%', color: 'white' }}>
        {message3}
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


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
         <DialogTitle id="alert-dialog-title" >
          {"Create new drop"}
        </DialogTitle>

        <DialogContent>

       

          <Typography variant="subtitle" sx={{color: 'gray'}}>(Create a new NFT drop for your community)</Typography>


        <Grid style={{ maxWidth: 450, padding: "5px 5px", margin: "0 auto" }}>

        <Typography variant="body2" style={{color: 'white'}} component="p" gutterBottom>
          
          </Typography> 


      
                <form id="drop-form-id" onSubmit={listToken}>
            <Grid container spacing={1} style={{color: 'white', marginTop: '8px'}}>
              

            <Grid item xs={12} sx={{mb: 2}}>
               
          <div style={{ display: 'flex', justifyContent: 'center'}}>
          {imgPre === null ? 
            <Avatar style={{height: '100px', width: '100px', borderStyle: 'dotted', borderColor: 'gray', background: '#212b36' }}>
            <Iconify icon={'clarity:image-solid-badged'} width={50} height={50} />
            </Avatar>
            : <Avatar  src={imgPre} style={{ height: '100px', width: '100px', borderStyle: 'dotted', borderColor: 'gray' }}/>}
            </div>
            
         

             <br></br>
             <div style={{ display: 'flex', justifyContent: 'center'}}>
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
            </Grid>

            <Grid item xs={12} >
                  <TextField placeholder="Planets" sx={{ input: { color: 'black', background: 'white' } }} id="name" label="Drop name" variant="filled" fullWidth required autoComplete='off' onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Description" id="description" sx={{ input: { color: 'black', background: 'white' } }} style={{color: 'black', background: 'white'}}  placeholder="Planets are cool" variant="filled" fullWidth required autoComplete='off' value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}/>
                </Grid>


                <Grid item xs={6} >
                  <TextField placeholder="0.01 Matic" label="Drop price (in Matic)"  type="number"  sx={{ input: { color: 'black', background: 'white' } }} variant="filled" fullWidth required autoComplete='off' value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}/>
                </Grid>     

                
                <Grid item xs={6} >
                  <TextField placeholder="100" sx={{ input: { color: 'black', background: 'white' } }} label="Drop supply" InputProps={{ inputProps: { min: 1 } }} type="number" variant="filled" fullWidth required autoComplete='off' value={formParams.supplypass} onChange={e => updateFormParams({...formParams, supplypass: e.target.value})}/>
                </Grid>         

                </Grid>

            </form>
     
    </Grid>

        </DialogContent>
        <DialogActions>

         
          <Button onClick={handleClose} style={{color: 'white'}}>Cancel</Button>

          <Button type="submit" form="drop-form-id"  autoFocus>
           Drop
          </Button>
          
         



        </DialogActions>
      </Dialog>


    

           <span onClick={handleClickOpen} style={{cursor: 'pointer'}}  >
            <SpaceTopCard title="Drop Nfts" icon={'fa6-solid:gift'} />
            </span>

    </>
  );
};

export default CreateDrop;
