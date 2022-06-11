import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { axiosUser, axiosUserCredentials, axiosBlog, axiosBlogCredentials } from './index.js'

const axiosArray = [axiosUser, axiosUserCredentials, axiosBlog, axiosBlogCredentials]

export default () => {
    const store = useStore()
    const axiosError = computed(() => store.state.axiosError)
  
    const route = useRoute()

    onMounted(() => {
        axiosArray.forEach(instance => {
            instance.interceptors.response.use(res => res, err => {
                if ((err.message === 'Network Error' || err.response.status == 408) && !axiosError.value) {
                    store.dispatch('storeAxiosError', true)
                }
                throw err
            })
        })
    })

    watch(route, () => store.dispatch('storeAxiosError', false))
}