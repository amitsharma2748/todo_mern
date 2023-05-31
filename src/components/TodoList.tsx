import React, { useEffect, useState } from "react";


import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import Tile from "./Tile";
import { useDispatch } from "react-redux";
import { deleteAllCompleted, initialTasks, setUser } from "../Redux/slice";
import axios from "axios";

import { useParams } from "react-router-dom";
import { RootState } from "../Redux/store";
const TodoList = (props: any) => {

  // console.log(user)
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<any>('');
  const [filter, setFilter] = useState<any>('all');
  const navigate = useNavigate();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const users = useSelector((state: RootState) => state.tasks.user)
  const { id } = useParams();
  // console.log(tasks)
  //  setData(tasks)
  const dispatch = useDispatch();


  const fetchTodos = () => {
    axios.get(`http://localhost:4000/todo/${id}`, {
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }

    }).then(res => { dispatch(initialTasks({ tasks: res?.data?.todos, user: id })); }).catch(error => console.log(error));
  }
  useEffect(() => {
    dispatch(setUser(id))
  }, [dispatch, id])
  useEffect(() => {

    setData(tasks)
  }, [tasks])


  const createHandler: any = (index: number) => {
    navigate('/create')
  };
  const deleteAllHandler = () => {
    dispatch(deleteAllCompleted())
  }
  const undoAllHandler = () => {
    window.location.reload();
  }
  const syncAllHandler = () => {
    const datas = axios.post('http://localhost:4000/todo', { tasks: data, user: users }, {
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
    console.log(datas)
  }
  const filterHandler = (e: any) => {
    setFilter(e.target.value.toLowerCase())

    if (e.target.value === 'active') {

      const filtered = tasks?.filter((item: any) =>
        item?.completed === 1
      )

      return setData(filtered)
    }
    else if (e.target.value === 'completed') {
      const filtered = tasks?.filter((item: any) =>
        item?.completed === 0
      )

      return setData(filtered)
    }
    else {
      return setData(tasks)
    }
  }
  return (
    <div className="flex items-center justify-center flex-col w-full h-auto mt-20">
      <div className="flex justify-between w-1/2">
        <div>
          <input type="text" name="search" id="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} className="p-2 bg-slate-500 mb-8 border border-cyan-900" />
        </div>
        <div>
          <button onClick={fetchTodos} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <p >Fetch saved Task</p>
          </button>
        </div>
        <div className="mb-4 ">
          <select className="p-2" name="filter" id="cars" value={filter} onChange={filterHandler}>
            <option className="p-2" value="all" >All</option>
            <option className="p-2" value="active">Active</option>
            <option className="p-2" value="completed">Completed</option>

          </select>
        </div>
      </div>
      <div className="flex justify-between w-1/2">
        <div>
          <button onClick={deleteAllHandler} className="bg-red-600 hover:bg-red-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <p >Delete All Completed Tasks </p>
          </button>
        </div>
        <div className="mb-4 ">
          <button onClick={undoAllHandler} className="bg-teal-600 hover:bg-teal-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <p >Undo All Delete changes </p>
          </button>
        </div>
        <div className="mb-4 ">
          <button onClick={syncAllHandler} className="bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <p >Sync All the changes to Server</p>
          </button>
        </div>
      </div>
      <div>
        <p className="text-red-800 mb-6">*once the changes are saved to server they cannot be changed</p>
      </div>
      <div>
        <button onClick={createHandler} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <p >Add Task</p>
        </button>
      </div>
      <div className="mt-3 flex justify-center w-full  h-72 flex-wrap overflow-y-scroll py-5">
        {data && data?.filter((item) => {
          return search?.toLowerCase() === '' ? item : (item?.title || item?.description).toLowerCase().includes(search)
        }).map((item: any, index: number) => (

          <Tile index={index} item={item} key={item.title} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
