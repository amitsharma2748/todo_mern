import React, { useState } from "react";
import { useDispatch } from "react-redux";


import { useNavigate } from "react-router";
import { addContact } from "../Redux/slice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const user = useSelector((state: RootState) => state.tasks.user)
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("first");
    data.length !== 0 &&
      data.title !== "" &&
      data.description !== "" && dispatch(addContact(data))

    setData({ title: "", description: "", completed: 1 });
    navigate(`/todo/${user}`);
    console.log("first");
  };
  return (
    <div className=" w-full h-96 ">
      <div className="flex justify-center  my-auto mx-auto h-16 py-5">
        <h1>Create Contact Screen</h1>
      </div>
      <div className="bg-white h-60 flex-col w-1/2 flex justify-center my-auto mx-auto ">
        <div className="w-full flex justify-between py-5 px-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            User Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="User Name"
            name="title"
            maxLength={50}
            onChange={changeHandler}
            value={data?.title}
            required
          />
        </div>
        <div className="w-full flex justify-between py-5 px-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            maxLength={120}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            name="description"
            value={data?.description}
            onChange={changeHandler}
            required
          ></textarea>
        </div>

      </div>
      <div className="w-full flex justify-center my-5">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={submitHandler}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
