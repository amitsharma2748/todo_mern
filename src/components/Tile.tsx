import React from 'react'

import { useDispatch } from 'react-redux';

import { updateContact } from '../Redux/slice';
import { Link } from 'react-router-dom';


interface Iprops {
  item: any;
  index: number
}
const Tile = (props: Iprops) => {
  const { index, item } = props;

  const dispatch = useDispatch()

  //  setData(tasks)
  // console.log(data[index])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number, item: any) => {
    e.preventDefault()
    const updatedValue = { ...item, "completed": Number(e.target.value) }
    dispatch(updateContact({ id: index, data: updatedValue }))
    // console.log(index, data[index]?.completed === 0)
  };
  return (
    <div className=" h-20 w-1/2 flex justify-between  m-2 text-center overflow-hidden shadow-lg bg-red-100 rounded-md text-red-400 ">
      <Link to={`/details/${index}`} className="font-bold text-3xl my-5 mx-2">
        {item.title}
      </Link>
      <div className="w-1/2 flex justify-between py-5 px-4">


        <div className="w-5/6 flex flex-row  justify-evenly  ">
          <div>
            <input
              type="radio"
              name={`completed ${index}`}
              id="Active"
              value={1}
              checked={item?.completed === 1}
              onChange={(e) => { changeHandler(e, index, item) }}
            />
            <label htmlFor="Active">Active</label>
          </div>
          <div>
            <input
              type="radio"
              name={`completed ${index}`}
              id="Completed"
              value={0}
              checked={item?.completed === 0}
              onChange={(e) => changeHandler(e, index, item)}
            />
            <label htmlFor="Completed">Completed</label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Tile