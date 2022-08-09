// @mui
import { Container, Box, Typography } from '@mui/material';

// hooks
import useSettings from '../../hooks/useSettings';

// components
import Page from '../../components/Page';

// sections
import SpaceCard from '../../sections/card/SpaceCard';
import { SkeletonSpaceCard } from '../../components/skeleton';

// ----------------------------------------------------------------------

export default function SpaceList({data}) {
  const { themeStretch } = useSettings();


  return (
    <Page title="Explore">
      <Container maxWidth={themeStretch ? false : 'lg'}>

      <Typography variant="h4" gutterBottom>
            Explore spaces
          </Typography>
       
        <Box
          sx={{
            mt: 5,
            display: 'grid',
            gap: 5,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {data === null ? <>
            {[...Array(12)].map((i, index) => 
          <SkeletonSpaceCard key={index}/>
         )}
          </> : 
          <>
          {data.map((space) => (
            <SpaceCard key={space.listingId} space={space} />
          ))}
          </>
        }
        </Box>
      </Container>
    </Page>
  );
}
