
import { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography } from '@mui/material';

// components
import Image from '../../components/Image';
import { CarouselDots } from '../../components/carousel';

// ----------------------------------------------------------------------

import { useSignMessage } from 'wagmi'
import { useAccount } from 'wagmi'
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

export default function HomeSpotlight() {
  const theme = useTheme();


  
  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24 }),
  };


  
  const [data, updateData] = useState(null);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllSpaces() {

    let meta = await axios.get('https://sora-backend.glitch.me/api/spaces');
    
    
   
    updateFetched(true);
    updateData(meta.data);
}



if(!dataFetched)
    getAllSpaces();

  return (
    <Card>
      <Slider {...settings}>
        {data && data.map((item) => (
          <CarouselItem key={item._id} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------



function CarouselItem({ item }) {


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
      navigate(`/space/${item.tokenId}`)
    })
    .catch((err) => {
      console.log("Sign In unsuccessful");
      localStorage.setItem('signature', JSON.stringify(data))
      navigate(`/space/${item.tokenId}`)
    })}

  
  

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          {item.category}
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }} style={{textTransform: 'capitalize'}}>
          {item.name}
        </Typography>

        {localStorage.getItem('signature') === null ? 
        <Button onClick={() => signMessage()} variant="contained" >
          Join Now
        </Button>
        :
        <Button to={`/space/${item.tokenId}`} variant="contained" component={RouterLink}>
          Join Now
        </Button>
        }


      </CardContent>
      <OverlayStyle />
      <Image alt={item.name} src={item.image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}
