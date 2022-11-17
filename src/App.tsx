import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Editor from "../src/components/Editor";

function App() {
  return (
    <>
      <Header />
      <Editor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
