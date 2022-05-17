export default (emit) => {
    const updateValue = (event) => {

        let val = event.target.value.trim()
        
        if (event.target.type === 'file') val = event.target.files[0].name
        if (event.target.type === 'checkbox') val = event.target.checked
    
        emit('update:modelValue', val)
    }
  
    return { updateValue }
}