import React, { useContext, useEffect, useState } from "react";
import AddProject from "./AddProject";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import { deleteProjectApi, getAllUserProjectApi } from "../Services/allApi";
import { addProjectResponseContext, editProjectResponseContext } from "../Context/ContextShare";
import { toast } from "react-toastify";

function MyProjects() {
  const [myProjects, setMyProjects] = useState([]);
  const { addProjectResponse, setaddProjectResponse } = useContext(
    addProjectResponseContext
  );
    const {editProjectResponse, setEditProjectResponse}= useContext(editProjectResponseContext);
  
  const getUserprojects = async () => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await getAllUserProjectApi(reqheader);
    console.log(res.data)
    setMyProjects(res.data);
  };
  useEffect(() => {
    getUserprojects();
  }, [addProjectResponse, editProjectResponse]);

  const handleDelete =async (id)=>{
    // alert(id)
    const token = sessionStorage.getItem("token");
    const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const res = await deleteProjectApi(id, reqHeader)
      if(res.status === 200){
        toast.success(res.data.message)
        getUserprojects();
      }else{
        toast.warning("Something Went Wrong")
      }
  }
  return (
    <>
      <div className=" rounded p-md-5 p-3 mb-5 mt-0 pt-0">
        <div className="d-flex mt-3">
          <h5 className="text-primary me-auto">MY PROJECTS</h5>
          <AddProject />
        </div>
        {myProjects?.length > 0 ? (
          myProjects?.map((item) => (
            <div className="p-3 rounded d-flex bg-primary mt-4">
              <h6 className="bg-primary ">{item.title.toUpperCase()}</h6>
              <div className="d-flex align-items-center ms-auto bg-primary">
                <Link className="bg-primary" to={item.github}>
                  <i className="fa-brands fa-github bg-primary fs-6"></i>
                </Link>

                <Link className="bg-primary" to={item.website}>
                  <i className="fa-solid fa-link bg-primary ms-3 fs-6 "></i>
                </Link>

                <i class="fa-solid fa-trash bg-primary ms-3 fs-6 " onClick={()=>handleDelete(item._id)}></i>

                <EditProject project={item} />
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center mt-5 mb-5">
            Nothing to display please &nbsp;
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default MyProjects;
