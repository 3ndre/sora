import { capitalCase } from 'change-case';
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ABIS from '../abis/abis.json';
import axios from "axios";
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Typography } from '@mui/material';

// hooks
import useAuth from '../hooks/useAuth';
import useTabs from '../hooks/useTabs';
import useSettings from '../hooks/useSettings';
// _mock_
import { _userFriends, _userGallery, _userFollowers } from '../_mock';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

// sections

import {
    SpaceProfile,
    SpaceMembers,
  SpaceHolder,
} from '../sections/spaces/spacebuy';
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

  const { isConnected } = useAccount()

  const tokenId = useParams().id;

  const { user } = useAuth();

  const [data, updateData] = useState('');
  

  const [dataFetched, updateDataFetched] = useState(false);
  
  const [currAddress, updateCurrAddress] = useState("0x");
  const [listingId, setListingId] = useState("");
  const [buyer, setBuyer] = useState(null); //all the buyers
  const [tokenamount, setTokenamount] = useState(null); //token amount owned by user

  const { currentTab, onChangeTab } = useTabs('details');

  const [findFriends, setFindFriends] = useState('');

  const [tokensCollected, setTokensCollected] = useState(null); //amount of token collected

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };



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

    const getTokenBal = await contract.balanceOf(addr, tokenId); //checking balance of token
    const currentTokenBal = getTokenBal.toNumber();
   
    

    let item = {
        price: meta.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        contractAddress: listedToken.contractAddress,
        image: meta.image,
        spacename: meta.spacename,
        spacedescription: meta.spacedescription,
        supplypass: meta.supplypass,
        listingId: listingId,
    }

    setListingId(listingId);
    setTokenamount(currentTokenBal); //checking balance of token
    setBuyer(allBuyers); //all buyers of this token
    setTokensCollected(allBuyers.length); //amount of token left for sale
    updateData(item);
    updateDataFetched(true);
    updateCurrAddress(addr);
}


useEffect(() => {
  getNFTData(tokenId);
}, [])



  

  const PROFILE_TABS = [
    {
      value: 'details',
      icon: <Iconify icon={'gridicons:posts'} width={20} height={20} />,
      component: <SpaceProfile data={data} tokensCollected={tokensCollected} />,
    },
    {
      value: 'market',
      icon: <Iconify icon={'healthicons:market-stall'} width={20} height={20} />,
      component: <SpaceMembers  friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends}/>,
    },
    {
      value: 'holders',
      icon: <Iconify icon={'icon-park-solid:passport'} width={20} height={20} />,
      component: <SpaceHolder buyer={buyer} />,
    },
   
  ];


 


  

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }


  
        


  return (
    <Page title="Space">
      
      <Container maxWidth={themeStretch ? false : 'lg'}>


        {data === '' ? <SkeletonPostItem/> :

        <>

                <Typography variant="h3" sx={{mb: 3}}>
                  Join {data.spacename}
                </Typography>
       
       
            <Tabs
            sx={{
              mb: 3,
              position: 'relative',
            }}
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
            
            
          

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}

</>}
      </Container>
    </Page>
  );
}
