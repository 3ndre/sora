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
  
  Box
} from '@mui/material';


import useSettings from '../../../hooks/useSettings';


// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import ListMemberpass from '../ListMemberpass';
import DeListing from '../DeListing';
import ListingBuy from '../ListingBuy';
import { SkeletonPostItem2 } from '../../../components/skeleton';


// ----------------------------------------------------------------------



export default function SpaceMarketList({data, tokenamount}) {



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
    const items = await Promise.all(transaction.map(async i => {

      
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

    const customers = items.reduce((dict, data) => {
      if (!dict[data.tokenId]) dict[data.tokenId] = [];
      dict[data.tokenId].push(data);
      return dict;
    }, {});

    const listedItemsbyId = customers[data.tokenId];

   
    updateFetched(true);
    updateListingData(listedItemsbyId);
}



if(!dataFetched)
    getAllNFTs();


  return (
    <Page title="Listed memberpass">
      <Container maxWidth={themeStretch ? false : 'lg'}>


      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Listed memberpass
          </Typography>

          <Typography variant="subtitle" gutterBottom sx={{mt: 4, color: 'gray'}}>
            (Buy memberpass directly from the community market)
          </Typography>
          
        </Box>

        
    {tokenamount > 0 && (
       <Box sx={{ flexShrink: 0 }}> 
        <ListMemberpass data={data} tokenamount={tokenamount}/>
       </Box>
       )}

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
                          Seller
                        </TableCell>

                        <TableCell>
                          Memberpass amount
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
                              

                              <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>

                                  {item.seller}
                                  
                              </TableCell>

                              <TableCell align="left">{item.supply}</TableCell>

                              <TableCell align="left">{item.price} Matic</TableCell>

                              <TableCell align="left">

                        {address === item.seller ? 
                            <DeListing listingId={item.listingId} completed={item.completed}/>
                          : <ListingBuy listingId={item.listingId} availableamount={item.supply} price={item.price} completed={item.completed}/>}

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

