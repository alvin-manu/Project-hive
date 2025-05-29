
import { base_url } from "./base_url";
import { commonApi } from "./commonApi";


export const registerApi = async (userData) => {
    return await commonApi("POST", `${base_url}/user/register`, userData, "")
}

export const loginApi = async (userData) => {
    return await commonApi("POST", `${base_url}/user/login`, userData, "")
}

export const addProjectApi = async (userData, reqHeader) => {
    return await commonApi("POST", `${base_url}/project/add`, userData, reqHeader)
}

export const getHomeProjectApi = async () => {
    return await commonApi("GET", `${base_url}/project/homeProject`, "", "")
}

export const getAllProjectApi = async (searchkey, reqheader) => {
    return await commonApi("GET", `${base_url}/project/allProject?search=${searchkey}`, "", reqheader)
}

export const getAllUserProjectApi = async (reqheader) => {
    return await commonApi("GET", `${base_url}/project/userProject`, "", reqheader)
}

// update project
export const updateProjectApi = async (projectId, reqBody, reqHeader)=>{
    return await commonApi("PUT",`${base_url}/project/edit/${projectId}`, reqBody, reqHeader)
}

// delete a project
export const deleteProjectApi = async (projectId, reqHeader)=>{
    return await commonApi("DELETE",`${base_url}/project/delete/${projectId}`, {}, reqHeader)
}