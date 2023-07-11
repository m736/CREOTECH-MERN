import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ExcelUpload from "./Component/ExcelUpload";
import NavBar from "./Component/NavBar";
import FormSelect from "./Component/FormSelect";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  vechicleFail,
  vechicleRequest,
  vechicleSuccess,
} from "./slices/VechicleDetailSlice";
import axios from "axios";
import VehicleList from "./Vehicle/VehicleList";

import AddVehicleList from "./Vehicle/AddVehicleList";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(vechicleRequest());
      const { data } = await axios.get("http://localhost:4000/api/v1/jokes");
      setRows(data);
      dispatch(vechicleSuccess(data));
    } catch (error) {
      dispatch(vechicleFail());
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <div className="pages">
          <ToastContainer theme="dark" />
          <Routes>
            <Route exact path="/" element={<ExcelUpload />} />
            <Route path="/tabledata" element={<FormSelect />} />
            <Route path="/add_vechicle" element={<AddVehicleList />} />
            <Route path="/vehicle_list" element={<VehicleList />} />
            {/* <Route path="/update_vehicle/:id" element={<UpdateVehicleList />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
