<template>
    <div class="flex flex-col py-2">
        <label v-if="label" :for="id" class="input-header"> 
            {{ label }}
        </label>
        <input 
            v-bind="$attrs"
            @input="updateValue"
            :value="modelValue"
            :placeholder="placeholder ?? label"
            :id="id"
            class="px-3 py-2 rounded-md border shadow-sm placeholder:italic focus:outline-none focus:border-ynwa focus:ring-1 \
                focus:ring-ynwa focus:invalid:border-red-300 focus:invalid:ring-red-300"
        >   
    </div>
</template>

<script setup>
import updateFormValue from '/src/composables/baseComponents/updateFormValue'
import useGetInputId from '/src/composables/baseComponents/useGetInputId'

const props = defineProps({
    label: String,
    modelValue: String,
    placeholder: String
})

const emit = defineEmits(['update:modelValue'])

const id = useGetInputId(props.label)

const { updateValue } = updateFormValue(emit)

</script>