import React from 'react';

// @mui
import { Box, Card, Button, TextField, Stack} from '@mui/material';
import Switch from '@mui/material/Switch';
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------



export default function SpacePostInput2() {


  return (
    <>
  


    <Card sx={{ p: 2 }}>
      <TextField
        multiline
        fullWidth
        disabled
        rows={3}
        placeholder="Share what's on your mind..."
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
          },
        }}
        id="text"
        
      />

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >

<Box sx={{ display: 'flex' }}>

        </Box>
       
        <Button disabled startIcon={<Iconify icon="bxs:lock" />}  variant="contained">Members only</Button>
      </Box>

      
    </Card>
    </>
  );
}
