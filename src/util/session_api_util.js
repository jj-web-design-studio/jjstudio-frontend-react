import axios from "axios";


//Will set the authToken if someone is logged in
export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const signup = (data) => {
    return axios.post('/v1/users', data);
}

export const login = (userData) => {
    return axios.post('/v1/auth', userData) 
}

export const logout = (token) => {
    return axios.post('//', token)
    //need to look at the route tomorrow 
}
