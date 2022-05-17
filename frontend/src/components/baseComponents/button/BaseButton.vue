<template>
    <button 
        :class="['font-bold cursor-pointer outline-none px-8 py-2 m-0.5 rounded-full shadow bg-ynwa text-white \
            hover:bg-white hover:text-ynwa focus:shadow-xl disabled:cursor-not-allowed \
            hover:active:bg-emerald-50 disabled:hover:bg-ynwa disabled:hover:text-white disabled:hover:opacity-75',
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