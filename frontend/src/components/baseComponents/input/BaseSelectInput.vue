<template>
    <div class="py-2">
        <label v-if="label" :for="id" class="block input-header">
            {{ label }}
        </label>

        <div 
            @click="open = !open" 
            :id="id"
            class="bg-gray-200 text-ynwa font-bold w-[150px] cursor-pointer shadow-sm px-4 py-2" 
            :class="{ 'shadow-none': open }"
        >
            {{ modelValue ? modelValue : props.options[0] }}    
        </div>

        <div 
            v-show="open"
            class="bg-gray-200 cursor-pointer w-[150px] shadow-sm" 
        >
            <div
                v-for="option in options" 
                @click="
                    open = false;
                    emit('update:modelValue', option)
                "
                class="text-ynwa font-bold px-4 hover:bg-emerald-50"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useEventListener from '/src/composables/useEventListener'
import useGetInputId from '/src/composables/baseComponents/useGetInputId'

const props = defineProps([ 'id', 'label', 'modelValue', 'options', 'width' ])
const emit = defineEmits(['update:modelValue'])

const id = useGetInputId(props.label)
const open = ref(false)

onMounted(() => {
    useEventListener(document, 'keydown', event => {
        if (event.key === 'Escape' && open.value) {
            open.value = false;
        }
    })
})

</script>