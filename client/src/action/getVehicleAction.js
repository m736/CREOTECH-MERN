import axios from "axios";
import {
  vechicleFail,
  vechicleRequest,
  vechicleSuccess,
} from "../slices/VechicleDetailSlice";

export const getVechicle = async (dispatch) => {
  try {
    dispatch(vechicleRequest());
    const { data } = await axios.get("http://localhost:4000/api/v1/jokes");
    dispatch(vechicleSuccess(data));
  } catch (error) {
    //handle error
    dispatch(vechicleFail(error.response.data.message));
  }
};
