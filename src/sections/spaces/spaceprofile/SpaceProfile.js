import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import SpaceAbout from './SpaceAbout';
import SpacePostCard from './SpacePostCard';
import SpacePostInput from './SpacePostInput';
import SpaceMemberInfo from './SpaceMemberInfo';
import SpaceMainCard from './SpaceMainCard';
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

SpaceProfile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function SpaceProfile({ myProfile, posts }) {

  const isDesktop = useResponsive('up', 'lg');


  return (
    <Grid container spacing={3}>

     
      <Grid item xs={12} md={8}>
        <Stack spacing={2}>
          <SpacePostInput />
          {posts.map((post) => (
            <SpacePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>

      
      {isDesktop && 
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <SpaceMainCard/>
          <SpaceMemberInfo profile={myProfile} />
          <SpaceAbout profile={myProfile} />
        </Stack>
      </Grid>
      }

      
    </Grid>
  );
}
