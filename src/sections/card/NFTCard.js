import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes


// components
import Label from '../../components/Label';
import Image from '../../components/Image';


// ----------------------------------------------------------------------


export default function NFTCard({ nft }) {

  

  const linkTo = '';

  return (
    <>
    {nft.meta !== undefined ? 
    <Card>
      <Box sx={{ position: 'relative' }}>
        {nft.blockchain && (
          <Label
            variant="filled"
            
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
              background: `${(nft.blockchain === 'POLYGON' && '#8247e5') || '#5cb85c'}` ,
              color: 'white',
            }}
          >
            {nft.blockchain}
          </Label>
        )}
        <Image alt={nft.meta.name} src={nft.meta.content[0].url} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink} style={{textDecoration: 'none', textTransform: 'capitalize'}}>
          <Typography variant="subtitle2" noWrap>
            {nft.meta.name}
          </Typography>
        </Link>

      </Stack>
    </Card>  : null}
    </>
  );
}
