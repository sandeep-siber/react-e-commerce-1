export function getSearchKeys() {
  const keys = localStorage.getItem('searchKeys');
  if (!keys) {
    return;
  }

  return keys.split(',');
}

export function saveSearchKey(newKey) {
  if (!newKey) {
    return;
  }
  const searchKeys = localStorage.getItem('searchKeys');
  let updatedSearchKeys;
  if (!searchKeys) {
    updatedSearchKeys = [newKey];
  } else {
    const oldSearchKeys = searchKeys.split(',');
    if (oldSearchKeys.includes(newKey)) {
      return;
    }
    updatedSearchKeys = [newKey, oldSearchKeys];
  }
  localStorage.setItem('searchKeys', updatedSearchKeys);

  //...
  console.log(localStorage.getItem('searchKeys').split(','));
}
