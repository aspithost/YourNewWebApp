<template>
    <div class="sm:grid sm:grid-cols-2 md:contents lg:grid lg:grid-cols-2 gap-x-2 mt-2 lg:mt-0">
        <div v-for="i in numberOfCards" class="col-span-1 h-min bg-white border border-gray-300 shadow-md rounded-lg mb-2
                md:ml-2 lg:ml-0"
            >
            
            <div class="skeleton w-full h-[144px] sm:h-[124px] md:h-[176px] lg:h-[96px] xl:h-[100px] 2xl:h-[126px]"></div>

            <div class="pb-2 pt-3 px-4">

                <div class="flex flex-col pb-2 pt-3 px-4">
                    <div class="flex">
                        <div class="skeleton rounded-full self-center h-6 w-6 sm:w-10 sm:h-10 md:w-8 md:h-8 2xl:w-10 2xl:h-10"></div>
                        <div class="flex flex-col self-center justify-between rounded-md ml-3 h-[32px] w-1/2">
                            <div class="skeleton w-full rounded-md h-[14px]"></div>
                            <div class="skeleton w-full rounded-md h-[14px]"></div>
                        </div>
                    </div>
                </div>

                <div class="skeleton rounded-md h-[60px] sm:[h-84px] md:[h-72px] lg:h-[84px]"></div>
            
            </div>

        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'

const numberOfCards = inject('numberOfCards', 8)
</script>