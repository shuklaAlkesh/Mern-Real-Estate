// import React, { useState } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice.js';
// import OAuth from '../Components/OAuth.jsx';

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
  
//   // const [error, setError] = useState(null);
//   // const [loading, setLoading] = useState(false);
//   const {loading,error} = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setLoading(true);
//     try {
//       dispatch(signInStart());
//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       // if (!res.ok) {
//       //   throw new Error('Network Issues');
//       // }

//       const data = await res.json();
//       if(data.success == false){
//         // setLoading(false);
//         // setError(data.message);
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       // setLoading(false);
//       // setError(null);
//       dispatch(signInSuccess(data)); // Update the Redux state with successful sign-in
//       navigate('/'); 
//       // console.log(data); // For debugging purposes
//     } catch (error) {
//       // setLoading(false);
//       // console.error('There was a problem with the fetch operation:', error);
//       // setError(error.message);
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//       <input
//           type="email"
//           placeholder='Email'
//           className='border p-3 rounded-lg'
//           id='email'
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           placeholder='Password'
//           className='border p-3 rounded-lg'
//           id='password'
//           value={formData.password}
//           onChange={handleChange}
//         />

//         <button
//           disabled={loading}
//           type="submit"
//           className='bg-slate-700 
//           hover:text-white 
//           p-3 rounded-lg uppercase 
//           hover:opacity-95 disabled:opacity-80'
//         >
//           {loading ? 'Loading...' : 'Sign In'}
//         </button>
//         <OAuth/>
//       </form>

//       <div className='flex gap-2 mt-5'>
//         <p>Don't have an account?</p>
//         <Link to="/sign-up">
//           <span className='text-blue-700'>Sign Up</span>
//         </Link>
//       </div>
//       {/* {error &&<p className='text-red-500 mt-5'>{error}</p>} */}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../Components/OAuth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data)); // Update the Redux state with successful sign-in
      navigate('/'); 
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          value={formData.email || ''} // Handle case where formData.email might be undefined
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          value={formData.password || ''} // Handle case where formData.password might be undefined
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

