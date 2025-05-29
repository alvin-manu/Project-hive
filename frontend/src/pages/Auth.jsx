import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../assets/signup.svg";
import icon from "../assets/icon.png";
import { loginApi, registerApi } from "../Services/allApi";
import { toast } from "react-toastify";
import { isAuthTokenContext } from "../Context/ContextShare";
import { useContext } from "react";

const Auth = ({ registerPage }) => {
  const isRegisterPage = registerPage ? true : false;

   const {isAuthToken, setisAuthToken}= useContext(isAuthTokenContext);

  const navigate = useNavigate();
  // create a state to hold all input values
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  }, [registerPage]);

  // register function
  const handleRegister = async () => {
    console.log(userData);
    const { name, email, password } = userData;
    // if form fields are empty
    if (!name || !email || !password) {
      return toast.warning("Please fill the form Completely");
    } else {
      const res = await registerApi(userData);
      // success
      if (res.status === 201) {
        toast.success("Registration Successfull");
        setUserData({ name: "", email: "", password: "" });
        navigate("/login");
      }
      // already exists
      else if (res.status === 409) {
        toast.error("Already Exists");
        // other errors
      } else {
        toast.error("Something Happened");
      }
    }
  };


  // login function
  const handleLogin = async () => {
    const { email, password } = userData;
    if (!email || !password) {
      toast.warning("Please fill the form");
    } else {
      const res = await loginApi(userData);
      if (res.status === 404) {
        toast.error("Email or Paqssword Not found");
      } else if (res.status === 200) {
        //login suucessfull
        sessionStorage.setItem("existingUser",JSON.stringify(res.data.user_data))
        sessionStorage.setItem("token", res.data.jwt_token)
        toast.success("Login Successfull");

        setUserData({ name: "", email: "", password: "" });
        navigate("/dashboard");
        setisAuthToken(true)
      } else {
        toast.error("Something Wrong Happened");
      }
    }
  };

  return (
    <>
      <div className="container-fluid mb-4">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h6>
            <i class="fa-solid fa-arrow-left me-2 mt-3"></i>Back To Home
          </h6>
        </Link>
      </div>

      <div className="container-fluid">
        <div className="row m-0">
          {/* login img */}
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <img
              src={loginimg}
              alt=""
              className="rounded d-none d-md-block"
              width={"60%"}
              style={{ backgroundColor: "white" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            {/* logo container */}
            <div className="navbar-brand d-md-flex align-items-center d-none justify-content-center p-0">
              <img
                src={icon}
                alt="ProjectNest Logo"
                className="me-2 mt-0 pt-0 pb-1"
                style={{ width: "40px", height: "40px" }}
              />
              <h6 className="text-primary fw-bold fs-4 text-center">
                ProjectNest
              </h6>
            </div>
            <h5 className="mt-3">
              {isRegisterPage
                ? "Sign Up To Your Account"
                : "Sign In To Your Account"}
            </h5>

            <div className="w-100 d-flex align-items-center justify-content-center flex-column p-3 pt-1">
              {isRegisterPage && (
                <input
                  type="text"
                  name=""
                  placeholder="Enter Name"
                  className="form-control mt-3 rounded"
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  value={userData.name}
                />
              )}

              <input
                type="email"
                name=""
                placeholder="Enter Email"
                className="form-control mt-3 rounded"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                value={userData.email}
              />
              <input
                type="password"
                name=""
                placeholder="Enter Password"
                className="form-control mt-3 rounded"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                value={userData.password}
              />

              {/* register or login button */}
              {isRegisterPage ? (
                <button
                  className="btn btn-primary mt-4 w-100"
                  onClick={handleRegister}
                >
                  REGISTER
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-4 w-100"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
              )}
            </div>

            {isRegisterPage ? (
              <p>
                ALREADY A USER?{" "}
                <span className="text-primary mt-2  text-decoration-none">
                  <Link to="/login">LOGIN</Link>
                </span>
              </p>
            ) : (
              <p>
                NOT REGISTERED YET?{" "}
                <span className="text-primary mt-2 text-decoration-none">
                  <Link to="/register">REGISTER</Link>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
