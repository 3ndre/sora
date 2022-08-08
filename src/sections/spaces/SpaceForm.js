
import { useEffect, useMemo } from 'react';

import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, Avatar, Button } from '@mui/material';

import Image from '../../components/Image';
import Iconify from '../../components/Iconify';




// ----------------------------------------------------------------------


export default function SpaceForm({ isEdit, currentUser }) {
  

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            

      
          
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Avatar style={{height: '100px', width: '100px', borderStyle: 'dotted', borderColor: 'gray', background: '#212b36' }}>
            <Iconify icon={'clarity:image-solid-badged'} width={50} height={50} />
            </Avatar>
            </div>
            
         

             <br></br>
             <div>
                <Button variant="contained">
                     &nbsp;Upload
                        <input accept="image/*" hidden type="file"  />
                    </Button>
                    </div>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3 }}>
                    Make sure not to upload anything that you do not own.
                  </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Grid container spacing={2} >
              <Grid item xs={12} >
                  <TextField placeholder="Sora" label="Space Name" variant="outlined" fullWidth required autoComplete='off'/>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Description" multiline rows={4} placeholder="Community from space" variant="outlined" fullWidth required autoComplete='off' />
                </Grid>

                <Grid item xs={6} >
                  <TextField placeholder="1000" label="Memberpass supply" InputProps={{ inputProps: { min: 1 } }} type="number" variant="outlined" fullWidth required autoComplete='off'/>
                </Grid>

                <Grid item xs={6} >
                  <TextField placeholder="0.01 Eth" label="Pass price (in ETH)" type="number" variant="outlined" fullWidth required autoComplete='off'/>
                </Grid>


                </Grid>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              

              <Button type="submit" variant="contained">
                Create
              </Button>
            </Stack>

           
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
