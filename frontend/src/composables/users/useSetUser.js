import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default () => {
    const store = useStore()

    onMounted (() => {
        setInterval(() => {
            store.dispatch('getAccessToken')
        }, 250000)  
    })

    onUnmounted(() => {
        clearInterval()
    })
}