import { toast } from "react-toastify";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addProjectApi } from "../Services/allApi";
import { addProjectResponseContext } from "../Context/ContextShare";

const AddProject = () => {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  // import state created inside context api

  const {addProjectResponse, setaddProjectResponse}= useContext(addProjectResponseContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    githubLink: "",
    websiteLink: "",
    overView: "",
    projectImage: "",
  });

  const handleClear = () => {
    setPreview("");
    setProjectDetails({
      title: "",
      language: "",
      githubLink: "",
      websiteLink: "",
      overView: "",
      projectImage: "",
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  const addProject = async () => {

    const { title, language, githubLink, websiteLink, overView, projectImage } =
      projectDetails;
      
    if (
      !title ||
      !language ||
      !githubLink ||
      !websiteLink ||
      !overView ||
      !projectImage
    ) {
      return toast.warning("Please fill the form completely");
    } else {
      // send data to backend
      // here we send a file
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("githubLink", githubLink);
      reqBody.append("websiteLink", websiteLink);
      reqBody.append("overView", overView);
      reqBody.append("projectImage", projectImage);

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };
  
      try {
        const res= await addProjectApi(reqBody,reqHeader)
        if(res.status ==201){
          setaddProjectResponse(res.data)
          toast.success(res.data.message)
          handleClear();
          handleClose();
        }
        else if(res.status === 401){
          console.log(res)
          toast.warning(res.response.data.message)
        }
      } catch (error) {
        toast.error(error)
      }

    }


  };
  return (
    <>
      <button onClick={handleShow} className="btn btn-primary">
        Add Project
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        className="bg-transparent"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="projectImg">
                <input
                  type="file"
                  name=""
                  id="projectImg"
                  className="d-none"
                  onChange={(e) => {
                    setProjectDetails({
                      ...projectDetails,
                      projectImage: e.target.files[0],
                    });
                  }}
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Free-Image.png"
                  }
                  alt=""
                  width={"350px"}
                />
              </label>
            </div>

            <div className="col-md-6">
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      title: e.target.value,
                    })
                  }
                  value={projectDetails.title}
                />
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Technologies Used"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      language: e.target.value,
                    })
                  }
                  value={projectDetails.language}
                />
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Github Link"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      githubLink: e.target.value,
                    })
                  }
                  value={projectDetails.githubLink}
                />
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Website Link"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      websiteLink: e.target.value,
                    })
                  }
                  value={projectDetails.websiteLink}
                />
              </div>
              <div className="mt-3">
                <textarea
                  placeholder="Project Overview"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      overView: e.target.value,
                    })
                  }
                  value={projectDetails.overView}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            CLEAR
          </Button>
          <Button variant="primary" onClick={addProject}>
            ADD PROJECT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProject;
