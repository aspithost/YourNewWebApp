import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import NProgress from 'nprogress'

import { axiosUser, axiosUserCredentials, axiosBlog, axiosBlogCredentials } from './axios'

const axiosArray = [axiosUser, axiosUserCredentials, axiosBlog, axiosBlogCredentials]

import '/src/nprogress.css'

export default () => {

    const APICalls = ref(0)
    const loading = ref(false)
    
    const route = useRoute()
    const path = computed (() => route.path)

    axiosArray.forEach(instance => {
        instance.interceptors.request.use(request => {
            APICalls.value += 1
            return request
        })
        
        instance.interceptors.response.use(response => {
            if (APICalls.value > 0) APICalls.value -= 1
            return response
        }, err => {
            if (APICalls.value > 0) APICalls.value -= 1
            throw err           
        })
    })

    watch (APICalls, () => {
        // If no API Calls and not loading, return
        if (!APICalls.value && !loading.value) {
            return  
        } else if (APICalls.value && !loading.value) {
            // Do not show loading bar for short response time
            if (!APICalls.value) return
            loading.value = true
            NProgress.start()  
        } else if (!APICalls.value && loading.value) {
            loading.value = false
            NProgress.done()
        } 
    })   

    watch (path, () => {
        APICalls.value = 0
    })
}