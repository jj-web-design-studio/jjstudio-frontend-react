import axios from "axios";


//Will set the authToken if someone is logged in
export const setAuthToken = (token) => {
    debugger
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const signup = (data) => {
    return axios.post('http://localhost:8080/v1/users', data);
}

export const login = (userData) => {
    return axios.post('http://localhost:8080/v1/auth', userData) 
}

export const logout = (token) => {
    return axios.post('//', token)
    //need to look at the route tomorrow 
}
