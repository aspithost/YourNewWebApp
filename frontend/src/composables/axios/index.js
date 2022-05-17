import axios from 'axios'

const axiosAuth = axios.create({
    baseURL: `${import.meta.env.VITE_AUTH_SERVER}/userapi`,
    timeout: 4000
});

const axiosAuthCredentials = axios.create({
    baseURL: `${import.meta.env.VITE_AUTH_SERVER}/userapi`,
    timeout: 4000,
    withCredentials: true,
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


export { axiosAuth, axiosAuthCredentials, axiosBlog, axiosBlogCredentials }