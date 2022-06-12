import { onUnmounted } from 'vue'

// Call onMounted within components themselves to have access to the document/window objects
export default (target, event, callback) => {
    target.addEventListener(event, callback)
    onUnmounted(() => target.removeEventListener(event, callback))
}   