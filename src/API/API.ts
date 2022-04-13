import axios from "axios";
// базовый обьект(instance) для того чтобы не дублировать код
const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "cc358979-2326-44e9-b2a5-87c1d429fcbc"}
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instanceAxios.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response =>
                response.data)
    },
    follow(userId: number) {
        return instanceAxios.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instanceAxios.delete(`follow/${userId}`)
    },
    getProfile(userId: string) {
        //console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instanceAxios.get(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instanceAxios.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instanceAxios.put(`profile/status`, {status: status})
    },
    savePhoto(photo: any){
        const formData = new FormData()
        formData.append('image', photo)
        return instanceAxios.put(`profile/photo`, formData, {headers:{
            'Content-Type': 'multipart/form-data'
            }})
    }
}
export const auth = {
    me(){
        return instanceAxios.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false){
        return instanceAxios.post(`auth/login`,{email, password, rememberMe})
    },
    logOut(){
        return instanceAxios.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl(){
        return instanceAxios.get(`security/get-captcha-url`)
    }
}

