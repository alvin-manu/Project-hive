import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { base_url } from "../Services/base_url";
// import mediaPlayer from "../assets"

function ProjectCard({ item }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "100%" }} className="shadow rounded" onClick={handleShow}>
        <Card.Img variant="top" src={`${base_url}/uploads/${item?.projectImage}`} style={{maxHeight:"220px"}}/>
        <Card.Body>
          <Card.Title className="text-white">{item?.title}</Card.Title>
        </Card.Body>
      </Card>

      {/* For modal */}
      <Modal
        show={show}
        onHide={handleClose}
        className="bg-transparent"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{item?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img src={`${base_url}/uploads/${item?.projectImage}`} alt="" width={"100%"} />
            </div>
            <div className="col-md-6">
              <h5>Decription:</h5>
              <p>{item?.overView}</p>
              <h6>Technologies: </h6>
              <p>{item?.language}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Link to={item?.github} target="_blank">
            <i className="fa-brands fa-github fa-2x"></i>
          </Link>
          <Link to={item?.website} target="_blank">
            <i className="fa-solid fa-link fa-2x"></i>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;
