import axios from "axios";
// базовый обьект(instance) для того чтобы не дублировать код
const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "cc358979-2326-44e9-b2a5-87c1d429fcbc"}
})

export const userAPI = {
    getUsers(currentPage =1, pageSize= 10) {
    return instanceAxios.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response =>
            response.data)
}
}


