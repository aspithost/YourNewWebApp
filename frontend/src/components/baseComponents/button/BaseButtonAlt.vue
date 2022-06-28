<template>
    <button :class="['bg-gray-200 font-thin cursor-pointer outline-none px-2 py-1 my-0.5 rounded-md text-gray-600 \
            disabled:cursor-not-allowed focus:shadow-md hover:bg-ynwa hover:bg-opacity-10',
            { 'bg-gray-100' : toggled }]"
        :disabled="toggled && $attrs.type === 'submit'"
        >
        <slot>
            {{ !toggled ? label : $attrs.type === 'submit' ? 'Loading' : 'Back' }} 
        </slot>
    </button>
</template>

<script setup>

const props = defineProps({
    label: String, 
    toggled: Boolean
})

</script>