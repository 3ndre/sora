import PropTypes from 'prop-types';
import { useAccount } from 'wagmi';
import { useState } from 'react';
// @mui
import { Grid, Stack } from '@mui/material';
//
import SpaceAbout from './SpaceAbout';
import SpacePostCard from './SpacePostCard';
import SpacePostInput from './SpacePostInput';
import SpaceMemberInfo from '../spacebuy/SpaceMemberInfo';
import SpaceMainCard2 from '../spacebuy/SpaceMainCard2';
import useResponsive from '../../../hooks/useResponsive';

import ABIS from '../../../abis/abis.json';
import SpacePostInput2 from './SpacePostInput2';
import CreateDrop from './CreateDrop';
import BuyDrop from './BuyDrop';
import SpaceTopCard from '../../../sections/card/SpaceTopCard';
import SpaceChat from './SpaceChat';
import TransferToken from '../TransferToken';



// ----------------------------------------------------------------------

SpaceProfile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function SpaceProfile({ data, tokensCollected, spaceDropById }) {




  const isDesktop = useResponsive('up', 'lg');

  
  const { address } = useAccount();
  const [tokenamount, setTokenamount] = useState(null);
  const [dataFetched, updateFetched] = useState(false);

  async function getNFTData() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
   
    //Pull the deployed contract instance
    let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer)


    const getTokenBal = await contract.balanceOf(addr, data.tokenId); //checking balance of address for current pass
    const currentTokenBal = getTokenBal.toNumber();
    
    updateFetched(true);
    setTokenamount(currentTokenBal); //checking balance of token

}


if(!dataFetched)
    getNFTData();
  

  return (
    <>
    
    <Grid container spacing={3}>  

     
      <Grid item xs={12} md={8}>
        <Stack spacing={2}>


        <span style={{display: 'flex'}}>

        { address === data.owner ? 
        <Grid item xs={12} sm={6} md={3} sx={{mr: 3}}>
        <CreateDrop tokenId={data.tokenId} spaceDropById={spaceDropById}/> 
        </Grid>
        : spaceDropById && spaceDropById.drops.length > 0 ? (
          <Grid item xs={12} sm={6} md={3} sx={{mr: 3}}>
          <BuyDrop tokenId={data.tokenId} spaceDropById={spaceDropById}/>
        </Grid>)
          :
       
        <Grid item xs={12} sm={6} md={3} sx={{mr: 3}}>
          <span style={{cursor: 'pointer'}}>
          <SpaceTopCard title="No Drops available" color='error' icon={'fa6-solid:gift'}/>
          </span>
        </Grid>}


      
        
        

        <Grid item xs={12} sm={6} md={3} sx={{mr: 3}}>
        {tokenamount > 0 || address === data.owner ?
          <SpaceChat tokenamount={tokenamount} spaceDropById={spaceDropById}/>
          : 
          <span style={{cursor: 'pointer'}}>
          <SpaceTopCard title="Members Only" color='secondary' icon={'bxs:lock'}/>
          </span>
          }
        </Grid>


        {isDesktop && 
        <Grid item xs={12} sm={6} md={3} sx={{mr: 3}}>
          <span style={{cursor: 'pointer'}}>
            <TransferToken data={spaceDropById} tokenamount={tokenamount}/>
          </span>
        </Grid>}
        

          </span> 
          


       
     
          {tokenamount > 0 || address === data.owner ? 
          <SpacePostInput tokenId={data.tokenId}/>
         : <SpacePostInput2/>}

      

            <SpacePostCard tokenId={data.tokenId} tokenamount={tokenamount}/> 
       
        </Stack>
      </Grid>

      
      {isDesktop && 
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <SpaceMainCard2 data={data} tokensCollected={tokensCollected} tokenamount={tokenamount} />
          <SpaceMemberInfo data={data} tokensCollected={tokensCollected} />
           {spaceDropById && spaceDropById.drops.length > 0 && <SpaceAbout data={spaceDropById} />} 
        </Stack>
      </Grid>
      }

      
    </Grid>
    </>
  );
}
