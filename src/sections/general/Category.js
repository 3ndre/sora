
import Slider from 'react-slick';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, CardHeader, Grid} from '@mui/material';

import axios from 'axios';
// components

import { CarouselArrows } from '../../components/carousel';
import SpaceTopCard from '../card/SpaceTopCard';

// ----------------------------------------------------------------------

export default function Category() {
  
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };




  
  const [data, updateData] = useState(null);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllCategory() {

    let meta = await axios.get('http://localhost:5000/api/category');
    
    
   
    updateFetched(true);
    updateData(meta.data);
}






  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };


  
if(!dataFetched)
getAllCategory();

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Category 🎨"
        subheader="Some of the popular categories"
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {data && data.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </Slider>
    </Box>
  );
}

// ----------------------------------------------------------------------


function CategoryItem({ item }) {

  return (
<>
<Link to={`/category/${item.category}`} style={{textDecoration: 'none', cursor: 'pointer'}}>
    <Grid sx={{mr: 3}} >
      <span >
    <SpaceTopCard title={`${item.category}`} color={`${item.color}`} icon={`${item.icon}`} />
    </span>
    </Grid>
    </Link>
  </>
  );
}
