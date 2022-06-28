<template>
    <div class="py-2">
        <div v-for="label in labels">
            <BaseRadioInput 
                :modelValue="modelValue"
                :label="label"
                @update:modelValue="$emit('update:modelValue', $event)"
            />
        </div>
    </div>
</template>

<script setup>
import BaseRadioInput from '/src/components/baseComponents/input/BaseRadioInput.vue'
import updateFormValue from '/src/composables/baseComponents/updateFormValue'

const props = defineProps({
    labels: Array,
    modelValue: String,
    name: String
})
const emit = defineEmits(['update:modelValue'])

const { updateValue } = updateFormValue(emit)

</script>