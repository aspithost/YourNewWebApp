<template>
    <div v-if="verified && username" class="verify bg-white border border-gray-200 text-gray-700 w-full pt-10 pb-12 px-8 xl:px-10">
        <h1 class="h1-base">Congratulations!</h1>
        <p class="text-md mb-6">Welcome <b>{{ username }}</b>, you have successfully registered an account with Your New Web App! 
        You can now login via our <router-link :to="{ name: 'Login' }" class="link">Login page</router-link>. </p>
        <p>Happy commenting!</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import verifyUser from '/src/composables/users/useVerifyUser'

const { error, username, verified, verifyAccount } = verifyUser()

const route = useRoute()
const router = useRouter()

onMounted( async () => {
    await verifyAccount(route.query.hash)
    if (error.value) router.push({ name: 'FourOFour' })
})

</script>