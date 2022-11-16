import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
