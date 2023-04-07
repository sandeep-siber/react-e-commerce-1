import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useHttp from '../hooks/useHttp';
import { getAllProducts } from '../lib/api';
import {
  sortList,
  transformFilterItems,
  getSearchParams,
} from '../utils/utils';

import PageContainer from '../components/UI/PageContainer';
import PageHeading from '../components/UI/PageHeading';
import SearchBar from '../components/Search/SearchResults/SearchBar';
import SortBar from '../components/Search/SearchResults/SortBar';
import SearchResultsContainer from '../components/Search/SearchResults/SearchResultsContainer';
import FiltersForm from '../components/Search/SearchResults/FiltersForm';
import ResultList from '../components/Search/SearchResults/ResultList';

const CATEGORIES_DATA = [
  'Sweets',
  'Savouries',
  'Dairy',
  'Instant Mixes',
  'Pulp 7 Spread',
  'chitale M2',
];

const BRANDS_DATA = [
  'Chitale Dairy',
  'Aditya Milk',
  'Vikas Milk',
  'Sakas Patan',
  'Krishna Co Op',
];

const PRICE_RANGE = { from: 100, to: 5000 };
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

const AVAILABILITY_DATA = ['In Stock', 'Out of Stock'];

/*
	Logic
var array = ["Jeremy", "John", "Hank", "Hal", "Hermine"],
    filters = {
        smallerThanFive: item => item.length < 5,
        startsWithH: item => item.startsWith('H')
    }
    selected = [filters.smallerThanFive, filters.startsWithH],
    result = array.filter(item => selected.every(f => f(item)));

console.log(result);

	dont compare search array with data
	instead onEachCheck click
		Trigger SearchHandler and search with only one key
		that all about

*/

const categoriesCheckListReducer = (state, action) => {
  if (action.type === 'CHECKLIST_CLICK') {
    const filter = {
      id: action.checkListItem.id,
      fieldName: action.checkListItem.fieldName,
      caption: action.checkListItem.caption,
    };
    const updatedCheckLists = state.checkLists;

    let updatedItems;
    if (action.checkListItem.fieldName === 'category') {
      updatedItems = [...state.checkLists.categoriesCheckList];
    }
    if (action.checkListItem.fieldName === 'brands') {
      updatedItems = [...state.checkLists.brandsCheckList];
    }
    if (action.checkListItem.fieldName === 'availability') {
      updatedItems = [...state.checkLists.availabilityCheckList];
    }

    const index = updatedItems.findIndex(
      (item) => item.id === action.checkListItem.id
    );
    updatedItems[index].checked = action.checkListItem.checked;

    let updatedFilters;
    if (action.checkListItem.checked) {
      updatedFilters = [...state.filters, filter];
    } else {
      updatedFilters = state.filters.filter((f) => f.id !== filter.id);
    }

    if (action.checkListItem.fieldName === 'category') {
      updatedCheckLists.categoriesCheckList = updatedItems;
    }
    if (action.checkListItem.fieldName === 'brands') {
      updatedCheckLists.brandsCheckList = updatedItems;
    }
    if (action.checkListItem.fieldName === 'availability') {
      updatedCheckLists.availabilityCheckList = updatedItems;
    }

    return {
      checkLists: updatedCheckLists,
      filters: updatedFilters,
    };
  }

  if (action.type === 'CHECKLIST_INPUT') {
    return {
      checkLists: action.data.checkLists,
      filters: action.data.filters,
    };
  }

  if (action.type === 'FILTER_CLICK') {
    const updatedCheckLists = state.checkLists;
    let updatedItems;
    if (action.filterData.fieldName === 'category') {
      updatedItems = [...state.checkLists.categoriesCheckList];
    }
    if (action.filterData.fieldName === 'brands') {
      updatedItems = [...state.checkLists.brandsCheckList];
    }
    if (action.filterData.fieldName === 'availability') {
      updatedItems = [...state.checkLists.availabilityCheckList];
    }

    const index = updatedItems.findIndex(
      (item) => item.id === action.filterData.id
    );
    updatedItems[index].checked = false;

    const updatedFilters = state.filters.filter(
      (item) => item.id !== action.filterData.id
    );

    if (action.filterData.fieldName === 'category') {
      updatedCheckLists.categoriesCheckList = updatedItems;
    }
    if (action.filterData.fieldName === 'brands') {
      updatedCheckLists.brandsCheckList = updatedItems;
    }
    if (action.filterData.fieldName === 'availability') {
      updatedCheckLists.availabilityCheckList = updatedItems;
    }

    return {
      checkLists: updatedCheckLists,
      filters: updatedFilters,
    };
  }
};

