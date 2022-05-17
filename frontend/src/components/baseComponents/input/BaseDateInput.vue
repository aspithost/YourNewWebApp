<template>
    <div class="py-2">
        <label v-if="label" :for="id" class="input-header block">
            {{ label }}
        </label>
        <input
            @input="updateValue" 
            :value="modelValue"
            :id="id"
            type="datetime-local"
            class="border-2 border-gray-200 shadow-sm cursor-pointer p-2 
                focus:border-ynwa focus:outline-none focus:shadow-md"
        >
    </div>
</template>

<script setup>
import updateFormValue from '/src/composables/baseComponents/updateFormValue'
import useGetInputId from '/src/composables/baseComponents/useGetInputId'

const props = defineProps([ 'label', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const id = useGetInputId(props.label)
const { updateValue } = updateFormValue(emit)

</script>