
import axios, { AxiosError } from "axios"

const backend_url = "http://localhost:3001"

export const createBoard = async (token: any,data:any) => {
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
        return response
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }
    }
    
   
}