function SearchResultsPage() {
  const [openFiltersForm, setOpenFiltersForm] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [checkListsState, dispatchCheckLists] = useReducer(
    categoriesCheckListReducer,
    {
      checkLists: {
        categoriesCheckList: [],
        brandsCheckList: [],
        priceRange: {},
        availabilityCheckList: [],
        sortCheckList: [],
      },
      filters: [],
    }
  );

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
    dispatchCheckLists({
      type: 'CHECKLIST_INPUT',
      data: {
        checkLists: {
          categoriesCheckList: transformFilterItems(CATEGORIES_DATA),
          brandsCheckList: transformFilterItems(BRANDS_DATA),
          priceRange: PRICE_RANGE,
          availabilityCheckList: transformFilterItems(AVAILABILITY_DATA),
          sortCheckList: transformFilterItems(SORT_DATA, 'sort', 'radio'),
        },
        filters: [],
      },
    });
  }, []);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    const searchParams = getSearchParams(checkListsState.filters, selectedSort);

    navigate({
      pathname: location.pathname,
      search: searchParams,
    });
  }, [checkListsState.filters, selectedSort, location.pathname, navigate]);

  function searchProducts(searchText, products) {
    // if (!searchText) {
    //   return;
    // }
    const resultProducts = products.filter((p) => {
      const title = p.title.toUpperCase();
      const searchKey = searchText.toUpperCase();

      return title.includes(searchKey);
    });
    return resultProducts;
  }

  function searchChangeHandler(event) {
    setSearchText(event.target.value);
  }

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
    dispatchCheckLists({
      type: 'CHECKLIST_CLICK',
      checkListItem: checkListItem,
    });
  }

  function filterRemoveHandler(filterData) {
    dispatchCheckLists({
      type: 'FILTER_CLICK',
      filterData: filterData,
    });
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
    queryParams.forEach((value, key) => {
      console.log(key, value);
    });
    console.log('........');

    const filteredProducts = searchProducts(searchText, loadedProducts);
    console.log('SearchText: ', searchText);
    const sortedProducts = sortList(filteredProducts, selectedSort);
    resultList = <ResultList items={sortedProducts} />;
  }

  if (status === 'completed' && loadedProducts.length === 0) {
    resultList = (
      <div className='centered'>
        <p>Products file empty</p>
      </div>
    );
  }

  return (
    <PageContainer>
      <header>
        <PageHeading>Search Results Test</PageHeading>

        <SearchBar onSearchKeyChange={searchChangeHandler} />

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
            // categoriesCheckList={checkListsState.checkLists.categoriesCheckList}
            checkLists={checkListsState.checkLists}
            filters={checkListsState.filters}
            onChecklistClick={checkListClickHandler}
            onFilterRemove={filterRemoveHandler}
            // ..
            sortCheckList={checkListsState.checkLists.sortCheckList} // ok dont touch
            onSelectedSort={changeSortingHandler} // ok dont touch
            selected={selectedSort} // ok dont touch   // not related to reducer much
            // ..
            // brandsCheckList={checkListsState.checkLists.brandsCheckList}
            // priceRange={checkListsState.checkLists.priceRange}
            // availabilityCheckList={
            //   checkListsState.checkLists.availabilityCheckList
            // }
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

/** /store/actions

export const TOGGLE_FAV = 'TOGGLE_FAV';
export const toggleFav = id => {
    return { type: TOGGLE_FAV, productId: id };
};
 
*/

// ..

// const [checkListsState, dispatchCheckLists] = useReducer(null, {
//   checkLists: {
//     categoriesCheckList: [],
//     brandsCheckList: [],
//     priceCheckList: [],
//     availabilityCheckList: [],
//     sortByCheckList: [],
//   },
// });

// .................
