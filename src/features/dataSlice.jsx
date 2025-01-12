/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  axios  from 'axios';

const initialState = {
  datas: [],
  isLoading: false,
  error: null,
  status: "All",
};

const BASE_DATA= "http://localhost:3003/todos";

export const fetchDatas = createAsyncThunk(
  "datas/fetchDatas",
  async () => {
    const res = await axios.get(BASE_DATA);
    //console.log(res.data);
    //return res.data;
    return res.data.map((task) => ({
      id: task.id,
      title: task.title,
      description: "",
      status: task.completed ? "Completed" : "To Do",
    }));
  });

  export const deleteDatas = createAsyncThunk(
    "datas/deleteDatas",
    async (id) => {
      const res = await axios.delete(`${BASE_DATA}/${id}`);
      return id;
    }
  );

  export const createDatas = createAsyncThunk(
    "datas/createDatas",
    async (data) => {
      const res = await axios.post(BASE_DATA, data);
      return res.data;
    }
  );

  export const updateDatas = createAsyncThunk(
    "datas/updatedatas",
    async ({id, data}) => {
      const res = await axios.put(`${BASE_DATA}/${id}`, data);
      console.log(res.data);
      return res.data;
    }
  );
  
 const dataSlice = createSlice({
  name: "datas",
  initialState,
  reducers: {
    // addData: (state, action) => {
    //     state.datas.push(action.payload)
    // },

    // editData: (state, action) =>{
    //   state.datas= state.datas.map((d)=>(
    //     d.id === action.payload.id? action.payload : d
    //   ))
    // },
    // deleteData: (state, action)=>{
    //   state.datas= state.datas.filter(d => d.id !== action.payload)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDatas.pending, (state) => {
      (state.isLoading = true), (state.error = null);
    }),
      builder.addCase(fetchDatas.fulfilled, (state, action) => {
        (state.isLoading = false), (state.datas = action.payload);
      }),
      builder.addCase(fetchDatas.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
      builder.addCase(deleteDatas.fulfilled, (state, action) => {
        state.datas = state.datas.filter((data)=>
        data.id != action.payload);
      });
      builder.addCase(createDatas.fulfilled, (state, action) => {
        state.datas.push(action.payload);
      });
      builder.addCase(updateDatas.fulfilled, (state, action) => {
        const index= state.datas.findIndex((data)=> 
          data.id == action.payload.id);
        state.datas[index]= action.payload;
      });
  },
});
//export const {addData, editData, deleteData} = dataSlice.actions;
export default dataSlice.reducer;
      