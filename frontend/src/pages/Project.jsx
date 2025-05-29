import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { getAllProjectApi } from "../Services/allApi";
import { Link } from "react-router-dom";

const Project = () => {
  const [allProject, setAllProject] = useState([]);
  const [searchkey, setSearchKey] = useState("");
  const [istoken, setIstoken] = useState(false);

  const getProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setIstoken(true)
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await getAllProjectApi(searchkey, header);
      if (res.status === 200) {
        console.log(res.data);
        setAllProject(res.data);
      }
    }
  };
  useEffect(() => {
    getProjects();
  }, [searchkey]);
  return (
    <>
    {istoken ?
    <div>
        <div className="container-fluid">
          <h3 className="text-center mt-5 text-primary">EXPLORE PROJECTS</h3>
        </div>
        <div className="row my-4 m-0">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex ">
            <input
              type="text"
              className="w-100 p-2 bg-outline-primary"
              placeholder="Search By Technoloies"
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchkey}
            />
            <i
              className="fa-solid fa-magnifying-glass mt-2 text-white bg-transparent fs-5"
              style={{ marginLeft: "-35px" }}
            ></i>
          </div>
        </div>
        <div className="row m-0 p-md-3">
          {allProject?.map((item) => (
            <div className="col-md-4 p-3">
              <ProjectCard item={item} />
            </div>
          ))}
        </div>
      </div>:
      <div className="d-flex justify-content-center mt-5 mb-5">Nothing to display please &nbsp;<Link to="/login" className="text-decoration-none">Login</Link></div>
    }
      
    </>
  );
};

export default Project;
