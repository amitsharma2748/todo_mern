import "./App.css";
import StaticLayout from "./components/StaticLayout";
import TodoList from "./components/TodoList";

import { Route, Routes } from "react-router-dom";
import CreateContact from "./ContactComponents/CreateTask";
import UpdateContact from "./ContactComponents/UpdateContact";
import Login from "./Login";
import { useState } from "react";
import DetailsTask from "./ContactComponents/DetailsTask";
function App() {
  const [data, setData] = useState({});
  const loginHandle = (param) => {
    setData(param);
  };

  // console.log(data);
  return (
    <StaticLayout>
      <Routes>
        <Route path="/" element={<Login loginHandle={loginHandle} />} />
        <Route path="/todo/:id" element={<TodoList user={data} />} />
        <Route path="/details/:id" element={<DetailsTask />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/update/:id" element={<UpdateContact />} />
      </Routes>
    </StaticLayout>
  );
}

export default App;
