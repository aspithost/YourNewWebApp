import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import NProgress from 'nprogress'

import { axiosUser, axiosUserCredentials, axiosBlog, axiosBlogCredentials } from './axios'

const axiosArray = [axiosUser, axiosUserCredentials, axiosBlog, axiosBlogCredentials]

import '/src/nprogress.css'

export default () => {

    const loading = ref(false)

    const store = useStore()

    axiosArray.forEach(instance => {
        instance.interceptors.request.use(request => {
            store.dispatch('incrementAPICall')
            return request
        })
    
        instance.interceptors.response.use(response => {
            store.dispatch('subtractAPICall')
            return response
        }, err => {
            store.dispatch('subtractAPICall')
            throw err           
        })
    })

    const APICalls = computed (() => store.state.APICalls)
    
    watch (APICalls, () => {
        if (APICalls.value && !loading.value) {
            loading.value = true
            NProgress.start()
        } else if (!APICalls.value && loading.value) {
            loading.value = false
            NProgress.done()
        }
    })   

    const route = useRoute()
    const path = computed (() => route.path)

    watch (path, () => {
        if (loading.value) {
            loading.value = false
            NProgress.done()
        }
    })
}