<template>
    <div class="fixed bg-black bg-opacity-50 top-0 h-full w-full overflow-y-auto z-20" >
        <div class="flex flex-col bg-white rounded mx-auto w-full py-4 px-6 sm:w-3/4 lg:py-6 xl:w-1/2 xl:px-8
            sm:my-6 md:my-12 lg:my-16"
        > 
        
            <div v-show="!showSettings">
                <h1 class="h2-base"> Cookie Statement </h1>
                <p> 
                    yournewwebapp.com uses cookies and your browser storage to provide you with a properly functioning
                    website. This includes storing your language preferences, login credentials, and so forth. The website
                    uses analytics to determine which pages you visit, which blogs you read, where you're from, etcetera.
                </p>
                <p> 
                    yournewwebapp.com also uses third party scripts, primarily those placed by social media platforms through
                    their embedded content. These cookies enable you to view this embedded content from these 
                    platforms. You can find more information in the <router-link
                    :to="{ name: 'Privacy' }" class="hover:underline text-yournewwebapp font-bold" target="_blank"> Privacy 
                    Statement</router-link>.</p>
                <p> 
                    By clicking "Accept" you agree to the privacy terms. If you want a more detailed explanation or if you want 
                    to disable certain cookies, please click "Settings". You can change your settings at any time by 
                    pressing "Cookie Settings" in our Footer. 
                </p>
                <div class="flex justify-center">
                    <Button 
                        @click="showSettings = true"
                        label="Settings"
                    />
                    <Button 
                        @click="submitPreferences('accept')"
                        label="Accept"
                    />
                </div>
            </div>

            <div v-show="showSettings">
                <h2 class="h2-base"> Purposes </h2>
                <form @submit.prevent="submitPreferences" class="flex flex-col">
                    <div class="pt-2">
                        <div class="flex justify-between md:grid md:grid-cols-3">
                            <label class="font-semibold"> Strictly Necessary Cookies </label>
                            <input 
                                checked 
                                disabled
                                type="checkbox" 
                                class="self-center col-start-2 accent-ynwa focus:ring-0 hover:cursor-pointer" 
                            >
                        </div>
                        <p> 
                            yournewwebapp.com uses cookies and your browser storage to ensure a proper browsing 
                            experience. This allows you to save language preferences, login, etcetera. 
                        </p>
                    </div>

                    <div class="py-2">
                        <div class="flex justify-between pb-2 md:grid md:grid-cols-3">
                            <label class="font-semibold"> Preferences</label>
                            <input 
                                @click="checkPreferences"
                                v-model="preferences"  
                                :checked="preferences"
                                class="self-center accent-ynwa focus:ring-0 hover:cursor-pointer"
                                type="checkbox"
                            >
                        </div>
                        <details class="open:border-b-2 open:border-gray-200 open:pb-2 open:mb-2">
                            <summary class="cursor-pointer w-[200px]">
                                View Preferences
                            </summary>
                            <p> 
                                This website uses storage to remember your preferences. These include preferences stored directly by 
                                yournewwebapp.com, such as your language settings. 
                            </p>  
                            <span class="flex justify-between md:grid md:grid-cols-3">
                                <label class="font-semibold"> Languages </label>
                                <input 
                                    v-model="languages"
                                    :checked="languages"
                                    type="checkbox" 
                                    class="self-center accent-ynwa focus:ring-0 hover:cursor-pointer" 
                                >
                            </span>     
                        </details>
                    </div>

                    <div class="py-2">
                        <div class="flex justify-between py-2 md:grid md:grid-cols-3">
                            <label class="font-semibold"> Social Media Cookies</label>
                            <input 
                                @click="checkSocialMediaCookies"
                                v-model="socialMediaCookies"  
                                :checked="socialMediaCookies"
                                class="self-center accent-ynwa focus:ring-0 hover:cursor-pointer"
                                type="checkbox"
                            >
                        </div>
                        <details class="open:border-b-2 open:border-gray-200 open:pb-2 open:mb-2">
                            <summary class="cursor-pointer w-[200px]">View Social Media Cookies</summary>
                            <p>
                                This website uses third-party-cookies, such as those placed by social media platforms like Facebook, 
                                Instagram (also Facebook) and Twitter. If you disable these cookies, you will not be able to view
                                any embedded content from these platforms. What other things these social media giants do with your data, 
                                I honestly don't know. See our <router-link
                                :to="{ name: 'Privacy' }" class="hover:underline text-yournewwebapp font-bold" target="_blank"> Privacy 
                                Statement</router-link> if you want to know what they might do with your data. 
                            </p>

                            <div class="flex justify-between py-2 md:grid md:grid-cols-3">
                                <label class="font-semibold"> Facebook</label>
                                <input 
                                    v-model="facebook"  
                                    :checked="facebook"
                                    class="self-center accent-ynwa focus:ring-0 hover:cursor-pointer"
                                    type="checkbox"
                                >
                            </div>

                            <div class="flex justify-between py-2 md:grid md:grid-cols-3">
                                <label class="font-semibold"> Instagram</label>
                                <input 
                                    v-model="instagram"  
                                    :checked="instagram"
                                    class="self-center accent-ynwa focus:ring-0 hover:cursor-pointer"
                                    type="checkbox"
                                >
                            </div>

                            <div class="flex justify-between py-2 md:grid md:grid-cols-3">
                                <label class="font-semibold"> Twitter</label>
                                <input 
                                    v-model="twitter"  
                                    :checked="twitter"
                                    class="self-center accent-ynwa focus:ring-0 hover:cursor-pointer"
                                    type="checkbox"
                                >
                            </div>
                            
                            <div class="flex justify-between py-2 md:grid md:grid-cols-3">
                                <label class="font-semibold"> YouTube</label>
                                <input 
                                    v-model="youTube"  
                                    :checked="youTube"
                                    class="self-center accent-ynwa focus:ring-0 hover:cursor-pointer"
                                    type="checkbox"
                                >
                            </div>
                        </details>
                    </div>

                    <div class="py-2">
                        <div class="flex justify-between md:grid md:grid-cols-3">
                            <label class="font-semibold"> Statistics </label>
                            <input 
                                checked 
                                disabled
                                type="checkbox" 
                                class="self-center col-start-2 accent-ynwa focus:ring-0 hover:cursor-pointer" 
                            >
                        </div>
                        <p> 
                            YourNewWebApp may place cookies to gather anonymized data that shows us which blogs you read, etcetera. 
                            This data <b>is not</b> used for profiling.
                        </p>
                    </div>

                    <div class="flex justify-center">
                        <Button
                            @click="showSettings = !showSettings"
                            label="Back"
                            type="button"
                        />
                        <Button
                            label="Save Changes"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
            <div class="flex justify-evenly divide-x w-1/2 mx-auto mt-8">
                <router-link class="flex-grow text-center hover:opacity-30" :to="{ name: 'Privacy' }" target="_blank"> Privacy Policy </router-link>
                <router-link class="flex-grow text-center hover:opacity-30" :to="{ name: 'TermsOfUse' }">Terms</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

