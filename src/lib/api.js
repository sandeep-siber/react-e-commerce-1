export const FIREBASE_DOMAIN =
  'https://react-http-7abad-default-rtdb.firebaseio.com';

export const LOGIN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDU9_Ti8XV_nwJzzt6H7-0lIFBWdMDlVhQ';

export const SIGNUP_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDU9_Ti8XV_nwJzzt6H7-0lIFBWdMDlVhQ';

export async function getAllCategories() {
  const response = await fetch(`${FIREBASE_DOMAIN}/categories.json`);

  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error(data.message || 'Could not fetch categories.');
  }

  const transformedCategories = [];
  for (const key in data) {
    const categoryObj = {
      id: key,
      ...data[key],
    };

    transformedCategories.push(categoryObj);
  }

  return transformedCategories;
}

export async function getSingleCategory(categoryId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/categories/${categoryId}.json`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch category');
  }

  const loadedCategory = {
    id: categoryId,
    ...data,
  };

  return loadedCategory;
}

export async function addCategory(categoryData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/categories.json`, {
    method: 'POST',
    body: JSON.stringify(categoryData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create category');
  }

  return null;
}

export async function addProduct(newProductData) {
  const newProduct = {
    date: new Date(),
    ...newProductData,
  };

  const response = await fetch(
    `${FIREBASE_DOMAIN}/prds/${newProduct.category}.json`,
    {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not add product.');
  }
  return { productId: data.name };
}

export async function getCategoryProducts(categoryId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/prds/${categoryId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Could not find products for this category'
    );
  }

  const transformedProducts = [];

  for (const key in data) {
    const productObj = {
      id: key,
      ...data[key],
      date: new Date(data[key].date),
    };
    transformedProducts.push(productObj);
  }

  return transformedProducts;
}

export async function getAllProducts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/prds.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch all products.');
  }

  const transformedProducts = [];
  let category;
  for (const cat in data) {
    category = data[cat];
    for (const pid in category) {
      const prodObj = {
        id: pid,
        ...category[pid],
        date: new Date(category[pid].date),
      };
      transformedProducts.push(prodObj);
    }
  }

  return transformedProducts;
}

export async function getProducts(categoryId) {
  let api = '';
  if (categoryId === 'all') {
    api = `${FIREBASE_DOMAIN}/prds.json`;
  } else {
    api = `${FIREBASE_DOMAIN}/prds/${categoryId}.json`;
  }

  const response = await fetch(api);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch all products.');
  }

  if (categoryId === 'all') {
    const transformedProducts = [];
    let category;
    for (const cat in data) {
      category = data[cat];
      for (const pid in category) {
        const prodObj = {
          id: pid,
          ...category[pid],
          date: new Date(category[pid].date),
        };
        transformedProducts.push(prodObj);
      }
    }

    return transformedProducts;
  }

  if (categoryId !== 'all') {
    const transformedProducts = [];

    for (const key in data) {
      const productObj = {
        id: key,
        ...data[key],
        date: new Date(data[key].date),
      };
      transformedProducts.push(productObj);
    }

    return transformedProducts;
  }
}

export async function getSingleProduct(productId) {
  const products = await getProducts('all');
  return products.find((p) => p.id === productId);
}

export async function searchProducts() {}

export async function getShowcaseFadeItems() {
  const response = await fetch(`${FIREBASE_DOMAIN}/showcase_fade.json`);

  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error(data.message || 'Could not fetch categories.');
  }

  const transformedItems = [];
  for (const key in data) {
    const categoryObj = {
      id: key,
      ...data[key],
    };

    transformedItems.push(categoryObj);
  }

  return transformedItems;
}

export async function getShowcaseFourItems() {
  const response = await fetch(`${FIREBASE_DOMAIN}/showcase_four.json`);

  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error(data.message || 'Could not fetch categories.');
  }

  const transformedItems = [];
  for (const key in data) {
    const itemObj = {
      id: key,
      ...data[key],
    };

    transformedItems.push(itemObj);
  }

  return transformedItems;
}

