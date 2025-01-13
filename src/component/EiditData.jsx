/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDatas } from "../features/dataSlice";

const EiditData = ({ d }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});

  const [data, setData] = useState({
    title: d.title,
    description: d.description,
    status: d.status,
  });

  const handleChange = (e) => {
    console.log({ name: e.target.name, val: e.target.value });
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(updateDatas({ id: dataToEdit.id, data: data }));
    setIsEdit(false);
  };

  const handleDataEdit = (data) => {
    setDataToEdit(data);
    setIsEdit(true);
  };

  console.log(isEdit);
  return (
    <div>
      {isEdit ? (
        <div className="absolute bg-white p-4 border rounded-md shadow-lg z-10">
          <h2 className="text-xl font-semibold mb-3 text-indigo-500">Edit Task</h2>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={data.title}
              onChange={handleChange}
              className="w=full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 "
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Task Description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 "
              onChange={handleChange}
              value={data.description}
            ></textarea>
          </div>
          <div className="mb-4">
            <select name="status" value={data.status} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button type="submit" onClick={() => handleEdit()} className="bg-indigo-600 text-white py-2 px-2 rounded-md hover:bg-indigo-700">
              {" "}
              Save
            </button>
            <button onClick={() => setIsEdit(false)} className="bg-gray-300 py-2 rounded-md px-2">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <button onClick={() => handleDataEdit(d)} className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Edit</button>
        </>
      )}
    </div>
  );
};

export default EiditData;
