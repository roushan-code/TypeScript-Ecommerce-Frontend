import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/store";
import { CartReducerInitialState } from "../types/reducer-type";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
    const {cartItems, total} 
    = useSelector((state: {cartReducer: CartReducerInitialState}) => state.cartReducer);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        setShippingInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        );
     }
     useEffect(() => {
        if(cartItems.length <= 0) {
            navigate('/cart');
        }
     }, [cartItems])

        const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(saveShippingInfo(shippingInfo));
            try{
                const {data} = await axios.post(`${server}/api/v1/payment/create`, {amount: total}, {headers: {"Content-Type": "application/json"}});
                navigate("/pay", {
                    state: data.client_secret,
                });
            }catch(err) {
                // console.log(err);
                toast.error("Something went wrong");
            }
        }
     

    return (
        <div className="shipping">
            <button className="back-btn" onClick={()=> navigate('/cart')}><BiArrowBack /></button>
            <form onSubmit={submitHandler}>
                <h1>Shipping Address</h1>
                <input 
                    required
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={changeHandler} 
                    />

                <input 
                    required
                    type="text"
                    placeholder="City"
                    name="city"
                    value={shippingInfo.city}
                    onChange={changeHandler} 
                    />
                <input 
                    required
                    type="text"
                    placeholder="State"
                    name="state"
                    value={shippingInfo.state}
                    onChange={changeHandler} 
                    />
                <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Choose Count</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
                <input 
                    required
                    type="number"
                    placeholder="Pin Code"
                    name="pinCode"
                    value={shippingInfo.pinCode}
                    onChange={changeHandler} 
                    />

                <button type="submit">Pay Now</button>
            </form>
        </div>
    )
}

export default Shipping