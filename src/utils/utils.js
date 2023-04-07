export function sortList(products, selectedSort) {
  let sortedProducts = [];
  switch (selectedSort) {
    case 'title-asc':
    default:
      sortedProducts = products.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      break;

    case 'title-desc':
      sortedProducts = products.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }
        return 0;
      });
      break;

    case 'price-asc':
      sortedProducts = products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      break;

    case 'price-desc':
      sortedProducts = products.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
      break;

    case 'date-asc':
      sortedProducts = products.sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) {
          return -1;
        }
        if (a.date.getTime() > b.date.getTime()) {
          return 1;
        }
        return 0;
      });
      break;

    case 'date-desc':
      sortedProducts = products.sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) {
          return 1;
        }
        if (a.date.getTime() > b.date.getTime()) {
          return -1;
        }
        return 0;
      });
      break;
  }

  return sortedProducts;
}

export function transformFilterItems(items, radioName, type = 'checkbox') {
  const tranformedItems = items.map((item, index) => {
    // const name = type === 'radio' ? radioName : item.split(' ').join('');
    // const id = type === 'radio' ? radioName + index : name;

    const name = type === 'radio' ? radioName : item.split(' ').join('');
    const id = type === 'radio' ? radioName + index : name;
    const caption = type === 'radio' ? item.caption : item;
    const value = type === 'radio' ? item.value : item;

    return {
      id: id,
      name: name,
      caption: caption,
      checked: false,
      value: value,
    };
  });

  return tranformedItems;
}

export function getSearchParams(filters, selectedSort) {
  const filtersMap = new Map();
  filtersMap.set('category', []);
  filtersMap.set('brands', []);
  filtersMap.set('priceRange.gt', [10]);
  filtersMap.set('priceRange.lt', [1000]);
  filtersMap.set('availability', []);

  for (const filter of filters) {
    if (filtersMap.has(filter.fieldName)) {
      const filterData = filtersMap.get(filter.fieldName);
      filterData.push(filter.caption);
      filtersMap.set(filter.fieldName, filterData);
    } else {
      filtersMap.set(filter.fieldName, [filter.caption]);
    }
  }

  let searchParams = new URLSearchParams('');
  searchParams.append('sort', selectedSort);
  for (const [param, values] of filtersMap) {
    for (const value of values) {
      searchParams.append(param, value);
    }
  }

  return searchParams.toString();
}

export function stringToBoolean(string) {
  return string ? (string.toLowerCase() === 'true' ? true : false) : false;
}

// function sortList(products, selectedSort) {
//     let sortedProducts = [];
//     switch (selectedSort) {
//       case 'title-asc':
//       default:
//         sortedProducts = products.sort((a, b) => {
//           const titleA = a.title.toUpperCase();
//           const titleB = b.title.toUpperCase();
//           if (titleA < titleB) {
//             return -1;
//           }
//           if (titleA > titleB) {
//             return 1;
//           }
//           return 0;
//         });
//         break;

//       case 'title-desc':
//         sortedProducts = products.sort((a, b) => {
//           const titleA = a.title.toUpperCase();
//           const titleB = b.title.toUpperCase();
//           if (titleA < titleB) {
//             return 1;
//           }
//           if (titleA > titleB) {
//             return -1;
//           }
//           return 0;
//         });
//         break;

//       case 'price-asc':
//         sortedProducts = products.sort((a, b) => {
//           if (a.price < b.price) {
//             return -1;
//           }
//           if (a.price > b.price) {
//             return 1;
//           }
//           return 0;
//         });
//         break;

//       case 'price-desc':
//         sortedProducts = products.sort((a, b) => {
//           if (a.price < b.price) {
//             return 1;
//           }
//           if (a.price > b.price) {
//             return -1;
//           }
//           return 0;
//         });
//         break;

//       case 'date-asc':
//         sortedProducts = products.sort((a, b) => {
//           if (a.date.getTime() < b.date.getTime()) {
//             return -1;
//           }
//           if (a.date.getTime() > b.date.getTime()) {
//             return 1;
//           }
//           return 0;
//         });
//         break;

//       case 'date-desc':
//         sortedProducts = products.sort((a, b) => {
//           // console.log('a: ', a.date.getTime(), 'b: ', b.date.getTime());
//           console.log('a: ', a.date, 'b: ', b.date);
//           if (a.date.getTime() < b.date.getTime()) {
//             return 1;
//           }
//           if (a.date.getTime() > b.date.getTime()) {
//             return -1;
//           }
//           return 0;
//         });
//         break;
//     }

//     return sortedProducts;
//   }
