import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';


import { useNavigate } from 'react-router-dom';
// --------------------------Sign Auth--------------------------------------------

import axios from 'axios'
import { useSignMessage } from 'wagmi'
import { useAccount } from 'wagmi'
// -----------------------------------------------------------------------------

const RootStyle = styled('span')(({ theme }) => ({
  
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '24px 0 20px 24px',

}));


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function CreatePopover() {

  const { address } = useAccount()

  const navigate = useNavigate()
  
  const { data, isSuccess, signMessage } = useSignMessage({
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
      navigate('/create')
      window.location.reload()
    })
    .catch((err) => {
      console.log("Sign In unsuccessful");
      localStorage.setItem('signature', JSON.stringify(data))
      navigate('/create')
      window.location.reload()
    })}


 
  return (
    <RootStyle>
      
      <Tooltip title="Create" placement="bottom">

        {localStorage.getItem('signature') === null ? 
      <IconButtonAnimate
        color={'default'}
        sx={{
          mr: 1,
          width: 40,
          height: 40,
          bgcolor: (theme) => alpha('#919EAB', theme.palette.action.focusOpacity),   
          
        }}
        onClick={() => signMessage()}
      >
        <Iconify icon={'akar-icons:plus'} width={20} height={20} />
      </IconButtonAnimate>

      :
      <IconButtonAnimate
      to="/create"
        color={'default'}
        sx={{
          mr: 1,
          width: 40,
          height: 40,
          bgcolor: (theme) => alpha('#919EAB', theme.palette.action.focusOpacity),   
          
        }}
        component={RouterLink}
      >
        <Iconify icon={'akar-icons:plus'} width={20} height={20} />
      </IconButtonAnimate>
    }
      </Tooltip>
   </RootStyle>
  );
}
