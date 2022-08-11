import PropTypes from 'prop-types';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
} from '@mui/material';

// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components

import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';


// ----------------------------------------------------------------------

SpacePostCard.propTypes = {
  post: PropTypes.object,
};

export default function SpacePostCard({tokenId}) {
 

  const [isLiked, setLiked] = useState(null);

  const [likes, setLikes] = useState(0);


  
  const [spacepost, setSpacePost] = useState(null);
  const [dataFetched, updateFetched] = useState(false);


  
  async function getAllSpaces() {

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


    updateFetched(true);
    setSpacePost(meta2.data.posts); //getting posts
}



  

  const handleLike = () => {
    setLiked(true);
    setLikes(1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes(0);
  };


  function updatedata() {
    localStorage.setItem('dataupdated', 'false');
  }

  

if(!dataFetched)
getAllSpaces();





  return (
    <>
     {spacepost && spacepost.length !== null ? spacepost.map(post => (
    <Card key={post._id}>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink} style={{textDecoration: 'none'}}>
            {post.wallet}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(post.date)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={1} sx={{ p: 2 }}>

        <Typography sx={{ p: 1 }}>{post.text}</Typography>

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(1)}
            sx={{ minWidth: 72, mr: 0 }}
          />
         
         
        </Stack>

      </Stack>
    </Card>)) : null}
    </> 
  );
}
