import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
//

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
