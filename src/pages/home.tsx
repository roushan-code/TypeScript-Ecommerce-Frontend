import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";

const Home = () => {

  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1)
      return toast.error("Product is out of stock");

    dispatch(addToCart(cartItem));

    toast.success("Added to cart");
  }
  if (isError) toast.error("can not fetch Product")
  return (
    <div className='home'>
      <section>
        <img src="https://res.cloudinary.com/ddxwcwxhl/image/upload/v1752034000/samples/ai-generated-8261668_1280_mdblf8.jpg" style={{
          width: "100%",
          height: "18.75rem",
          margin: "auto",
          objectFit: "cover",
          objectPosition: "center"
        }} loading="lazy" alt="" />
      </section>
      <h1>Latest Products
        <Link to='/search' className="findmore" >More </Link>
        
      </h1>
      <main>
        {
          isLoading ? (<Skeleton width="80vw" />) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                photo={i.photo[0].url}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
              />
            )))
        }
      </main>
    </div>
  )
}

export default Home