import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import { MessageResponse } from '../types/api-types';
import { userExist, userNotExist } from '../redux/reducer/userReducer';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [gender, setGender] = React.useState("")
  const [date, setDate] = React.useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    try{
      const provider = new GoogleAuthProvider();
      const {user} = await signInWithPopup(auth, provider);
      const res = await login({
        name:  user.displayName!,
        email:  user.email!,
        photo:  user.photoURL!,
        gender: gender,
        dob: date,
        role: "user",
        _id: user.uid
        });
        
        const existUser = {
          name:  user.displayName!,
          email:  user.email!,
          photo:  user.photoURL!,
          gender: gender,
          dob: date,
          role: "user",
          _id: user.uid
          }

      if("data" in res){
        // console.log(res.data);

        toast.success(res.data?.message || "Sign In Success")
        dispatch(userExist(existUser));
      }else{
        
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.success(message)
        dispatch(userNotExist());
      }
      
    }catch(e){
      console.log(e);
      toast.error("Sign In Failed")
    }
  }

  return (
    <div className='login'>
      <main>
      <h1 className='heading'>Login</h1>
      <div>
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value={""}>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label >Date of Birth</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <p>Already Signed In Once</p>
        <button onClick={loginHandler}> <FcGoogle/> <span>Sign In With Google</span> </button>
      </div>
      </main>
    </div>
  )
}

export default Login