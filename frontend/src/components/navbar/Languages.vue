<template>
    <span id="languages" class="flex">
        <img 
            @click="toggleLanguage('en')"
            alt="English"
            src="/flagUK.png"
            width="24"
            height="24"
            :class="['mx-1 my-2 md:my-1 rounded-full hover:shadow-lg \
                w-[24px] h-[24px]', 
                { 'cursor-pointer opacity-25 hover:opacity-70': languageDutch },
                { 'cursor-not-allowed' : !languageDutch }]">
        <img 
            @click="toggleLanguage('nl')"
            alt="Nederlands" 
            src="/flagNL.png"
            width="24"
            height="24"
            :class="['mx-1 my-2 md:my-1 rounded-full cursor-pointer hover:shadow-lg opacity-25 \
                hover:opacity-50 w-[24px] h-[24px]',
                { 'opacity-100 hover:opacity-100 cursor-not-allowed' : languageDutch }]" >
    </span>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

import cookies from 'js-cookie'

const store = useStore()

const languageDutch = computed (() => store.state.languageDutch)

const dutch = ref()

// Default value van languageDutch is false tenzij je een cookie hebt
if (!dutch.value) dutch.value = languageDutch.value

const toggleLanguage = (val) => {
    if (val === 'en' && !dutch.value || val === 'nl' && dutch.value) return 
    dutch.value = !dutch.value
}

onMounted (() => {  
    if (!localStorage.preferences) return 
    let languageCookie = cookies.get('languageDutch')
    if (!languageCookie) {
        cookies.set('languageDutch', dutch.value, { expires: 365 })
    }  
})

watch (dutch, () => {
    store.dispatch('storeLanguageDutch', dutch.value)   
    if (JSON.parse(localStorage.preferences)) { 
        cookies.set('languageDutch', dutch.value, { expires : 365 })
    }
})

</script>