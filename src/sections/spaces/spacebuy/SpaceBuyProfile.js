
// @mui
import { Grid, Stack } from '@mui/material';
//
import SpaceAbout from './SpaceAbout';
import SpaceMemberInfo from './SpaceMemberInfo';
import SpaceMainCard from './SpaceMainCard';




export default function SpaceProfile({ data, tokensCollected }) {




  return (
    <Grid container spacing={3}>
      
      
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <SpaceMainCard data={data} tokensCollected={tokensCollected}/>
          
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={2}>
        <SpaceMemberInfo data={data} tokensCollected={tokensCollected}/>
         <SpaceAbout data={data} />
        </Stack>
      </Grid>
    

      
    </Grid>
  );
}
