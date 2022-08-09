
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';

// ----------------------------------------------------------------------


export default function SpaceHolder({ buyer }) {

 
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Memberpass holders
      </Typography>

      <Grid container spacing={3}>
        {buyer.map((holded) => (
          <Grid key={holded} item xs={12} md={4}>
            <HolderCard holded={holded} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}



function HolderCard({ holded }) {
  
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt="" src="" sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {holded}
        </Typography>
     
      </Box>
      <Button
        size="small"
      
        variant='outlined'
       
      >
        Profile
      </Button>
    </Card>
  );
}
