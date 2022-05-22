import axios from 'axios'

const axiosUser = axios.create({
    baseURL: `${import.meta.env.VITE_USER_SERVER}/userapi`,
    timeout: 4000
});

const axiosUserCredentials = axios.create({
    baseURL: `${import.meta.env.VITE_USER_SERVER}/userapi`,
    timeout: 4000,
    withCredentials: true
});

const axiosBlog = axios.create({
    baseURL: `${import.meta.env.VITE_BLOG_SERVER}/blogapi`,
    timeout: 4000
});

const axiosBlogCredentials = axios.create({
    baseURL: `${import.meta.env.VITE_BLOG_SERVER}/blogapi`,
    timeout: 4000,
    withCredentials: true
});


export { axiosUser, axiosUserCredentials, axiosBlog, axiosBlogCredentials }