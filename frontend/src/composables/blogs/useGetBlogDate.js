import { ref } from 'vue'

export default () => {
    const formattedDate = ref(null)
    
    const findDate = (date) => {
        let localDate = new Date().toISOString().slice(0, 10)
        if (localDate === date.slice(0,10)) {
            formattedDate.value = 'Today'
        } else {
            formattedDate.value = new Date(date)
                .toLocaleString('en-US', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                })
        }
    }

    return { formattedDate, findDate }
}