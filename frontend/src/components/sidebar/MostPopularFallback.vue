<template>
    <div class="bg-white"> 
        <div class="p-2 pb-3 md:bg-ynwa md:text-white">
            <div class="skeleton rounded-md h-[32px]"></div>
        </div>
        <div class="py-2 border-ynwa md:border-4" >
            <div v-for="n in 4" class="py-1 px-2">
                <div class="skeleton rounded-md h-[36px] md:[h-32px]"></div>
            </div>
        </div>
    </div>
</template>