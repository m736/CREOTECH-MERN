import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ExcelUpload from "./Component/ExcelUpload";
import NavBar from "./Component/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<ExcelUpload />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
