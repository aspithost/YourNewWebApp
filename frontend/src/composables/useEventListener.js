import { onUnmounted } from 'vue'

export default (target, event, callback) => {
    target.addEventListener(event, callback)
    onUnmounted(() => target.removeEventListener(event, callback))
}   