import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import mainimg from "../assets/homeimg.svg";
import { getHomeProjectApi } from "../Services/allApi";
import { useContext } from "react";
import { isAuthTokenContext } from "../Context/ContextShare";

const Home = () => {
  const [islogin, setIsLogin] = useState(false);
  const [homeproject, setHomeproject] = useState([]);
   const {isAuthToken, setisAuthToken}= useContext(isAuthTokenContext);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
      setisAuthToken(true)
    }
  }, []);

  useEffect(() => {
    const fetchproject = async () => {
      try {
        const res = await getHomeProjectApi();
        console.log(res);
        setHomeproject(res.data);
      } catch (error) {
        console.log("Error loading data", error);
      }
    };
    fetchproject();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="t py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            {/* Left Side - Content */}
            <div className="col-lg-6 order-lg-1 order-2 text-lg-start text-center">
              <h1 className="display-4 fw-bold text-white mb-4">
                The Stage for Your Creations
              </h1>
              <p className="lead text-white-40 mb-4">
                "Every project tells a story. Showcase yours and explore the
                creativity of others!"
              </p>
              <div className="d-flex flex-lg-row flex-column gap-3 justify-content-lg-start justify-content-center">
                <Link to="/project" className="btn btn-outline-primary btn-lg px-4">
                  Explore Projects
                </Link>

                {!isAuthToken ? (
                  <Link to="/login" className="btn btn-primary btn-lg px-4">
                    Get Started
                  </Link>
                ) : (
                  <Link to="/dashboard" className="btn btn-primary btn-lg px-4">
                    Manage Dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="col-lg-6 order-lg-2 order-1">
              <div className="overflow-hidden">
                <img
                  src={mainimg}
                  alt="Developer showcasing work"
                  className="img-fluid w-100"
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row text-center justify-content-evenly ">
          <div className="col-md-4 mb-4 ">
            <h3 className="text-primary">Showcase Your Work</h3>
            <p className="text-white">
              Upload your projects and let the world see your skills and
              creativity.
            </p>
          </div>
          <div className="col-md-4 mb-4 ">
            <h3 className="text-primary">Discover & Connect</h3>
            <p className="text-white">
              Explore innovative projects and collaborate with like-minded
              creators.
            </p>
          </div>
          <div className="col-md-4 mb-4 ">
            <h3 className="text-primary">Grow Your Portfolio</h3>
            <p className="text-white">
              Build a strong developer profile and gain recognition in the
              community.
            </p>
          </div>
        </div>
      </section>

      <div className="container-fluid">
        <div className="text-center my-5 fs-3">Explore Your Projects</div>
        <div className="row">
          <marquee scrollAmount="15">
            <div className="row">
              {homeproject?.map((item) => (
                <div className="col-md-4 col-lg-4 d-flex gap-6 p-5 justify-content-center">
                  <ProjectCard item={item} />
                </div>
              ))}
            </div>
          </marquee>
        <Link to="/project" style={{ textDecoration: "none" }}>
          <h6 className="text-center mt-3 mb-5">SEE MORE PROJECTS </h6>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
