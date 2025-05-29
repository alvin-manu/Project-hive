import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { base_url } from "../Services/base_url";
import { toast } from "react-toastify";
import { updateProjectApi } from "../Services/allApi";
import { useContext } from "react";
import { editProjectResponseContext } from "../Context/ContextShare";

function EditProject({ project }) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const {editProjectResponse, setEditProjectResponse}= useContext(editProjectResponseContext);
  
  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title: project.title,
      language: project.language,
      githubLink: project.github,
      websiteLink: project.website,
      overView: project.overView,
      projectImage: "",
    });
    setPreview("");
  };

  const handleShow = () => setShow(true);
  // const resetForm =()=>{
  //   useState({
  //   id: project._id,
  //   title: project.title,
  //   language: project.language,
  //   githubLink: project.github,
  //   websiteLink: project.website,
  //   overView: project.overView,
  //   projectImage: "",
  // });
  // }

  // usestate to set values to projectDetails
 
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    githubLink: project.github,
    websiteLink: project.website,
    overView: project.overView,
    projectImage: "",
  });

  // craete objecturl and to render if a new projectImage is added
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  // function to edit project details
  const handleUpdate = async () => {
    const {
      id,
      title,
      language,
      githubLink,
      websiteLink,
      overView,
      projectImage,
    } = projectDetails;
    if (!title || !language || !githubLink || !websiteLink || !overView) {
      return toast.warning("Please fill the form Completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("githubLink", githubLink);
      reqBody.append("websiteLink", websiteLink);
      // if preview it will set projectimage to file else project.projectImage
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", project.projectImage);
      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const res = await updateProjectApi(id, reqBody, reqHeader);
        if(res.status === 201){
          setEditProjectResponse(res.data);
          toast.success(res.data.message)
          handleClose();
        }else{
          toast.error("Something Wrong Happened")
        }
      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await updateProjectApi(id, reqBody, reqHeader);
        if(res.status === 201){
          setEditProjectResponse(res.data)
          toast.success(res.data.message)
        }else{
          toast.error("Something Wrong Happened")
        }
      }
    }
    setShow(false)
  };

  return (
    <>
      <i
        className="fa-sharp-duotone fa-solid fa-pen-to-square bg-primary ms-3 fs-6"
        onClick={handleShow}
      ></i>
      {/* modal for edit */}
      <Modal
        show={show}
        onHide={handleClose}
        className="bg-transparent"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
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
                      : `${base_url}/uploads/${project?.projectImage}`
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
                  value={projectDetails.title}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Technologies Used"
                  className="form-control"
                  value={projectDetails.language}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      language: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Github Link"
                  className="form-control"
                  value={projectDetails.githubLink}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      githubLink: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Website Link"
                  className="form-control"
                  value={projectDetails.websiteLink}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      websiteLink: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-3">
                <textarea
                  placeholder="Project Overview"
                  className="form-control"
                  value={projectDetails.overView}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      overView: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;
