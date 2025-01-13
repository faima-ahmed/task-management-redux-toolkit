import { useState } from "react";
import { useDispatch } from "react-redux";
//import { v4 as uuid4 } from "uuid";
import { createDatas } from "../features/dataSlice";
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

    dispatch(createDatas({ ...data, id: nanoid() }));

    setData({
      title: "",
      description: "",
      status: "To Do",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-indigo-500">
        Add new Task
      </h2>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="title"
          value={data.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 "
          required
        />
      </div>
      <div>
        <textarea
          name="description"
          placeholder="Task Description"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 "
          rows="3"
          onChange={handleChange}
          value={data.description}
        ></textarea>
      </div>
      <div className="mb-4">
        <select
          name="status"
          value={data.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 "
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
      >
        {" "}
        Add Task
      </button>
    </form>
  );
};

export default AddData;
