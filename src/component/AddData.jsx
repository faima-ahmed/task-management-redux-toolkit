import { useState } from "react";
import { useDispatch } from "react-redux";
//import { v4 as uuid4 } from "uuid";
import {  createDatas } from "../features/dataSlice";
import { nanoid } from "@reduxjs/toolkit";

const AddData = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newData = {
    //   id: uuid4(),
    //   ...data,
    // };

    //dispatch(addData(newData));

    dispatch(createDatas({...data, id: nanoid()}));

    setData({
      title: "",
      description: "",
      status: "To Do",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Task</h2>
      <div>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <textarea
          name="description"
          placeholder="Task Description"
          onChange={handleChange}
          value={data.description}
        ></textarea>
      </div>
      <div>
        <select value={data.status} onChange={handleChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit"> Add Task</button>
    </form>
  );
};

export default AddData;
