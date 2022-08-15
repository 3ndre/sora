import React, {useState} from 'react'
import {db} from '../../../firestore-config'
import {collection, addDoc, serverTimestamp, query, orderBy} from 'firebase/firestore'
import { useCollectionData, } from 'react-firebase-hooks/firestore';

import { useAccount } from 'wagmi';
// @mui
import { Box, Stack,  Input, Divider, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
// redux



// components
import Iconify from '../../../components/Iconify';


import ChatMessageList from './ChatMessageList';
import ChatHeaderDetail from './ChatHeaderDetail';


// ----------------------------------------------------------------------


const RootStyle = styled('form')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------




export default function ChatWindow({spaceDropById, tokenamount}) {

  
  const {address} = useAccount();




  const messagesRef = collection(db, `${spaceDropById.tokenId}`); //grabing the collection from firestore

  const bymessageorder = query(messagesRef, orderBy('createdAt', 'asc')); //query to get the last 20 messages
  
  const [messages] = useCollectionData(bymessageorder); //using the collection data from firestore
 

  const [formValue, setFormValue] = useState('');
 

  const sendMessage = async (e) => {
        
    e.preventDefault();

    await addDoc(messagesRef, {
        text: formValue,
        walletAddress: address,
        createdAt: serverTimestamp()
    })

    setFormValue('');
}


  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      
        <ChatHeaderDetail spaceDropById={spaceDropById}/>
      

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>

          <ChatMessageList messages={messages}/>

          <Divider />

          <RootStyle onSubmit={sendMessage}> 
         
            <Input fullWidth disableUnderline placeholder="Type a message"
              value={formValue} onChange={(e) => setFormValue(e.target.value)}
             />

            <Divider orientation="vertical" flexItem />

          <Button color="primary"  sx={{ mx: 1 }} type="submit"  onClick={sendMessage}>
            <Iconify icon="ic:round-send" width={22} height={22} />
          </Button>
         
        </RootStyle>

        </Stack>

      
      </Box>
    </Stack>
  );
}


