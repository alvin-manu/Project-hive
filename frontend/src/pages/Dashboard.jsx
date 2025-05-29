import React, { useEffect, useState } from "react";
import MyProjects from "../components/MyProjects";
import Profile from "../components/Profile";

const Dashboard = () => {
  const [name, setname] = useState("");

  useEffect(() => {
    setname(JSON.parse(sessionStorage.getItem("existingUser"))?.name);
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ minHeight: "50vh" }}>
        <div className="my-4 ms-3 ms-md-4 fs-5">
          WELCOME <span className="text-primary ms-1">{name?.toUpperCase()}</span>
        </div>
        <div className="row">
          <div className="col-md-8">
            {/* <h6 className="ps-3">Manage Project</h6> */}

            <MyProjects />
          </div>
          <div className="col-md-4">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
