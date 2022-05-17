<template>
    <div class="bg-white border shadow-md">
        <div 
            v-for="index in 6" 
            class="border border-gray-200 grid grid-cols-8 p-2 sm:p-3 md:p-2 lg:p-4 
                h-[124px] sm:h-[194px] md:h-[146px] lg:h-[178px] xl:h-[185px] 2xl:h-[214px]"
        >
            <div class="skeleton rounded-md col-span-3 h-full"></div>
            <div class="rounded-md col-span-5 h-full flex flex-col justify-between
                pl-3 pr-1 sm:pl-5 sm:pr-2 md:pl-4 lg:pl-5 2xl:pl-6"
            >
                <div class="skeleton rounded-md h-[60px] sm:[h-84px] md:[h-72px] lg:h-[84px]"></div>
                <div class="flex">
                    <div class="skeleton rounded-full self-center h-6 w-6 sm:w-10 sm:h-10 md:w-8 md:h-8 2xl:w-10 2xl:h-10"></div>
                    <div class="flex flex-col self-center justify-between rounded-md ml-3 h-[32px] w-1/2">
                        <div class="skeleton w-full rounded-md h-[14px]"></div>
                        <div class="skeleton w-full rounded-md h-[14px]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>