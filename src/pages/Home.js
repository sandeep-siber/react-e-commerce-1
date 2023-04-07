import { Suspense } from 'react';
import { defer, Await } from 'react-router-dom';

import {
  getAllCategories,
  getAllProducts,
  getShowcaseFadeItems,
  getShowcaseFourItems,
  getShowcaseTestimonials,
  getBrands,
} from '../lib/api';

import ShowCaseFade from '../components/Showcase/ShowcaseFade';
import { useLoaderData } from 'react-router-dom';
import ShowcaseCategories from '../components/Showcase/ShowcaseCategories';
import ShowcaseSlide from '../components/UI/ShowcaseSlide';
import ShowcaseFour from '../components/Showcase/ShowcaseFour';
import ShowcaseTestimonials from '../components/Showcase/ShowcaseTestimonials';

function HomePage() {
  const {
    showcaseItems,
    categories,
    sliderItems,
    showcaseFourItems,
    showcaseTestimonials,
    brands,
  } = useLoaderData();

  return (
    <>
      <Suspense
        fallback={
          <div className='centered'>
            <p>Loading...</p>
          </div>
        }
      >
        <Await resolve={showcaseItems}>
          {(showcaseItems) => <ShowCaseFade items={showcaseItems} />}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <div className='centered'>
            <p>Loading...</p>
          </div>
        }
      >
        <Await resolve={categories}>
          {(categories) => <ShowcaseCategories items={categories} />}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <div className='centered'>
            <p>Loading...</p>
          </div>
        }
      >
        <Await resolve={sliderItems}>
          {(sliderItems) => (
            <ShowcaseSlide items={sliderItems} heading='Best Sellers' />
          )}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <div className='centered'>
            <p>Loading...</p>
          </div>
        }
      >
        <Await resolve={showcaseFourItems}>
          {(showcaseFourItems) => <ShowcaseFour items={showcaseFourItems} />}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <div className='centered'>
            <p>Loading...</p>
          </div>
        }
      >
        <Await resolve={showcaseTestimonials}>
          {(showcaseTestimonials) => (
            <ShowcaseTestimonials items={showcaseTestimonials} />
          )}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <div className='centered'>
            <p>Loading...</p>
          </div>
        }
      >
        <Await resolve={brands}>
          {(brands) => (
            <ShowcaseSlide
              items={brands}
              imageHeight='4'
              heading='Available Brands'
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default HomePage;

export async function loader() {
  async function getSliderItems() {
    const fetchedProducts = await getAllProducts();
    return fetchedProducts.splice(0, 8);
  }

  return defer({
    showcaseItems: getShowcaseFadeItems(),
    categories: getAllCategories(),
    sliderItems: getSliderItems(),
    showcaseFourItems: getShowcaseFourItems(),
    showcaseTestimonials: getShowcaseTestimonials(),
    brands: getBrands(),
  });
}
