import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Project from "./pages/Project";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { isAuthTokenContext } from "./Context/ContextShare";

function App() {
  const {isAuthToken, setisAuthToken}= useContext(isAuthTokenContext);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={isAuthToken?<Dashboard />:<Home/>} />
        <Route path={"/login"} element={<Auth />} />
        <Route path={"/register"} element={<Auth registerPage={'registerPage'} />} />
        <Route path={"/project"} element={<Project />} />
      </Routes>
      <Footer />


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
