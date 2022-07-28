import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const NftCard = ({ nft }) => {
  return (
    <div>
      {nft.meta !== undefined ? (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={nft.meta.content[0].url}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nft.meta.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nft.meta.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          </Grid>
      </Grid>
      </Box>
            
        ) : (
          <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Not found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Not found
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          </Grid>
          </Grid>
      </Box>
        )}
    </div>
  )
}

export default NftCard