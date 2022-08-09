
import { useState } from 'react';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../Pinata";
import ABIS from '../../abis/abis.json';


import { Card, Grid, Stack, Typography, TextField, Avatar, Button } from '@mui/material';


import Iconify from '../../components/Iconify';




// ----------------------------------------------------------------------


export default function SpaceForm() {

  const [formParams, updateFormParams] = useState({ spacename: '', spacedescription: '', price: '', supplypass: ''});
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [, updateMessage] = useState('');
  const [imgPre, setImgPre] = useState(null);
  
  async function onChangeFile (e) {
    var files = e.target.files[0];

    setImgPre(URL.createObjectURL(files))
    

    try {
        const response = await uploadFileToIPFS(files);
        if(response.success === true) {
            console.log("Image uploaded to IPFS", response.pinataURL);
            setFileURL(response.pinataURL);
        }
    } catch (e) {
        console.log(e);
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
            console.log("Metadata uploaded to IPFS", response.pinataURL);
            return response.pinataURL;
        }

    } catch (e) {
        console.log("Error uploading metadata", e);
    }

  }

  async function listToken(e) {
    e.preventDefault();

    try {
        const metadataURL = await uploadMetadataToIPFS();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        updateMessage('Uploading NFT to Ethereum...');

        let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);

        const priced = ethers.utils.parseEther(formParams.price, 'ether');
        const privateAddress = [];

        let minting = await contract.mint(metadataURL, (3).toString(), formParams.supplypass.toString(), priced, privateAddress);
        await minting.wait();

        updateMessage('Space created successfully!');
        updateMessage('');
        updateFormParams({ spacename: '', spacedescription: '', price: '', supplypass: ''});
        setImgPre(null);
        setFileURL(null);
        

    } catch (e) {
        console.log(e);
    }
  }

  

  return (
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
                    Make sure not to upload anything that you do not own.
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
  );
}
