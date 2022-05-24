<template>
    <div v-if="verified && username" class="ynwacomp">
        <h1 class="h2-base">Congratulations!</h1>
        <p class="text-md">Welcome <b>{{ username }}</b>, you have successfully registered an account with Your New Web App! 
        You can now log in via our <router-link :to="{ name: 'Login' }" class="link">Login page</router-link>. </p>
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