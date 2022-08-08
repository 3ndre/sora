// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import SpaceForm from '../sections/spaces/SpaceForm';


// ----------------------------------------------------------------------

export default function CreateSpace() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Create space">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <HeaderBreadcrumbs
          heading={'Create new space'}
          links={[
            { name: '', href: '' },
          ]}
        />

        <SpaceForm/>
      </Container>
    </Page>
  );
}
