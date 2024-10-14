'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const SignupPage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setloading] = useState(false);

  const onSignup = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push('/login');
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setbuttonDisabled(false);
    }
    else {
      setbuttonDisabled(true);
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center
    min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input className='p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='username'
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder='username'
        type="text" />

      <label htmlFor="username">Email</label>
      <input className='p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='Email'
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder='email'
        type="text" />

      <label htmlFor="username">Password</label>
      <input className='p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='Password'
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder='password'
        type="text" />
        <button
         className='p-2 border border-gray-300 rounded-lg mb-4
         focus:outline-none focus:border-gray-600'
          onClick={onSignup}> 
          {buttonDisabled?"No SignUp":"SignUp"}
        </button>
        <Link href="/login">Visit Login Page</Link>
    </div>
  )
}

export default SignupPage;