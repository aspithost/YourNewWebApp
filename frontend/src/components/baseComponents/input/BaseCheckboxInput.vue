<template>
    <div class="py-2">
        <input
            @change="updateValue"
            v-bind="$attrs"
            :checked="modelValue"
            :id="id"
            type="checkbox"
            class="accent-ynwa cursor-pointer ml-2 focus:outline-none focus:shadow-sm" 
        />  
        <label v-if="label" :for="id" class="cursor-pointer ml-3">
            {{ label }}
        </label>
    </div>
</template>

<script setup>
import updateFormValue from '/src/composables/baseComponents/updateFormValue'
import useGetInputId from '/src/composables/baseComponents/useGetInputId'

const props = defineProps({
    label: String,
    modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const id = useGetInputId(props.label)
const { updateValue } = updateFormValue(emit)
</script>