import cookies from 'js-cookie'

const store = useStore()
const showSettings = ref(false)


// Preferences
const preferences = ref(false)
const languages = ref(false)

const checkPreferences = () => {
    preferences.value = !preferences.value
    languages.value = preferences.value
}
watchEffect(() => {
    preferences.value = languages.value ? true : false
})
onMounted(() => {
    watchEffect(() => {
        languages.value =
            localStorage.preferences ? 
            JSON.parse(localStorage.preferences) : 
            false
    })
})


// Social Media Cookies
const socialMediaCookies = ref(false)
const facebook = ref(false)
const instagram = ref(false)
const twitter = ref(false)
const youTube = ref(false)

const checkSocialMediaCookies = () => {
    socialMediaCookies.value = !socialMediaCookies.value
    facebook.value = socialMediaCookies.value
    instagram.value = socialMediaCookies.value
    twitter.value = socialMediaCookies.value
    youTube.value = socialMediaCookies.value
}
watchEffect(() => {
    socialMediaCookies.value = 
        facebook.value && instagram.value && twitter.value && youTube.value ?
            true : false
})
onMounted(() => {
    watchEffect(() => {
        facebook.value =
            localStorage.socialMediaCookies ? 
            JSON.parse(localStorage.socialMediaCookies).facebook : 
            false
        instagram.value =
            localStorage.socialMediaCookies ? 
            JSON.parse(localStorage.socialMediaCookies).instagram : 
            false
        twitter.value =
            localStorage.socialMediaCookies ? 
            JSON.parse(localStorage.socialMediaCookies).twitter : 
            false
        youTube.value =
            localStorage.socialMediaCookies ? 
            JSON.parse(localStorage.socialMediaCookies).youTube : 
            false
    })
})


const submitPreferences = (val) => {
    setFunctionalCookies()

    setPreferences(val === 'accept' ? true : false)
    setSocialMediaCookies(val === 'accept' ? true : false)
}


const setFunctionalCookies = () => {
    cookies.set('functionalCookies', Date.now(), { expires : 365 })
    store.dispatch('allowFunctionalCookies', true)
}

const setPreferences = (val) => {
    if (val) preferences.value = true
    localStorage.setItem('preferences', preferences.value)
}

const setSocialMediaCookies = async (val) => {
    if (val) socialMediaCookies.value = true 
    let options = {
        'facebook': socialMediaCookies.value ? true : facebook.value,
        'instagram': socialMediaCookies.value ? true : instagram.value,
        'twitter': socialMediaCookies.value ? true : twitter.value,
        'youTube': socialMediaCookies.value ? true: youTube.value
    }
    let str = JSON.stringify(options)
    localStorage.setItem('socialMediaCookies', str)
}

</script>