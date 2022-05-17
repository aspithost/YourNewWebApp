import { computed, onMounted, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

import useEventListener from './useEventListener'

export default () => {
    onMounted (() => {
        const store = useStore()

        const screenSize = computed (() => store.state.screenSize)
        
        const width = ref(null)
    
        width.value = window.innerWidth
    
        useEventListener(window, 'resize', (event) => {
            width.value = event.target.innerWidth
        })
    
        let timer
        watchEffect(() => {
            if (width.value && !screenSize.value) {
                store.dispatch('storeScreenSize', width.value)
            } 
    
            clearTimeout(timer)
            timer = setTimeout(() => {
                store.dispatch('storeScreenSize', width.value)
            }, 250)
        })
    })
}