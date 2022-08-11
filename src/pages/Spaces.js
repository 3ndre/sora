// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import SpaceList from '../sections/spaces/SpacesList';

// ----------------------------------------------------------------------

// import ABIS from "../abis/abis.json";
import axios from "axios";
import { useState } from "react";


// ----------------------------------------------------------------------

export default function Spaces() {
  const { themeStretch } = useSettings();


  const [data, updateData] = useState(null);
  const [dataFetched, updateFetched] = useState(false);


  async function getAllSpaces() {
    // const ethers = require("ethers");
    // //After adding your Hardhat network to your metamask, this code will get providers and signers
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // //Pull the deployed contract instance
    // let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer)
    // //create an NFT Token
    // let transaction = await contract.viewAllListings()
   


   
   

    // //Fetch all the details of every NFT from the contract and display
    // const items = await Promise.all(transaction.map(async i => {

      
    //     const tokenURI = await contract.uri(i.tokenId);
        
    //     let meta = await axios.get(tokenURI);
    //     meta = meta.data;
       
       

    //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
       
    //     let item = {
    //         price,
    //         tokenId: i.tokenId.toNumber(),
    //         seller: i.seller,
    //         contractAddress: i.contractAddress,
    //         listingId: i.listingId.toNumber(),
    //         supply: i.tokensAvailable.toNumber(),
    //         image: meta.image,
    //         name: meta.name,
    //         description: meta.description,
    //     }

       
    //     return item;
    // }))

    
    // const key = 'tokenId';
    // const arrayUniqueByKey = [...new Map(items.map(item => [item[key], item])).values()];

    let meta = await axios.get('http://localhost:5000/api/spaces');

    
    
   
    updateFetched(true);
    updateData(meta.data);
}



if(!dataFetched)
    getAllSpaces();


  return (
    <Page title="Spaces">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          

            <Grid item xs={12}>
              <SpaceList data={data}/>
            </Grid>

            
          </Grid>
      </Container>
    </Page>
  );
}
