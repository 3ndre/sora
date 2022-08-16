import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ABIS from '../abis/abis.json';
import axios from "axios";
// @mui

import { Tab, Box, Container, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// hooks

import useSettings from '../hooks/useSettings';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Iconify from '../components/Iconify';

// sections

import {
    SpaceBuyProfile,
  SpaceHolder,
  SpaceMarketList,
} from '../sections/spaces/spacebuy';

import { SpaceProfile } from '../sections/spaces/spaceprofile';
import { SkeletonProductItem } from '../components/skeleton';
import SwitchNetwork from './SwitchNetwork';

import { useNetwork } from 'wagmi'
import DropMarketList from '../sections/spaces/spacebuy/DropMarketList';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function SpaceBuy() {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount();
  const [previousAccount, ] = useState(address);

  const { chain } = useNetwork()


  const tokenId = useParams().id;


  const [data, updateData] = useState('');

  const [spaceDataById, setSpaceDataById] = useState(null);

  //----------------------------------------------------------------------
  async function getSpaceById() {

    const userSignature = JSON.parse(localStorage.getItem('signature'))
   
    let meta = await axios.get('http://localhost:5000/api/spaces');

   const space_id = meta.data.find(x => x.tokenId === parseInt(tokenId))._id; //space id from backend
  

   let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": userSignature.toString(),
    }
  };

   let meta2 = await axios.get(`http://localhost:5000/api/spaces/${space_id}`, axiosConfig);

    setSpaceDataById(meta2.data); //getting space data by id
}

//----------------------------------------------------------------------
  

  const [, updateDataFetched] = useState(false);
  
  const [, updateCurrAddress] = useState("0x");
  const [, setListingId] = useState("");
  const [buyer, setBuyer] = useState(null); //all the buyers
  const [tokenamount, setTokenamount] = useState(null); //token amount owned by user

  //tabs
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const [tokensCollected, setTokensCollected] = useState(null); //amount of token collected



  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
   
    //Pull the deployed contract instance
    let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer)


    //Fetch all the details of every NFT through the listing ID
    let transactionbyId = await contract.viewAllListings()

    const items = await Promise.all(transactionbyId.map(async i => {

      
      const tokenURI = await contract.uri(i.tokenId);
      
      let meta = await axios.get(tokenURI);
      meta = meta.data;
     
     

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
     
      let item = {
          price,
          tokenId: parseInt(i.tokenId.toString()),
          seller: i.seller,
          contractAddress: i.contractAddress,
          listingId: i.listingId.toNumber(),
          supply: i.tokensAvailable.toNumber(),
          image: meta.image,
          name: meta.name,
          description: meta.description,
      }
     

     
      return item;
  }))

  
  const key = 'tokenId';
  const arrayUniqueByKey = [...new Map(items.map(item => [item[key], item])).values()];


  const uniquelistingID = arrayUniqueByKey.find(x => x.tokenId === parseInt(tokenId)).listingId;

  //-----------------------------------------------------------------------------------------------

    //create an NFT Token
    const tokenURI = await contract.uri(tokenId);
    const listedToken = await contract.viewListingById(uniquelistingID);
   

    
    let meta = await axios.get(tokenURI);
    meta = meta.data;

    const listingId = listedToken.listingId.toNumber();
    const allBuyers = listedToken.buyer;

    const getTokenBal = await contract.balanceOf(addr, tokenId); //checking balance of address for current pass
    const currentTokenBal = getTokenBal.toNumber();
    
   
   

    let item = {
        price: meta.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.seller,
        contractAddress: listedToken.contractAddress,
        image: meta.image,
        name: meta.name,
        description: meta.description,
        supplypass: meta.supplypass,
        listingId: listingId,
    }

    setListingId(listingId);
    setBuyer(allBuyers); //all buyers of this token
    setTokensCollected(allBuyers.length); //amount of token bought
    updateData(item);
    updateDataFetched(true);
    updateCurrAddress(addr);
    setTokenamount(currentTokenBal); //checking balance of token

}


useEffect(() => {
  getSpaceById();
  getNFTData(tokenId);
  if(address !== previousAccount){
    getNFTData(tokenId);
}
}, [address])


  // console.log(spaceDataById)

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }


  return (
    <Page title="Space">
      
      <Container maxWidth={themeStretch ? false : 'lg'}>

      {chain.id !== 80001 ? <SwitchNetwork/> : null}


        {data === '' ? <SkeletonProductItem/> :

        <>

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3" sx={{mb: 3}}>
                {tokenamount > 0 || address === data.owner || spaceDataById && spaceDataById.type === 'Public' ? <><span style={{color: 'gray'}}>Welcome to</span> {data.name} <Iconify icon={'emojione:waving-hand'} sx={{mr: 1}} />  </> : <><span style={{color: 'gray'}}>Join</span> {data.name} <Iconify icon={'emojione:admission-tickets'} sx={{mr: 1}} /></>}
        </Typography>
        {tokenamount > 0 || address === data.owner || spaceDataById && spaceDataById.type === 'Public' ? (
        <Box sx={{ flexShrink: 0 }}> 
        <Typography variant="subtitle" sx={{color: 'gray'}}>
        Category: <Label color={'error'} sx={{ textTransform: 'capitalize' }}>
          {spaceDataById && spaceDataById.category}
        </Label>
        </Typography>
       
        </Box>
        ) : null}
            
        </Box>

       
        {tokenamount > 0 || address === data.owner || spaceDataById && spaceDataById.type === 'Public' ? (
        <Box sx={{ flexShrink: 0 }}> 
        <Label color={'success'} sx={{ textTransform: 'capitalize' }}>
         { spaceDataById && spaceDataById.type === 'Public' ? <>Public space</> : <>Members Only</>} 
        </Label>
        </Box>
        ) : null}

        </Box>     
       

            <TabContext value={value}>
            
          <TabList onChange={handleChange}  
              sx={{
                  mb: 3,
                  position: 'relative',
                }}
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              >
            {tokenamount > 0 || address === data.owner || spaceDataById && spaceDataById.type === 'Public' ?
            <Tab label="All posts" disableRipple icon={<Iconify icon={'emojione-v1:note-page'} width={20} height={20} />} value="1" />
            : <Tab label="Details" disableRipple icon={<Iconify icon={'emojione:page-with-curl'} width={20} height={20} />} value="1" />}

            <Tab label="Market" disableRipple icon={<Iconify icon={'flat-color-icons:shop'} width={20} height={20} />} value="2" />
            <Tab label="Drops" disableRipple icon={<Iconify icon={'emojione:wrapped-gift'} width={20} height={20} />} value="4" />
            <Tab label="Holders" disableRipple icon={<Iconify icon={'emojione-v1:ticket'} width={20} height={20} />} value="3" />
          </TabList>
      
          {tokenamount > 0 || address === data.owner || spaceDataById && spaceDataById.type === 'Public' ?
        <TabPanel value="1"><SpaceProfile data={data} tokensCollected={tokensCollected} spaceDropById={spaceDataById} /></TabPanel>
        : <TabPanel value="1"><SpaceBuyProfile data={data} tokensCollected={tokensCollected} /></TabPanel> }

        <TabPanel value="2"><SpaceMarketList data={data} tokenamount={tokenamount} /></TabPanel>
        <TabPanel value="4"><DropMarketList data={spaceDataById} /></TabPanel>
        <TabPanel value="3"><SpaceHolder buyer={buyer} /></TabPanel>
      </TabContext>

            
            
          

</>}
      </Container>
    </Page>
  );
}
