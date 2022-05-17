import { ref } from 'vue'

export default () => {
    
    const writtenDate = ref(null)

    const findDate = async (date) => {
        let rawDate = (new Date().valueOf() - new Date(date).valueOf()) / (1000 * 60)
        if (rawDate < 0) {
            writtenDate.value = date
            return
        }
        if (rawDate < 1) {
            writtenDate.value = 'seconds ago'
        } else if (rawDate < 2) {
            writtenDate.value = 'one minute ago'
        } else if (rawDate < 60) {
            writtenDate.value = `${Math.floor(rawDate)} minutes ago`
        } else if (rawDate < 120) {
            writtenDate.value = 'one hour ago'
        } else if (rawDate < 1440) {
            writtenDate.value = `${Math.floor(rawDate/60)} hours ago`
        } else if (rawDate < 2880) {
            writtenDate.value = 'one day ago'
        } else if (rawDate < 10080) {
            writtenDate.value = `${Math.floor(rawDate/1440)} days ago`
        } else if (rawDate < 20160) {
            writtenDate.value = 'one week ago'
        } else {
            writtenDate.value = `${Math.floor(rawDate/10080)} weeks ago`
        }
    }        

    return { writtenDate, findDate }
}