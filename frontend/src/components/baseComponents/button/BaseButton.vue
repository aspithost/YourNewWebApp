<template>
    <button 
        :class="['font-bold cursor-pointer outline-none px-8 py-2 m-0.5 rounded-full shadow bg-ynwa text-white \
            disabled:cursor-not-allowed focus:shadow-md hover:bg-opacity-90 hover:active:bg-opacity-80 ',
            { 'animate-pulse' : toggled && $attrs.type === 'submit' }]"
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