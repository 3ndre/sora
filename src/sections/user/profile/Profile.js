import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';
import NFTList from '../../../sections/card/NFTList';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ myProfile, posts }) {
  return (
    <Grid container spacing={3}  style={{justifyContent: 'center', display: 'flex'}}>
      <Grid item>
     <NFTList />
     </Grid>
    </Grid>
  );
}
