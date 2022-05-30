import axios from 'axios'

const axiosBlog = axios.create({
    baseURL: `${import.meta.env.VITE_BLOG_SERVER}/blogapi`,
    timeout: 4000
})

const axiosBlogCredentials = axios.create({
    baseURL: `${import.meta.env.VITE_BLOG_SERVER}/blogapi`,
    timeout: 4000,
    withCredentials: true
})

const axiosBlogSSR = axios.create({
    baseURL: `${process.env.NODE_ENV === 'production' ? process.env.BLOG_SERVER : import.meta.env.VITE_BLOG_SERVER}/blogapi`,
    timeout: 4000
})

const axiosBlogCredentialsSSR = axios.create({
    baseURL: `${process.env.NODE_ENV === 'production' ? process.env.BLOG_SERVER : import.meta.env.VITE_BLOG_SERVER}/blogapi`,
    timeout: 4000,
    withCredentials: true
})

const axiosUser = axios.create({
    baseURL: `${import.meta.env.VITE_USER_SERVER}/userapi`,
    timeout: 4000
})

const axiosUserCredentials = axios.create({
    baseURL: `${import.meta.env.VITE_USER_SERVER}/userapi`,
    timeout: 4000,
    withCredentials: true
})

const axiosUserSSR = axios.create({
    baseURL: `${process.env.NODE_ENV === 'production' ? process.env.USER_SERVER : import.meta.env.VITE_USER_SERVER}/userapi`,
    timeout: 4000   
})

export { axiosBlog, axiosBlogCredentials, axiosBlogSSR, axiosBlogCredentialsSSR,
    axiosUser, axiosUserCredentials, axiosUserSSR }