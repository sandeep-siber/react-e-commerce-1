import { useRef, useState } from 'react';

import classes from './ProductForm.module.css';

const isEmpty = (value) => value.trim() === '';
const isZero = (value) => +value <= 0;

function ProductForm({
  isEdit,

  loadedCategories,
  onCheckDuplicateTitle,
  titleIsDuplicate,
  onSaveProduct,
  product,
}) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    titleIsDuplicate: false,
    title: true,
    imageUrl: true,
    description: true,
    price: true,
    brand: true,
  });

  const categoryInputRef = useRef();
  const titleInputRef = useRef();
  const imageUrlInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();
  const brandInputRef = useRef();
  const availabilityInputRef = useRef();
  const infoInputRef = useRef();
  let editProduct;
  if (product) {
    editProduct = { ...product };
  } else {
    editProduct = {
      category: '',
      title: '',
      imageUrl: '',
      description: '',
      price: 0.0,
      brand: '',
      availability: null,
    };
  }

  function formSubmissionHandler(event) {
    event.preventDefault();
    const selectedCategoryId = categoryInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredImageUrl = imageUrlInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredBrand = brandInputRef.current.value;
    const checkedAvailability = availabilityInputRef.current.checked;
    const enteredInfo = infoInputRef.current.value;

    const enteredTitleIsDuplicate = !titleIsDuplicate;
    const enteredTitleIsValid = !isEmpty(enteredTitle);
    const enteredImageUrlIsValid = !isEmpty(enteredImageUrl);
    const enteredDescriptionIsValid = !isEmpty(enteredDescription);
    const enteredPriceIsValid = !isZero(enteredPrice);
    const enteredBrandIsValid = !isEmpty(enteredBrand);

    const formIsValid =
      enteredTitleIsDuplicate &&
      enteredTitleIsValid &&
      enteredImageUrlIsValid &&
      enteredDescriptionIsValid &&
      enteredPriceIsValid &&
      enteredBrandIsValid;

    setFormInputsValidity({
      duplicateTitle: enteredTitleIsDuplicate,
      title: enteredTitleIsValid,
      imageUrl: enteredImageUrlIsValid,
      description: enteredDescriptionIsValid,
      price: enteredPriceIsValid,
      brand: enteredBrandIsValid,
    });

    if (!formIsValid) return;

    const updatedProduct = {
      category: selectedCategoryId,
      title: enteredTitle,
      imageUrl: enteredImageUrl,
      description: enteredDescription,
      price: +enteredPrice,
      brand: enteredBrand,
      availability: checkedAvailability,
      info: enteredInfo,
    };

    onSaveProduct(updatedProduct);
  }

  function titleBlurHandler(event) {
    const title = titleInputRef.current.value;
    const categoryId = categoryInputRef.current.value;

    onCheckDuplicateTitle({
      title: title,
      categoryId: categoryId,
    });
  }

  if (titleIsDuplicate) {
    titleInputRef.current.focus();
  }

  const titleInputClasses =
    formInputsValidity.title && !titleIsDuplicate
      ? classes['form-control']
      : `${classes['form-control']} ${classes['invalid']}`;

  const imageUrlInputClasses = formInputsValidity.imageUrl
    ? classes['form-control']
    : `${classes['form-control']} ${classes['invalid']}`;

  const descriptionInputClasses = formInputsValidity.description
    ? classes['form-control']
    : `${classes['form-control']} ${classes['invalid']}`;

  const priceInputClasses = formInputsValidity.price
    ? classes['form-control']
    : `${classes['form-control']} ${classes['invalid']}`;

  const brandInputClasses = formInputsValidity.brand
    ? classes['form-control']
    : `${classes['form-control']} ${classes['invalid']}`;

  return (
    <section className={classes['product-form']}>
      <form onSubmit={formSubmissionHandler}>
        <div className={classes['form-control']}>
          <label htmlFor='categories'>Select Category</label>
          <select
            id='categories'
            ref={categoryInputRef}
            disabled={isEdit ? true : false}
            defaultValue={editProduct.category}
          >
            {loadedCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className={titleInputClasses}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            ref={titleInputRef}
            onBlur={titleBlurHandler}
            disabled={isEdit ? true : false}
            defaultValue={editProduct.title}
          />
          {!formInputsValidity.title && <p>Title not entered</p>}
          {titleIsDuplicate && <p>Duplicate Title not allowed</p>}
        </div>

        <div className={imageUrlInputClasses}>
          <label htmlFor='imageUrl'>Image Url</label>
          <input
            type='text'
            id='imageUrl'
            ref={imageUrlInputRef}
            defaultValue={editProduct.imageUrl}
          />
          {!formInputsValidity.imageUrl && <p>ImageUrl not entered</p>}
        </div>

        <div className={descriptionInputClasses}>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            ref={descriptionInputRef}
            defaultValue={editProduct.description}
          />
          {!formInputsValidity.description && <p>Description not entered</p>}
        </div>

        <div className={priceInputClasses}>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            ref={priceInputRef}
            step='0.01'
            defaultValue={editProduct.price}
          />
          {!formInputsValidity.price && <p>Price not entered</p>}
        </div>

        <div className={brandInputClasses}>
          <label htmlFor='brand'>Brand</label>
          <input
            type='text'
            id='brand'
            ref={brandInputRef}
            defaultValue={editProduct.brand}
          />
          {!formInputsValidity.brand && <p>Description not entered</p>}
        </div>

        <div className={classes['form-control']}>
          <label>
            Availability
            <input
              type='checkbox'
              name='availablity'
              ref={availabilityInputRef}
              defaultChecked={editProduct.availability}
            />
          </label>
        </div>

        <div className={classes['form-control']}>
          <label htmlFor='info'>Info</label>
          <textarea
            rows='5'
            cols='40'
            type='text'
            id='info'
            ref={infoInputRef}
            defaultValue={editProduct.info}
          />
        </div>

        <div className={classes.actions}>
          <button>{isEdit ? 'Update Product' : 'Add Product'}</button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
