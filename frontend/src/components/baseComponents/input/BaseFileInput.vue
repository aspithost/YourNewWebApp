<template>
    <label v-if="label" :for="id" class="block pt-2 input-header">
        {{ label }}
    </label>
    <input
        v-bind="$attrs"
        @input="updateValue"
        :id="id"
        type="file"
        :accept="$attrs.accept ? $attrs.accept : 'image/jpeg, image/jpg, image/jfif, image/jif, image/png, image/gif'"
        class="rounded-md border-none outline-none file:text-ynwa cursor-pointer mb-2 
            file:px-4 file:py-2 file:mr-2 file:cursor-pointer
            file:rounded-full file:font-bold file:shadow-sm file:border-none 
            hover:file:bg-emerald-50"
    >
</template>

<script setup>
import updateFormValue from '/src/composables/baseComponents/updateFormValue'
import useGetInputId from '/src/composables/baseComponents/useGetInputId'

const props = defineProps([ 'id', 'label', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const id = useGetInputId(props.label)
const { updateValue } = updateFormValue(emit)

</script>