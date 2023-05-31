import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store";


// Define a type for the slice state
interface ContactState {
  tasks: {
    title: string;
    description: string;
    completed: number;
  }[];
  user: number
}

// Define the initial state using that type
const initialState: ContactState = {

  tasks: [
    {
      title: "FIRST TASK",
      description: "NAME",
      completed: 1,
    },

  ],
  user: 0,
};

export const taskSlice = createSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.user = action.payload)
      // console.log(state.user)
    },
    initialTasks: (state, action) => {

      action.payload && (state.tasks = action.payload.tasks)
      // console.log('task', state.tasks)

    },
    addContact: (state, action) => {

      action.payload.title && action.payload.description && state.tasks.push({ ...action.payload, completed: 1 });

    },
    deleteContact: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    updateContact: (state, action) => {

      state.tasks[action?.payload?.id] = action?.payload?.data;
    },
    deleteAllCompleted: (state) => {
      state.tasks = state.tasks.filter((item: any) =>
        item?.completed === 1
      )
    }
  },
});

export const { setUser, initialTasks, addContact, deleteContact, updateContact, deleteAllCompleted } =
  taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
