import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signInFailure,signInSuccess,signInStart } from '../redux/user/userSlice';

export default function SignIn() {
  
  const [formData,setformData] = useState({});
  const {loading,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // setLoading(true); 
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
      {
        method:'Post',
        headers:{
          'Content-Type' : 'application/json',
          },
        body :JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn Page</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? 'loading...' :'Sign Up'}</button>
      </form>
      <div className='flex gap-2 st-5' >
        <p>Dont an account?</p>
        <Link to={"/sign-up"} >
        <span className='text-blue-700' >Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red mt-5'>{error}</p>}
    </div>
  )
}
