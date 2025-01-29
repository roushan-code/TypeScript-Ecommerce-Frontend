import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItems } from "../types/types";

type CartItemsProps = {
    cartItem: CartItems; 
    incrementHandler: (cartItem: CartItems) => void;
    decrementHandler: (cartItem: CartItems) => void;
    removeHandler: (productId: string) => void;

}

const CartItemsCard = ({
    cartItem,
    incrementHandler,
    decrementHandler,
    removeHandler
}: CartItemsProps) => {
const {productId, photo, name, price, quantity} = cartItem;
  return (
    <div className="cart-item">
        <img src={photo} alt={name} />
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span>₹{price}</span>
        </article>

        <div>
            <button onClick={() => decrementHandler(cartItem)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => incrementHandler(cartItem)}>+</button>
        </div>

        <button onClick={() => removeHandler(productId)}>
            <FaTrash />
        </button>
    </div>
  )
}

export default CartItemsCard