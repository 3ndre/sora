import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import SpaceAbout from './SpaceAbout';
import SpacePostCard from './SpacePostCard';
import SpacePostInput from './SpacePostInput';
import SpaceMemberInfo from '../spacebuy/SpaceMemberInfo';
import SpaceMainCard2 from '../spacebuy/SpaceMainCard2';
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

SpaceProfile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function SpaceProfile({ data, tokensCollected }) {

  const isDesktop = useResponsive('up', 'lg');


  return (
    <Grid container spacing={3}>

     
      <Grid item xs={12} md={8}>
        <Stack spacing={2}>
          <SpacePostInput />
          
            <SpacePostCard  /> 
       
        </Stack>
      </Grid>

      
      {isDesktop && 
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <SpaceMainCard2 data={data} tokensCollected={tokensCollected}/>
          <SpaceMemberInfo data={data} tokensCollected={tokensCollected} />
          <SpaceAbout data={data} />
        </Stack>
      </Grid>
      }

      
    </Grid>
  );
}
