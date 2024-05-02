
import { typeCreateBoardSchema } from "@repo/common"
import axios, { AxiosError } from "axios"

const backend_url = "http://localhost:3001"
console.log(backend_url)

export const createBoard = async (token: string,data:typeCreateBoardSchema) => {
    //console.log(data)
    try {
        const response = await axios({
            method: 'post',
            url: '/api/v1/board/create',
            baseURL: backend_url,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        })
        //console.log(response.data)
        return response
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }
    } 
}

export const getBoards = async (token: string,orgId:string) => {
    console.log(orgId)
    try {
        const response = await axios({
            method: 'get',
            url: `/api/v1/board/read/${orgId}`,
            baseURL: backend_url,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        //console.log(response.data)
        return response
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }
    } 
}