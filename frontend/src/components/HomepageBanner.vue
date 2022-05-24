<template>
    <div class="bg-[#FFAE4E] flex flex-col h-[400px] px-4"> 
        <div class="flex flex-col text-center justify-between items-center h-full">
            <h1 class="text-white font-header text-3xl md:text-4xl font-extrabold mt-28">
                Helping You Build Your New Web App.
            </h1>
            <span class="text-white text-2xl md:text-3xl font-header mb-12 md:mb-20">
                Let my experiences building my web app help you build yours.
            </span>
        </div>
        <div class="flex flex-wrap justify-center mb-6 md:mb-8">
            <a
                v-for="(button, index) in ['Get Coding!', 'About YNWA', 'About Me']" 
                @click="emit('clicked', `#${button.toLowerCase().replace(' ', '-').replace('!', '')}`)"
                :class="{ 'hidden md:contents' : index > 0}"
            >
                <Button 
                    :label="`${button}`"
                >
                </Button> 
            </a>
            <router-link :to="{ name: 'Blogs' }">
                <Button 
                    label="Latest Blogs"
                >
                </Button>                 
            </router-link>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['clicked'])
</script>