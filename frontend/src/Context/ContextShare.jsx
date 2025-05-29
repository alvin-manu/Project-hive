import React, { createContext, useState } from "react";

export const addProjectResponseContext = createContext();
export const editProjectResponseContext = createContext();
export const isAuthTokenContext = createContext();

const ContextShare = ({ children }) => {
  // children is a predefined props used to share data betweenn all components
  // create a state , that state is we are sharing between components
  const [addProjectResponse, setaddProjectResponse] = useState({});
  const [editProjectResponse, setEditProjectResponse] = useState({});
  const [isAuthToken, setisAuthToken] = useState(false);
  return (
    <>
      <addProjectResponseContext.Provider
        value={{ addProjectResponse, setaddProjectResponse }}
      >
        <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
        <isAuthTokenContext.Provider value={{isAuthToken,setisAuthToken}}>

          {children}
        </isAuthTokenContext.Provider>
        </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </>
  );
};

export default ContextShare;
