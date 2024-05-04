
import { typeCreateBoardSchema } from "@repo/common"
import axios, { AxiosError } from "axios"

const backend_url = process.env.BACKEND_URL
//console.log(process.env)

export const createBoard = async (token: string, data: typeCreateBoardSchema) => {
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
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
    }
}

export const getBoards = async (token: string, orgId: string, query?: string ) => {
    //console.log(orgId)
    console.log(typeof(query))
    try {
        const response = await axios({
            method: 'get',
            url: `/api/v1/board/boardList?orgId=${orgId}&filter=${query}`,
            baseURL: backend_url,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        //console.log(response.data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
    }
}