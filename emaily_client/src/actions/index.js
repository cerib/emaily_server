import axios from "axios";
import { FETCH_USER } from "./actionTypes";

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const handleToken = (token) => async (dispatch) => {
  try {
    const res = await axios.post("/api/stripe", token);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};
