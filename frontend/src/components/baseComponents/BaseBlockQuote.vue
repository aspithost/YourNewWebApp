<template>
    <figure class="bg-ynwa bg-opacity-20 rounded-lg px-4 py-2">
        <blockquote class="italic font-serif">
            <p>
                “ {{ content }} ”
            </p>
        </blockquote>

        <div class="flex items-center space-x-3">
            <img 
                v-if="src"
                :src="`${src}`"
                :alt="alt"
                class="flex-none rounded-full object-cover h-10 w-10 sm:h-12 sm:w-12" 
                width="48" 
                height="48" 
            />
            <figcaption :class="{ 'px-2' : !src }">
                <div class="font-semibold text-ynwa leading-5">
                    {{ captionOne }}
                </div>
                <div class="text-gray-600 text-sm sm:text-base font-light leading-5">
                    {{ captionTwo }}
                </div>
            </figcaption>
        </div>
    </figure>
</template>

<script setup>
const props = defineProps(['alt', 'captionOne', 'captionTwo', 'content', 'src'])
</script>