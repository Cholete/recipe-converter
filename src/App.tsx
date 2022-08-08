import React from "react";
import { Routes, Route } from "react-router-dom";
import AddIngredients from "./components/AddIngredients";
import ConvertedIngredients from "./components/ConvertedIngredients";
import Page404 from "./components/Page404";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<AddIngredients />} />
        <Route path="/convert" element={<ConvertedIngredients />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