export async function getShowcaseTestimonials() {
  const response = await fetch(`${FIREBASE_DOMAIN}/showcase_testimonials.json`);

  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error(data.message || 'Could not fetch categories.');
  }

  const transformedItems = [];
  for (const key in data) {
    const itemObj = {
      id: key,
      ...data[key],
    };

    transformedItems.push(itemObj);
  }

  // console.log(transformedItems);

  return transformedItems;
}

export async function getBrands() {
  const response = await fetch(`${FIREBASE_DOMAIN}/brands.json`);

  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error(data.message || 'Could not fetch categories.');
  }

  const transformedBrands = [];
  for (const key in data) {
    const brandObj = {
      // id: '',
      ...data[key],
    };

    transformedBrands.push(brandObj);
  }

  return transformedBrands;
}

export async function checkDuplicateProductTitle(productData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/prds/${productData.categoryId}.json?orderBy="title"&equalTo="${productData.title}"`
  );

  const data = await response.json();

  if (!response.ok) {
    console.log(data.message);
    throw new Error(data.message || 'Could not fetch all products.');
  }

  let product = null;

  for (const key in data) {
    product = data[key];
  }

  // console.log(product, !!product);

  return !!product;
}

export async function findProduct(categoryId, productId) {
  const url = `${FIREBASE_DOMAIN}/prds/${categoryId}/${productId}.json`;

  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    console.log(data.message);
    throw new Error(data.message || 'Could not fetch all products.');
  }

  const foundProduct = {
    productId: productId,
    ...data,
  };

  return foundProduct;
}

export async function updateProduct(productData) {
  const updatedProduct = {
    date: new Date(),
    ...productData,
  };

  const response = await fetch(
    `${FIREBASE_DOMAIN}/prds/${updatedProduct.category}/${updatedProduct.productId}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not add product.');
  }
  // console.log('update: ', data);
  return data;
}

export async function sendCartData(cart) {
  const response = await fetch(`${FIREBASE_DOMAIN}/cart.json`, {
    method: 'PUT',
    body: JSON.stringify(cart),
  });

  if (!response.ok) {
    throw new Error('Sending cart data failed!');
  }
}

export async function sendOrderData(orderData) {
  const order = {
    date: new Date(),
    ...orderData,
  };

  const response = await fetch(
    `${FIREBASE_DOMAIN}/order/${order.user.userId}.json`,
    {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could place order.');
  }
  return { orderId: data.name };
}

export async function getFavourites(userId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/favourites/${userId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Could not find products for this category'
    );
  }

  return data.items;
}

export async function getOrders(userId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/order/${userId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could place order.');
  }

  return data;
}

export async function getUserProfile(userId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/profile/${userId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could place order.');
  }

  return data;
}

export async function sendUserProfile(userProfileData) {
  const userProfile = {
    date: new Date(),
    ...userProfileData,
  };

  const response = await fetch(
    `${FIREBASE_DOMAIN}/profile/${userProfile.userId}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify(userProfile),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not update Profile.');
  }

  return data;
}

export async function checkDuplicateEmailSubscription(email) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/emails.json?orderBy="email"&equalTo="${email}"`
  );

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
  }

  let checkEmail = null;

  for (const key in data) {
    checkEmail = data[key];
  }

  // console.log(checkEmail, !!checkEmail);

  return !!checkEmail;
}

export async function sendEmailForSubscribe(subscribeData) {
  if (!subscribeData) return;
  if (!subscribeData.email) return;

  const isDuplicate = await checkDuplicateEmailSubscription(
    subscribeData.email
  );

  if (isDuplicate) {
    return {
      email: subscribeData.email,
      message: 'Duplicate Email entered!',
      isDuplicate: true,
    };
  } else {
    const response = await fetch(`${FIREBASE_DOMAIN}/emails.json`, {
      method: 'POST',
      body: JSON.stringify(subscribeData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Could not update Profile.');
    }
    return { email: subscribeData.email, message: 'ok' };
  }
}
