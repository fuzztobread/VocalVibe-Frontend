import { useGoogleLogin,GoogleLogin } from '@react-oauth/google';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Inputbox, Logo } from "../components";
import { connect } from 'react-redux';
import { setUser } from '../features/user';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';



const LoginPage = (props) => {
  //const user = {};
  const navigate = useNavigate();


  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // const [name, value] = e.target; change to one below
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const googleLogin = useGoogleLogin({
    clientId: "963076518708-u7b6mdhr18id93r8sdua5caqi8av2g26.apps.googleusercontent.com",
    onSuccess: async (googleUser) => {
      // Step 2: Handle successful Google login
      console.log("Google login successful", googleUser);

      // Additional logic, if needed
    },
    onError: (error) => {
      // Step 3: Handle Google login error
      console.error("Google login error", error);

      // Additional error handling, if needed
    },
  });

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:3000`)

      window.location.replace(res.data.authorization_url);
    } catch (err) {

    }
  }

  const googleLogin2 = async (googleUserData) => {
    const loginData = {
      email: googleUserData.email,
      password: googleUserData.sub,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Login successful
        const tokens = await response.json();
        console.log('Login successful', tokens);

        const userResponse = await fetch('http://127.0.0.1:8000/api/users/me', {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log(userData)
          // Dispatch the setUser action to update the Redux store
          props.setUser({ user: userData, token: tokens });
          navigate('/home');

        } else {
          console.error('Failed to fetch user data:', userResponse.statusText);
        }

        // You can handle additional logic here, such as storing tokens in state
      } else {
        // Login failed
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Login successful
        const tokens = await response.json();
        console.log('Login successful', tokens);

        const userResponse = await fetch('http://127.0.0.1:8000/api/users/me', {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log(userData)
          // Dispatch the setUser action to update the Redux store
          props.setUser({ user: userData, token: tokens });
          navigate('/home');

        } else {
          console.error('Failed to fetch user data:', userResponse.statusText);
        }

        // You can handle additional logic here, such as storing tokens in state
      } else {
        // Login failed
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  //if (user.token) window.location.replace("/");
  return (
    <div className='flex w-full  h-[100vh]'>
      <div className='hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center'>
        <Logo type='sign-in' />
        <span className='text-xl font-semibold text-white'>Welcome, back!</span>
      </div>

      <div className='flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black items-center px-10 md:px-20 lg:px-40'>
        <div className='h-full flex flex-col items-center justify-center  py-12 px-4 sm:px-6 lg:px-8'>
          <div className='block mb-10 md:hidden'>
            <Logo />
          </div>
          <div className='max-w-md w-full space-y-8'>
            <div>
              <h2 className='mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white'>
                Sign in to your account
              </h2>
            </div>

            <a href="https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=963076518708-u7b6mdhr18id93r8sdua5caqi8av2g26.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/userinfo.email&redirect_uri=http://127.0.0.1:8000/api/google-oauth2/login/sdk/callback/">
  <h1>lhsadfl</h1>
</a>

<button style={{color:'white'}} onClick={continueWithGoogle} type='submit'>login champs with google</button>

<GoogleLogin
text="continue_with"
theme="outline"
width="100%"
  onSuccess={credentialResponse => {
    var decoded = jwtDecode(credentialResponse.credential)
    console.log(decoded);
    //console.log(credentialResponse.credential)
    googleLogin2(decoded);
    //console.log(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;

            <Button
              onClick={() => googleLogin()}
              label='Sign in with Google'
              icon={<FcGoogle className='' />}
              styles='w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300'
            />

            <Divider label='or sign in with email' />

            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
              <div className='flex flex-col rounded-md shadow-sm -space-y-px gap-5'>
                <Inputbox
                  label='Email Address'
                  name='email'
                  type='email'
                  isRequired={true}
                  placeholder='email@example.com'
                  value={data?.email}
                  onChange={handleChange}
                />

                <Inputbox
                  label='Password'
                  name='password'
                  type='password'
                  isRequired={true}
                  placeholder='Password'
                  value={data?.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                label=' Sign In'
                type='submit'
                styles='group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mt-8'
              />
            </form>

            <div className='flex items-center justify-center text-gray-600 dark:text-gray-300'>
              <p>
                Dont't have an account?{" "}
                <Link to='/sign-up' className='text-rose-800 font-medium'>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toaster richColors />
    </div>
  );
};

const mapDispatchToProps = {
  setUser: setUser,
};

export default connect(null, mapDispatchToProps)(LoginPage);