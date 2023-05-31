import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../Redux/store';
import { deleteContact } from '../Redux/slice';
import { useDispatch } from 'react-redux';

const DetailsTask = () => {
  const { id } = useParams<string>() as any;
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) => state.tasks.user)
  const dispatch = useDispatch();
  const submitHandler = () => {
    navigate(`/update/${id}`)
  }
  const deleteHandler = () => {
    dispatch(deleteContact(id));//deleting the contact
    navigate(`/todo/${user}`)

  };
  return (
    <div className=" w-full h-96 ">
      <div className="flex justify-center  my-auto mx-auto h-16 py-5">
        <h1>Details Screen</h1>
      </div>
      <div className='border-4 border-indigo-500 w-3/4 m-auto'>
        <div className="bg-white h-60 flex-col w-1/2  flex justify-center my-auto mx-auto ">
          <div className="w-full flex justify-between py-5 px-4">
            <label className="block  mb-2 text-4xl font-medium text-gray-900 dark:text-white">
              Title:
            </label>
            <span className='text-2xl text-blue-gray-400'>
              {tasks[id]?.title}
            </span>

          </div>
          <div className="w-full flex justify-between py-5 px-4">
            <label className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">
              Description:
            </label>
            <span className='text-2xl text-blue-gray-400'>
              {tasks[id]?.description}
            </span>

          </div>

        </div>
        <div className="w-full flex justify-center my-5">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={submitHandler}
          >
            Edit Task
          </button>
          <button
            className="bg-transparent mx-5 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={deleteHandler}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailsTask