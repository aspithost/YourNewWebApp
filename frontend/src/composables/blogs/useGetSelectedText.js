import { ref, onMounted } from 'vue'

import useEventListener from '../useEventListener'

export default () => {
    const start = ref(0)
    const end = ref(0)      

    onMounted(() => {
        useEventListener(document.querySelector('textarea'), 'keyup', (event) => {
            start.value = event.target.selectionStart
        })
    
        useEventListener(document.querySelector('textarea'), 'mouseup', (event) => {
            start.value = event.target.selectionStart
            end.value = event.target.selectionEnd
        })
    })
    
    return { start, end }
}