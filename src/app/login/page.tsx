'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const LoginPage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setloading] = useState(false);

  const onLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push('/profile');
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
          onClick={onLogin}> 
          {buttonDisabled?"No Login":"Login"}
        </button>
        <Link href="/signup">Visit Signup Page</Link>
    </div>
  )
}

export default LoginPage;