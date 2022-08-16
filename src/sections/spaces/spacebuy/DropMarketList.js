import { useState} from 'react';


//wagmi
import {useAccount} from 'wagmi'

import ABIS from "../../../abis/abis.json";
import axios from "axios";
// @mui

import {
  Card,
  Table,
  Divider,
  TableBody,
  Container,
  TableContainer,
  Typography,
  TableRow, TableCell, TableHead,  
  Avatar,
  Box
} from '@mui/material';


import useSettings from '../../../hooks/useSettings';


// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { SkeletonPostItem2 } from '../../../components/skeleton';
import DropBuy from '../DropBuy';
import DeListDrop from '../DeListDrop';


// ----------------------------------------------------------------------



export default function DropMarketList({data}) {



  const { themeStretch } = useSettings();






  const [listingdata, updateListingData] = useState(null);
  const [dataFetched, updateFetched] = useState(false);
 
  
  const { address } = useAccount()



  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer)
    //create an NFT Token
    let transaction = await contract.viewAllListings()
  
   

    //Fetch all the details of every NFT from the contract and display
    var items = await Promise.all(transaction.map(async i => {

      
        const tokenURI = await contract.uri(i.tokenId);
        
        let meta = await axios.get(tokenURI);
        meta = meta.data;

       
       

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
       
        let item = {
            price,
            tokenId: parseInt(i.tokenId.toString()),
            seller: i.seller,
            completed: i.completed,
            contractAddress: i.contractAddress,
            listingId: i.listingId.toNumber(),
            supply: i.tokensAvailable.toNumber(),
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))


    

    items = items.filter(function (el) {
        return this.has(el.tokenId);
    }, new Set(data.drops.map(el => el.dropId)));
    

   
    updateFetched(true);
    updateListingData(items);
}



if(!dataFetched)
    getAllNFTs();


  return (
    <Page title="Listed drops">
      <Container maxWidth={themeStretch ? false : 'lg'}>


      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Listed drops
          </Typography>

          <Typography variant="subtitle" gutterBottom sx={{mt: 4, color: 'gray'}}>
            (Buy drops directly from the community market)
          </Typography>
          
        </Box>



      </Box>


     

     

        {listingdata === null ? <SkeletonPostItem2/> :

        <Card>
         

          <Divider />

         

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', mt: '13px'}}>
             

              <Table >
               
              <TableHead>
              
                    <TableRow>

                        <TableCell>
                          Drop
                        </TableCell>

                        <TableCell>
                          Seller
                        </TableCell>

                        <TableCell>
                          Drop amount
                        </TableCell>

                        <TableCell>
                         Price
                        </TableCell>

                        <TableCell align="left">
                          Actions
                        </TableCell>

     
                    </TableRow>

                   

                  </TableHead>

                      <TableBody>

                          {listingdata && listingdata.reverse().map((item, index) => (
                     
                            <TableRow hover key={item.listingId}>

                              <TableCell align="left" >

                              <Avatar src={item.image} alt="" />

                              </TableCell>
                              

                              <TableCell align="left" >

                                  {item.seller}
                                  
                              </TableCell>

                              <TableCell align="left">{item.supply}</TableCell>

                              <TableCell align="left">{item.price} Matic</TableCell>

                              <TableCell align="left">

                        {address === item.seller ? 
                            <DeListDrop listingId={item.listingId} completed={item.completed}/>
                          : <DropBuy listingId={item.listingId} availableamount={item.supply} price={item.price} completed={item.completed}/>}

                        </TableCell>

                              
                            </TableRow>
                           ))}

                 
               
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

        
        </Card>
        }
      </Container>
    </Page>
  );
}

