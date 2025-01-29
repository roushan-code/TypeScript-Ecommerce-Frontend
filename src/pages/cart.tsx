import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, calculatePrice, discountApplied, removeFromCart } from "../redux/reducer/cartReducer";
import { server } from "../redux/store";
import { CartReducerInitialState } from "../types/reducer-type";
import { CartItems } from "../types/types";
import CartItemsCard from "./cart-item";



const Cart = () => {

  const {cartItems, subtotal, tax, shippingCharges,total, discount} = useSelector((state: {cartReducer: CartReducerInitialState}) => state.cartReducer);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem:CartItems) => {
    if(cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}));
  }
  const decrementHandler = (cartItem:CartItems) => {
    if(cartItem.quantity <= 1) return;
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}));
  }
  const removeHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  }

  useEffect(() => {
    const {token, cancel} = axios.CancelToken.source();
    
    const timeOutId = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {cancelToken: token, withCredentials: true}
      )
      .then((res) => {
        dispatch(discountApplied(res.data.discount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      })
      .catch(() => {
        dispatch(discountApplied(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
      })

    }, 1000)
    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
      cancel();
    }
  }, [couponCode])

  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems, dispatch])
  return (
    <div className='cart'>
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i, idx) => (
            <CartItemsCard key={idx} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler} cartItem={i} />
          )) : <h1>No items Added</h1>
        }

      </main>
      <aside>
        <p>Subtotal:  ₹{subtotal}</p>
        <p>Shipping Charges:  ₹{shippingCharges}</p>
        <p>Tax:  ₹{tax.toFixed(2)}</p>
        <p>Discount: <em className="red">- ₹{discount}</em></p>
        <p><b>Total:</b>  ₹{total.toFixed(2)}</p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon Code"
        />

        {
           couponCode && (isValidCouponCode ? <span className="green"> ₹{discount} off using the 
            <code>{ couponCode}</code>
            </span> : <span className="red">Invalid Coupon Code <VscError/></span>)
        }

        { 
          cartItems.length > 0 && <Link to="/shipping">Proceed to Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart