

import {Card, Skeleton } from '@mui/material';



// ----------------------------------------------------------------------


export default function SkeletonSpaceCard() {
  

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      
    </Card>
  );
}
