
// @mui
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Box, Card, Avatar, Typography, Stack, Button } from '@mui/material';


// components
import Image from '../../components/Image';
import SvgIconStyle from '../../components/SvgIconStyle';


// ----------------------------------------------------------------------

import axios from 'axios'
import { useSignMessage } from 'wagmi'
import { useAccount } from 'wagmi'
// ----------------------------------------------------------------------


export default function SpaceCard({space}) {


  const { address } = useAccount()

  const navigate = useNavigate()

  
  const { data, signMessage } = useSignMessage({
    message: `Welcome to Soraspace! Click to accept the terms and conditions! User: ${address}`,
  })

 
    var postData = {
      wallet: address,
      signature: data,
    };
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    
    if(data && address !== null) {
    axios.post('https://sora-backend.glitch.me/api/users', postData, axiosConfig)
    .then((res) => {
      console.log("User Signed In: ", res);
      localStorage.setItem('signature', JSON.stringify(data))
      navigate(`/space/${space.tokenId}`)
    })
    .catch((err) => {
      console.log("Sign In unsuccessful");
      localStorage.setItem('signature', JSON.stringify(data))
      navigate(`/space/${space.tokenId}`)
    })}

  

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
         alt=""
          src={space.image}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
       
        <Image src={space.image} alt="" ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }} style={{textTransform: 'capitalize'}}>
        {space.name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {space.description}
      </Typography>

      <Stack sx={{py: 2}} alignItems="center">
      {localStorage.getItem('signature') === null ? <Button  variant="contained"onClick={() => signMessage()}>Visit</Button> : <Button to={`/space/${space.tokenId}`} variant="contained" component={RouterLink}>Visit</Button>}
      </Stack>


      
    </Card>
  );
}
