import axios from 'axios';
export const userRegister = (info) => {
    axios.defaults.withCredentials = false;
    return axios.post(`http://localhost:9001/api/v1.0/auth/register/local`, info)
};
export const userLogin = async (info) =>{
    axios.defaults.withCredentials = false;
    return await axios.post(`http://localhost:9001/api/v1.0/auth/login/local`, info);
} 
export const checkLoginStatus = () => {
    axios.defaults.withCredentials = true;
    return axios.get('http://localhost:9001/api/v1.0/auth/check')
}
