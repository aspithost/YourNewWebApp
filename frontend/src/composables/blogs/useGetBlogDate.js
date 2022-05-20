import { ref } from 'vue'

export default () => {
    const writtenDate = ref(null)
    
    const findDate = (date) => {
        let localDate = new Date().toISOString().slice(0, 10)
        if (localDate === date.slice(0,10)) {
            writtenDate.value = 'Today'
        } else {
            writtenDate.value = new Date(date)
                .toLocaleString('en-US', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                })
        }
    }

    return { writtenDate, findDate }
}