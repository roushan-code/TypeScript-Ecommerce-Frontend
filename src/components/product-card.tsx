import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItems } from "../types/types";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItems) => string | undefined;
  };



const ProductCard = ({ productId, photo, name, price, stock, handler }: ProductProps) => {
  return (
    <div className="product-card">
     <img src={photo} alt={name} loading="lazy" />   
     <p>{name}</p>
     <span> ₹{price}</span>
     <div>
      <button onClick={()=> handler({ productId, photo, name, price, stock, quantity: 1 })}>
        <FaPlus/>
      </button>
      <Link to={`/product/${productId}`}><BsBoxArrowUpRight /></Link>
     </div>
    </div>
  )
}

export default ProductCard
