// @mui
import { styled } from '@mui/material/styles';
import { Grid, RadioGroup, CardActionArea, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAccount } from 'wagmi';
// hooks
import useSettings from '../../hooks/useSettings';
//
import Iconify from '../Iconify';
import { BoxMask } from '.';

// ----------------------------------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function SettingMode() {
  const { themeMode, onChangeMode } = useSettings();

  const { isConnected } = useAccount();

  return (
    <RadioGroup name="themeMode" >
      <Grid dir="ltr" container spacing={2.5}>
        
           
            <Grid item xs={6}>
            <Link to="/">
              <Tooltip title="Home" placement="bottom">
              <BoxStyle
                sx={{
                  bgcolor: 'grey.800',
                    color: 'primary.main',
                  }}
              >
                <Iconify icon={'emojione-v1:house-with-garden'} width={28} height={28} />
                <BoxMask value={'light'} />
              </BoxStyle>
              </Tooltip>
              </Link>
            </Grid>
           

            <Grid item xs={6}>
              <Link to="/explore">
              <Tooltip title="Explore" placement="bottom">
              <BoxStyle
                sx={{
                  bgcolor: 'grey.800',
                    color: 'primary.main',
                  }}
              >
                <Iconify icon={'fluent-emoji-flat:compass'} width={28} height={28} />
                <BoxMask value={'light'} />
              </BoxStyle>
              </Tooltip>
              </Link>
            </Grid>


            <Grid item xs={6}>
              <Link to="/category/Gaming">
              <Tooltip title="Category" placement="bottom">
              <BoxStyle
                sx={{
                  bgcolor: 'grey.800',
                    color: 'primary.main',
                  }}
              >
                <Iconify icon={'noto:artist-palette'} width={28} height={28} />
                <BoxMask value={'light'} />
              </BoxStyle>
              </Tooltip>
              </Link>
            </Grid>


            {isConnected ? (
            <Grid item xs={6}>
              <Link to="/profile">
            <Tooltip title="Profile" placement="bottom">
              <BoxStyle
                sx={{
                  bgcolor: 'grey.800',
                    color: 'primary.main',
                  }}
              >
                <Iconify icon={'emojione:blond-haired-person-medium-light-skin-tone'} width={28} height={28} />
                <BoxMask value={'light'} />
              </BoxStyle>
              </Tooltip>
              </Link>
            </Grid>
            ) : (
               <Grid item xs={6}>
               <Link to="/connect">
             <Tooltip title="Connect" placement="bottom">
               <BoxStyle
                 sx={{
                   bgcolor: 'grey.800',
                     color: 'primary.main',
                   }}
               >
                 <Iconify icon={'logos:metamask-icon'} width={28} height={28} />
                 <BoxMask value={'light'} />
               </BoxStyle>
               </Tooltip>
               </Link>
             </Grid>

            )}
        
      </Grid>
    </RadioGroup>
  );
}
