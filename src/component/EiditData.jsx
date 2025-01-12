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
        <div>
          <h2>Edit Task</h2>
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
            <select name="status" value={data.status} onChange={handleChange}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button type="submit" onClick={() => handleEdit()}>
              {" "}
              Save
            </button>
            <button onClick={() => setIsEdit(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <button onClick={() => handleDataEdit(d)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default EiditData;
