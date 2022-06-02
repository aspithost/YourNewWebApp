<template>
    <div class="ynwacomp">
        <div v-if="createdUser">
            <h1 class ="h2-narrow"> Welcome {{ createdUser.username }}, you have successfully registered! </h1>
            <p> You now have to activate your account. Please check your email!</p>
        </div>
        <div v-else>
            <h1 class="h1-narrow">Register</h1>
            <p> Why register for YourNewWebApp? To see for yourself how my registration and login systems work of course! 
                When you register for YourNewWebApp, you'll be able to comment on all of the website's posts. You'll even be able to comment
                on other comments! And all I need is a valid email.</p>
                <p>Don't worry, I won't use your e-mail for any marketing purpose whatsoever: YourNewWebApp uses automatic e-mail 
                verification just to make sure you aren't a bot selling fellow commenters on some pyramid scheme.</p>
                <p>Although you can comment in anonymity, please be aware of the 
                <router-link :to="{ name: 'TermsOfZZUse' }" class="link">Terms of Use</router-link>. 
                Generally speaking, if you're not a troll, please leave a message!</p>
            <p>Already have an account? Please <router-link :to="{ name: 'Login' }" class="link">
                log in</router-link> instead! </p>

            <form @submit.prevent="submitUser" class="input-form">
                <FormInput 
                    v-model="user.username"
                    label="Username"
                    type="text"
                    minlength="4"
                    maxlength="16"
                    required
                />
                <FormInput
                    v-model="user.email"
                    label="Email"
                    type="text"
                    required
                />
                <FormInput
                    v-model="user.password"
                    label="Password"
                    type="password"
                    required
                />  
                <Button          
                    :toggled="isPending"
                    label="Register"
                    type="submit"
                    class="mt-2"
                />             
            </form>
            <p v-show="error" class="font-bold"> {{ error }} </p>
        </div> 
        <Head>
            <title>Your New Web App- Join</title>
            <meta name="description" content="Create a free account for Your New Web App">
        </Head>    
    </div>        
</template>

<script setup>
import { ref } from 'vue'
import { Head } from '@vueuse/head'

import useCreateUser from '../composables/users/useCreateUser'

const { createUser, createdUser, error } = useCreateUser()
const isPending = ref(false)
const user = ref({})

const submitUser = async () => {
    isPending.value = true
    error.value = null
    await createUser(user.value)

    isPending.value = false
    if (error.value === 'You can\'t use that username!') user.value.username = null
    if (error.value === 'You can\'t use that email!') user.value.email = null
    user.value.password = null
}

</script>