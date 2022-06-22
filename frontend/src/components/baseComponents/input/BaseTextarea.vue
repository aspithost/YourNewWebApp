<template>
    <div class="flex flex-col py-2">
        <label v-if="label" :for="id" class="input-header">
            {{ label }}
        </label>
        <textarea
            v-bind="$attrs"
            @input="updateValue"
            @keydown="checkForTab"
            :value="modelValue"
            :placeholder="placeholder"
            :id="id"
            class="border resize-none rounded shadow-sm px-3 py-2 placeholder:italic 
                focus:outline-none focus:border-ynwa caret-gray-600">
        </textarea> 
    </div>
</template>

<script setup>
import updateFormValue from '/src/composables/baseComponents/updateFormValue'
import useGetInputId from '/src/composables/baseComponents/useGetInputId'

const props = defineProps([ 'label', 'modelValue', 'placeholder' ])
const emit = defineEmits(['update:modelValue'])

const id = useGetInputId(props.label)
const { updateValue } = updateFormValue(emit)

const checkForTab = (event) => {
    if(event.code === 'Tab') {
        let val = event.target.value
        let start = event.target.selectionStart
        let end = event.target.selectionEnd
        val = val.slice(0, start) + '\t' + val.slice(end)
        event.preventDefault()
        emit('update:modelValue', val)
    }
}

</script>
