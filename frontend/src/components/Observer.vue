<template>
    <div class="observer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const observer = ref(null)

const emit = defineEmits(['intersect'])

const whenTouching = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting ) {
            emit('intersect')
        }   
    })
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

onMounted(() => {
    observer.value = new IntersectionObserver(whenTouching, options)
    observer.value.observe(document.querySelector(".observer"))  
})
</script>