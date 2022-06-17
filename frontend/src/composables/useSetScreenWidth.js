import { computed, onMounted, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

import useEventListener from './useEventListener'

export default () => {
    const store = useStore()

    const screenWidth = computed (() => store.state.screenWidth)
    
    const width = ref(null)

    onMounted (() => {
 
        width.value = window.innerWidth
    
        useEventListener(window, 'resize', (event) => {
            width.value = event.target.innerWidth
        })
    })

    let timer
    watchEffect(() => {
        if (width.value && !screenWidth.value) {
            store.dispatch('storescreenWidth', width.value)
        } 

        clearTimeout(timer)
        timer = setTimeout(() => {
            store.dispatch('storescreenWidth', width.value)
        }, 250)
    })
}