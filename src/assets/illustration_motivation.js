// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function MotivationIllustration({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHTER = theme.palette.primary.lighter;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
       <img src='/illustration/cherry-blossom-tree.png' alt='Blossom Tree' />
    </Box>
  );
}
