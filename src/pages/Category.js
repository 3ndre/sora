// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import CategoryList from '../sections/spaces/CategoryList';

// ----------------------------------------------------------------------

// import ABIS from "../abis/abis.json";
import axios from "axios";
import { useState } from "react";
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Category() {
  const { themeStretch } = useSettings();


  const category = useParams().category;

  const [data, updateData] = useState(null);
  const [dataFetched, updateFetched] = useState(false);


  async function getByCategory() {
    

    let meta = await axios.get(`https://sora-backend.glitch.me/api/spaces/category/${category}`);

    
    
   
    updateFetched(true);
    updateData(meta.data);
}



if(!dataFetched)
    getByCategory();


  return (
    <Page title="Category">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          

            <Grid item xs={12}>
              <CategoryList data={data} category={category}/>
            </Grid>

            
          </Grid>
      </Container>
    </Page>
  );
}
