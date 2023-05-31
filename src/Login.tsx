import axios from 'axios';
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
const Login = (props: any) => {
  const [data, setData] = useState<any>({});

  const navigate = useNavigate();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };



  const submitHandler = async (e: any) => {
    e.preventDefault()
    // console.log(data);
    const todos: any = await axios.post('http://localhost:4000/login', data, {
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then((todos) => (navigate(`/todo/${todos?.data?.user?._id}`))).catch(err => { alert("Password should be longer than 6 characters") })

    props.loginHandle(todos?.data)

    console.log(todos?.data?.user);
  };
  return (

    <div className="relative flex flex-col justify-center min-h-max  overflow-hidden w-1/2">
      <div className="rounded-lg w-full p-6 m-auto bg-white  shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={submitHandler}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Usename
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name='name'
              onChange={changeHandler}
              value={data?.name}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name='password'
              value={data?.password}
              onChange={changeHandler}
            />
          </div>

          <div className="mt-6">
            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>


      </div>

    </div>


  )
}

export default Login