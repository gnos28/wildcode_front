import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { ProjectContextProvider } from "./contexts/projectContext";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <ProjectContextProvider>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Layout>
    </ProjectContextProvider>
  );
}

export default App;
