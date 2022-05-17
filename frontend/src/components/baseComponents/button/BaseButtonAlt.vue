<template>
    <button :class="['font-thin cursor-pointer outline-none px-2 py-1 my-0.5 rounded-md text-gray-600 \
            disabled:cursor-not-allowed hover:bg-ynwa hover:bg-opacity-20 \
            hover:active:bg-ynwa hover:active:bg-opacity-10 disabled:hover:opacity-75',
            { 'bg-gray-100' : toggled }]"
        :disabled="toggled && $attrs.type === 'submit'"
        >
        <slot>
            {{ !toggled ? label : $attrs.type === 'submit' ? 'Loading' : 'Back' }} 
        </slot>
    </button>
</template>

<script setup>

const props = defineProps(['label', 'toggled'])

</script>