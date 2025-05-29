import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-4" >
        <div className="d-flex">
          <h5 className="text-center">MY PROFILE</h5>
          <div className="ms-auto">
            <button className="btn btn-primary" onClick={() => setOpen(!open)}>
              {open === true ? (
                <i class="fa-solid fa-angle-up bg-primary"></i>
              ) : (
                <i class="fa-solid fa-angle-down bg-primary"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      <Collapse in={open}>
        <div>
          {/* profile img */}
          <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="profileImg">
              <img
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
                alt=""
                width={"150px"}
                height={"150px"}
                style={{ borderRadius: "50%" }}
              />
              <input type="file" id="profileImg" className="d-none"/>
            </label>
          </div>
          {/* input fields */}
          <div>
            <input
              type="text"
              placeholder="Github Link"
              className="form-control mt-3"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="LinkedIn Link"
              className="form-control mt-3"
            />
          </div>
          <button className="btn btn-primary mt-3">Update</button>
        </div>
      </Collapse>
    </>
  );
}

export default Profile;
