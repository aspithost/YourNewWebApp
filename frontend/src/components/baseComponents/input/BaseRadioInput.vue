<template>
    <input
        @change="updateValue"
        :checked="modelValue === label"
        :id="label"
        :value="label"
        class="accent-ynwa ml-2 focus:outline-none focus:shadow-sm cursor-pointer"
        type="radio"
    />
    <label :for="label" class="ml-3 font-semi bold cursor-pointer">
        {{ label }}
    </label>
</template>

<script setup>
import updateFormValue from '/src/composables/baseComponents/updateFormValue'

const props = defineProps([ 'id', 'label', 'modelValue' ])
const emit = defineEmits(['update:modelValue'])

const { updateValue } = updateFormValue(emit)

</script>