import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CustomError } from "../types/api-types";
import { CartItems } from "../types/types";

const Search = () => {

  const { data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error
  } = useCategoriesQuery("");

  
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  
  const {isLoading: productLoading, data: searchedData, isError: productIsError, error: productError} = useSearchProductsQuery({
    search,
    sort,
    price: maxPrice,
    category,
    page
  });
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1)
      return toast.error("Product is out of stock");

    dispatch(addToCart(cartItem));
    
    toast.success("Added to cart");
  }
  
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError)
    toast.error((error as CustomError).data.message);

  if (productIsError)
    toast.error((productError as CustomError).data.message);

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Popularity (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""} </h4>
          <input
            type="range"
            min={100}
            max={1000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

          <div>
            <h4>Category</h4>
            <select
              value={sort}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">ALL</option>
              {!loadingCategories && categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>{i.toUpperCase()}</option>)
              )}

            </select>
          </div>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />

          <div style={{display: "flex", flexWrap: "wrap"}}>
          {
            productLoading ? <Skeleton length={5}/> : searchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                photo={i.photo[0].url}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
              />
            ))
          }
          </div>

        {
          searchedData && searchedData?.totalPage > 1 && (
            <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage(prev => prev - 1)}>Prev</button>
          <span>
            {page} of {searchedData.totalPage}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage(prev => prev + 1)}>Next</button>
        </article>)
        }
      </main>
    </div>
  )
}

export default Search