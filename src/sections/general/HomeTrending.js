import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import { Link as RouterLink } from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Avatar, Typography, Paper, CardHeader} from '@mui/material';


// components
import Label from '../../components/Label';
import Image from '../../components/Image';

import { CarouselArrows } from '../../components/carousel';


import { useSignMessage } from 'wagmi'
import { useAccount } from 'wagmi'
// ---------------------------------------

// ----------------------------------------------------------------------

export default function HomeTrending() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
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
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Trending spaces 🔥"
        subheader="Explore the most popular spaces"
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {data && data.map((item) => (
          <TrendingItem key={item.tokenId} item={item} />
        ))}
      </Slider>
    </Box>
  );
}

// ----------------------------------------------------------------------

TrendingItem.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    bookdAt: PropTypes.instanceOf(Date),
    cover: PropTypes.string,
    name: PropTypes.string,
    person: PropTypes.string,
    roomNumber: PropTypes.string,
    roomType: PropTypes.string,
  }),
};

function TrendingItem({ item }) {


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
    <span>
    {localStorage.getItem('signature') === null ?
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }} onClick={() => signMessage()} style={{cursor: 'pointer'}}>

    <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={(item.category === 'Gaming' && 'error') || (item.category === 'Art' && 'info') || 'warning'}
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 16,
            position: 'absolute',
            textTransform: 'capitalize',
          }}
        >
          {item.category}
        </Label>
        <Image src={item.image} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt='' src={item.image} />
          <div>
            <Typography variant="subtitle2">{item.name}</Typography>
          </div>
        </Stack>

      
      </Stack>

      
    </Paper>

    :

    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }} to={`/space/${item.tokenId}`} style={{textDecoration: 'none'}} component={RouterLink}>

    <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={(item.category === 'Gaming' && 'error') || (item.category === 'Art' && 'info') || 'warning'}
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 16,
            position: 'absolute',
            textTransform: 'capitalize',
          }}
        >
          {item.category}
        </Label>
        <Image src={item.image} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt='' src={item.image} />
          <div>
            <Typography variant="subtitle2">{item.name}</Typography>
          </div>
        </Stack>

      
      </Stack>

      
    </Paper>

        }
        </span>
  );
}
