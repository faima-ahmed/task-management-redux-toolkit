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
        <ul>
          {datas.map((d) => (
            <li key={d.id}>
              <div>
                <p>{d.title}</p>
                {d.description && <p>{d.description}</p>}
                <p>Status: {d.status}</p>
              </div>
              <div>
                <EiditData d={d} />
                <button onClick={() =>dispatch(deleteDatas(d.id))}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataList;
