import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   deleteDatas, fetchDatas } from "./dataSlice";
import EiditData from "../component/EiditData";

const DataList = () => {
  const { datas, isLoading, error } = useSelector((state) => state.datasR);

  const dispatch = useDispatch();

  // const handleDelete = (id) => {
  //   dispatch(deleteData(id));
  // };

  useEffect(() => {
    dispatch(fetchDatas());
  }, [dispatch]);

  if (isLoading) {
    return <p>Data Loading...</p>;
  }
  if (error) {
    return <p>There is an error {error}</p>;
  }
  return (
    <div>
      <div>
        <h2>Tasks</h2>
        <ul className="space-y-4">
          {datas.map((d) => (
            <li key={d.id} className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between">
              <div>
                <h3 className=" font-medium text-gray-800">{d.title}</h3>
                {d.description && <p className="text-gray-600">{d.description}</p>}
                <p className="mt-1 text-sm font-semibold">Status: <span className="italic underline">{d.status}</span></p>
              </div>
              <div className="flex justify-center items-center space-x-1">
                <EiditData d={d} />
                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() =>dispatch(deleteDatas(d.id))} >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataList;
