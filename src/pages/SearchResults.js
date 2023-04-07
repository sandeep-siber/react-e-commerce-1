import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useHttp from '../hooks/useHttp';
import { getAllProducts } from '../lib/api';
import { sortList, transformFilterItems } from '../utils/utils';

import PageContainer from '../components/UI/PageContainer';
import PageHeading from '../components/Layouts/PageHeading';
import SearchBar from '../components/Search/SearchResults/SearchBar';
import SortBar from '../components/Search/SearchResults/SortBar';
import SearchResultsContainer from '../components/Search/SearchResults/SearchResultsContainer';
import FiltersForm from '../components/Search/SearchResults/FiltersForm';
import ResultList from '../components/Search/SearchResults/ResultList';

const CATEGORIES_DATA = [
  'All Products',
  'Sweets',
  'Savouries',
  'Dairy',
  'Instant Mixes',
  'Pulp 7 Spread',
  'chitale M2',
];

// const BRANDS_DATA = [
//   'Chitale Dairy',
//   'Aditya Milk',
//   'Vikas Milk',
//   'Sakas Patan',
//   'Krishna Co Op',
// ];

// const SORT_DATA = [
//   'Relevance',
//   'Alphabetically, A - Z',
//   'Alphabetically, Z - A',
//   'Price, Low to High',
//   'Price, High to Low',
//   'Date, New to old',
//   'Date, Old to New',
// ];

const SORT_DATA = [
  { caption: 'Title Ascending', value: 'title-asc' },
  { caption: 'Title Descending', value: 'title-desc' },
  { caption: 'Price Ascending', value: 'price-asc' },
  { caption: 'Price Descending', value: 'price-desc' },
  { caption: 'Date Ascending', value: 'date-asc' },
  { caption: 'Date Descending', value: 'date-desc' },
];

// const AVAILABILITY_DATA = ['In Stock', 'Out of Stock'];

function SearchResultsPage() {
  const [openFiltersForm, setOpenFiltersForm] = useState(false);

  const [filters, setFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [categoriesCheckList, setCategoriesCheckList] = useState([]);
  const [sortCheckList, setSortCheckList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedSort = queryParams.get('sort') || 'title-asc';

  const {
    sendRequest,
    data: loadedProducts,
    status,
    error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    setCategoriesCheckList(transformFilterItems(CATEGORIES_DATA));
    setSortCheckList(transformFilterItems(SORT_DATA, 'sort', 'radio'));
  }, []);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    let sortQuery = `?sort=${selectedSort}`;

    let filterQuery = '';

    for (const filter of filters) {
      filterQuery = filterQuery.concat(
        `&filter.${filter.fieldName}=${filter.fieldValue}`
      );
    }

    console.log(sortQuery, filterQuery);

    // navigate({
    //   pathname: location.pathname,
    //   search: query,
    // });
  }, [filters, selectedSort]);

  const searchProducts = useCallback(
    (searchText) => {
      if (!searchText) {
        setFilteredProducts(loadedProducts);
        return;
      }
      // const fetchedProducts = await getAllProducts();
      setFilteredProducts(
        loadedProducts.filter((p) => {
          const title = p.title.toUpperCase();
          const searchKey = searchText.toUpperCase();

          return title.includes(searchKey);
        })
      );
    },
    [loadedProducts]
  );

  function showFiltersModalHandler() {
    setOpenFiltersForm(true);
  }
  function hideFiltersModalHandler() {
    setOpenFiltersForm(false);
  }
  function showResultsHandler() {
    hideFiltersModalHandler();
  }

  // In Reducer
  function checkListClickHandler(checkListItem) {
    setCategoriesCheckList((prvItems) => {
      const updatedItems = [...prvItems];
      const index = updatedItems.findIndex(
        (item) => item.id === checkListItem.id
      );
      updatedItems[index].checked = checkListItem.checked;
      // updatedItems[index].checked = true;
      return updatedItems;
    });

    const filter = {
      id: checkListItem.id,
      fieldName: checkListItem.fieldName,
      fieldValue: checkListItem.fieldValue,
      checked: checkListItem.checked,
      caption: checkListItem.caption,
    };

    setFilters((prvFilters) => {
      let updatedFilters;
      if (checkListItem.checked) {
        updatedFilters = [...prvFilters, filter];
      } else {
        updatedFilters = prvFilters.filter((f) => f.id !== filter.id);
      }

      return updatedFilters;
    });
  }

  function filterRemoveHandler(filterId) {
    setCategoriesCheckList((prvItems) => {
      const updatedItems = [...prvItems];
      const index = updatedItems.findIndex((item) => item.id === filterId);
      updatedItems[index].checked = false;
      return updatedItems;
    });

    setFilters((prvFilters) =>
      prvFilters.filter((item) => item.id !== filterId)
    );
  }
  // .................................

  function changeSortingHandler(selected) {
    const selectedSorting = selected;
    navigate({
      pathname: location.pathname,
      search: `?sort=${selectedSorting}`,
    });
  }

  let resultList;
  if (status === 'pending') {
    resultList = (
      <div className='centered'>
        <p>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    resultList = (
      <div className='centered'>
        <p>{error}</p>
      </div>
    );
  }

  if (status === 'completed') {
    // const filteredProducts = loadedProducts;
    const sortedProducts = sortList(filteredProducts, selectedSort);
    resultList = <ResultList items={sortedProducts} />;
  }

  return (
    <PageContainer>
      <header>
        <PageHeading>Search Results</PageHeading>

        <SearchBar onSearchKeyChange={searchProducts} />

        <SortBar
          onShowFiltersModal={showFiltersModalHandler}
          selected={selectedSort}
          onSelectedSort={changeSortingHandler}
        />

        <SearchResultsContainer>
          <FiltersForm
            open={openFiltersForm} // display: block status
            onHideFiltersModal={hideFiltersModalHandler}
            onShowResults={showResultsHandler}
            //..
            categoriesCheckList={categoriesCheckList}
            filters={filters}
            onChecklistClick={checkListClickHandler}
            onFilterRemove={filterRemoveHandler}
            // ..
            sortCheckList={sortCheckList}
            onSelectedSort={changeSortingHandler}
            selected={selectedSort}
          />

          {/*  by combining all filterList resultList is made so use redulcer 
              add one-by-one filters in useEffects([filter1, filter2])  and add 3rd useEffect() */}

          {resultList}
        </SearchResultsContainer>
      </header>
    </PageContainer>
  );
}

export default SearchResultsPage;
