import { capitalCase } from 'change-case';
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ABIS from '../abis/abis.json';
import axios from "axios";
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// hooks
import useAuth from '../hooks/useAuth';
import useTabs from '../hooks/useTabs';
import useSettings from '../hooks/useSettings';
// _mock_
import { _userFriends, _userGallery, _userFollowers } from '../_mock';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Iconify from '../components/Iconify';

// sections

import {
    SpaceBuyProfile,
    SpaceMembers,
  SpaceHolder,
  SpaceMarketList,
} from '../sections/spaces/spacebuy';

import { SpaceProfile } from '../sections/spaces/spaceprofile';
import { SkeletonPostItem } from '../components/skeleton';




// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function SpaceBuy() {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount()

  const tokenId = useParams().id;

  const { user } = useAuth();

  const [data, updateData] = useState('');
  

  const [dataFetched, updateDataFetched] = useState(false);
  
  const [currAddress, updateCurrAddress] = useState("0x");
  const [listingId, setListingId] = useState("");
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
    //create an NFT Token
    const tokenURI = await contract.uri(tokenId);
    const listedToken = await contract.viewListingById(tokenId);

 
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
        spacename: meta.spacename,
        spacedescription: meta.spacedescription,
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
  getNFTData(tokenId);
}, [])



  

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  
        


  return (
    <Page title="Space">
      
      <Container maxWidth={themeStretch ? false : 'lg'}>


        {data === '' ? <SkeletonPostItem/> :

        <>

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3" sx={{mb: 3}}>
                {tokenamount > 0 || address === data.owner ? <><span style={{color: 'gray'}}>Welcome to</span> {data.spacename} </> : <>Join {data.spacename}</>}
        </Typography>
        {tokenamount > 0 || address === data.owner ? (
        <Box sx={{ flexShrink: 0 }}> 
        <Label color={'success'} sx={{ textTransform: 'capitalize' }}>
          Members Only
        </Label>
        </Box>
        ) : null}
          
        </Box>

        
     

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
            {tokenamount > 0 || address === data.owner ?
            <Tab label="All posts" disableRipple icon={<Iconify icon={'gridicons:posts'} width={20} height={20} />} value="1" />
            : <Tab label="Details" disableRipple icon={<Iconify icon={'gridicons:posts'} width={20} height={20} />} value="1" />}

            <Tab label="Market" disableRipple icon={<Iconify icon={'healthicons:market-stall'} width={20} height={20} />} value="2" />
            <Tab label="Holders" disableRipple icon={<Iconify icon={'icon-park-solid:passport'} width={20} height={20} />} value="3" />
          </TabList>
      
          {tokenamount > 0 || address === data.owner ?
        <TabPanel value="1"><SpaceProfile data={data} tokensCollected={tokensCollected} /></TabPanel>
        : <TabPanel value="1"><SpaceBuyProfile data={data} tokensCollected={tokensCollected} /></TabPanel> }

        <TabPanel value="2"><SpaceMarketList data={data} tokenamount={tokenamount} /></TabPanel>
        <TabPanel value="3"><SpaceHolder buyer={buyer} /></TabPanel>
      </TabContext>

            
            
          

</>}
      </Container>
    </Page>
  );
}
