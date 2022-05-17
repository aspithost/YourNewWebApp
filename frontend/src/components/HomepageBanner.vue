<template>
    <div class="bg-ynwa bg-opacity-80 flex flex-col h-[400px] md:h-[500px] px-4"> 
        <h1 class="text-white m-auto text-center font-header text-3xl md:text-4xl font-extrabold">
            Helping You Build Your New Web App.
        </h1>
        <p class="text-white mx-auto pb-10 md:pb-20 text-center text-2xl md:text-3xl font-header">
            Let my experiences building my web app help you build yours.
        </p>
        <div class="flex flex-wrap justify-center mb-6 md:mb-10">
            <a
                v-for="(button, index) in ['Get Coding!', 'About YNWA', 'About Me']" 
                @click="emit('clicked', `#${button.toLowerCase().replace(' ', '-').replace('!', '')}`)"
                :class="{ 'hidden md:contents' : index > 0}"
            >
                <Button 
                    :label="`${button}`"
                    class="[background-color:#FFF] text-ynwa hover:[background-color:#0d9488] hover:[color:#FFF]
                        hover:active:[background-color:#008983]" 
                >
                </Button> 
            </a>
            <router-link :to="{ name: 'Blogs' }">
                <Button 
                    label="Latest Blogs"
                    class="[background-color:#FFF] text-ynwa hover:[background-color:#0d9488] hover:[color:#FFF]
                        hover:active:[background-color:#008983]" 
                >
                </Button>                 
            </router-link>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['clicked'])
</script>