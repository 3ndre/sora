import PropTypes from 'prop-types';
import React from 'react';
import { useAccount } from 'wagmi'
import { useState } from 'react';
import axios from 'axios';  
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Link,
  Card,
  Stack,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
  Box,
  Button,
} from '@mui/material';

// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components

import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


// ----------------------------------------------------------------------

//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



// ----------------------------------------------------------------------

SpacePostCard.propTypes = {
  post: PropTypes.object,
};

export default function SpacePostCard({tokenId, tokenamount}) {

  const { address } = useAccount();
  const userSignature = JSON.parse(localStorage.getItem('signature'))
 

  const [isLiked, setLiked] = useState(null);

  const [likes, setLikes] = useState(0);

  const [open, setOpen] = useState(false);
  
  const [spacepost, setSpacePost] = useState(null);
  const [dataFetched, updateFetched] = useState(false);
  const [message, setMessage] = useState('');
  const [spacedeleteId, setSpaceDeleteId] = useState(null);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  
  async function getAllSpaces() {

    const userSignature = JSON.parse(localStorage.getItem('signature'))
   
    let meta = await axios.get('http://localhost:5000/api/spaces');

   const space_id = meta.data.find(x => x.tokenId === parseInt(tokenId))._id; //space id from backend
   setSpaceDeleteId(space_id);
   let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": userSignature.toString(),
        "x-auth-tokenbalance": tokenamount,
    }
  };

   let meta2 = await axios.get(`http://localhost:5000/api/spaces/${space_id}`, axiosConfig);


    updateFetched(true);
    setSpacePost(meta2.data.posts); //getting posts
}


async function deletePost(_id) {

      try {

      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": userSignature.toString(),
        }
      };

      await axios.delete(`http://localhost:5000/api/spaces/post/${spacedeleteId}/${_id}`, axiosConfig)
      .then((res) => {
        setMessage("Deleted successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Unsuccessful!");
      })

      } catch (error) {
        console.log(error);
      }
}


  const handleLike = () => {
    setLiked(true);
    setLikes(1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes(0);
  };

  

if(!dataFetched)
getAllSpaces();





  return (
    <>

    
<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: 'white' }}>
          {message}
        </Alert>
    </Snackbar>
  </Stack>


     {spacepost && spacepost.length !== null ? spacepost.map(post => (

<>
{post.members === 'false' ? 
      <Card key={post._id}>

    {post.wallet === address ? (
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
          <IconButton onClick={() => deletePost(post._id)}>
            <Iconify icon={'eva:trash-2-outline'} width={20} height={20} style={{color: '#ff4842'}} />
          </IconButton>
        }
      /> ) :  <CardHeader
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

    />}

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
           <Box sx={{ flexGrow: 1 }}/>

       
        </Stack> 
        
      </Stack>
      
    
    </Card> 
    
    : post.members === 'true' && tokenamount > 0 ? 

    <Card key={post._id}>

    {post.wallet === address ? (
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
          <IconButton onClick={() => deletePost(post._id)}>
            <Iconify icon={'eva:trash-2-outline'} width={20} height={20} style={{color: '#ff4842'}} />
          </IconButton>
        }
      /> ) :  <CardHeader
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

    />}

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
           <Box sx={{ flexGrow: 1 }}/>

          <Button disabled startIcon={<Iconify icon="bxs:lock-open" />}>Members only</Button>
        </Stack> 
        
      </Stack>
      
    
    </Card> 
    
    : 

    <Card key={post._id}>

     <CardHeader
      disableTypography
      avatar={<MyAvatar />}
      title={
        <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink} style={{textDecoration: 'none'}}>
          
        </Link>
      }
      subheader={
        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
          
        </Typography>
      }

    />

      <Stack spacing={1} sx={{ p: 2, alignItems: 'center', mb: 4 }}>

      <Typography sx={{ p: 1 }}> <Button disabled variant="contained" startIcon={<Iconify icon="bxs:lock" />}>Members only</Button></Typography>

        
      </Stack>
      
    
    </Card>     
    
    }
    </>
    
    )) : null}
    </> 
  );
}
