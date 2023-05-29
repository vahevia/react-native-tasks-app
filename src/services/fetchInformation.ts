import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

const API = "https://6172cfe5110a740017222e2b.mockapi.io/elements"

const fetchData = async () => {
  try {
    let res = await axios(API, { method: 'GET' })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchInformation = createAsyncThunk(
  'information/fetch',
  async () => {
    const response = await fetchData();
    return response;
  }
);

