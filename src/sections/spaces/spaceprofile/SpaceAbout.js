
import { styled } from '@mui/material/styles';
import { Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import { fDate } from '../../../utils/formatTime';
// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------


export default function SpaceAbout({data}) {
  
  
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{data.description}</Typography>

        <Stack direction="row">
          <IconStyle icon={'flat-color-icons:calendar'} />
          <Typography variant="body2">
            Created on &nbsp;
           
              {fDate(data.date)}
           
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'emojione:artist-palette'} />
          <Typography variant="body2">{data.category}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'noto:id-button'} />
          <Typography variant="body2">
            ID - &nbsp;
            
              {data.tokenId}
          
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'noto:chains'} />
          <Typography variant="body2">
            View on  &nbsp;
            <a href={`https://mumbai.polygonscan.com/token/${data.contractAddress}?a=${data.tokenId}`} target="_blank" rel="noreferrer" variant="subtitle2" style={{color: '#00ac56', textDecoration: 'none'}}>
              block explorer
            </a>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
