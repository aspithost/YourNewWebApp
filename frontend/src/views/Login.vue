<template>
    <div class="ynwacomp">
        <h1 class="h1-narrow">Login</h1>
 
        <div v-if="activationError">
            <h2 class="font-bold"> 
                You still have to activate your account. Please check your email!
            </h2>

            <form v-if="!emailResponse" @submit.prevent="newVerificationEmail">
                <p>Lost your activation e-mail? You can generate a new one by clicking the button below! </p>
                
                <Button
                    label="Generate Verification Email"
                    :toggled="isPending"
                    type="submit"
                />
            </form>
            <p v-else class="font-bold pt-4"> {{ emailResponse}} </p>
            <p v-if="emailError" class="font-bold pt-4"> {{ emailError }} </p>
        </div>

        <div v-else>
            <p class="text-md">If you haven't created an account yet, please 
                <router-link :to="{ name: 'Join' }" class="link">register</router-link> first.
            </p>
            
            <form 
                @submit.prevent="login" 
                autocomplete="on" 
                class="input-form pb-2"
            >

                <FormInput 
                    v-model="user.email"
                    label="Email"
                    type="email"
                    required
                />
                <FormInput 
                    v-model="user.password"
                    label="Password"
                    type="password"
                    required
                />  
                <Button
                    label="Login"
                    :toggled="isPending"
                    type="submit"
                />
            </form>

            <p v-if="loginError" class="font-bold"> {{ loginError }} </p>

            <details 
                v-if="!resetResponse" 
                class="input-form rounded-md cursor-pointer pt-2 px-2 
                     "
            >
                <summary 
                    class="h4-base outline-none">
                        Forgot your Password?
                </summary>
                <form @submit.prevent="setNewPassword">
                    <FormInput
                        v-model="user.resetEmail"
                        label="Enter Email"
                    />
                    <Button 
                        label="Reset Password"
                        :toggled="isPending"
                        type="submit"
                    />
                </form>
            </details>

            <p v-else class="font-bold">
                You have successfully requested to reset your password. Please check your email! 
            </p>
            <p v-if="resetError" class="font-bold"> {{ resetError }} </p>
        </div>

        <Head>
            <title>Your New Web App - Login</title>
            <meta name="description" content="Login to your Your New Web App account so that you can comment on any of the blogs">
        </Head>  
    </div> 
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Head } from '@vueuse/head'

import useVerificationEmail from '../composables/users/useVerificationEmail'
import useResetPassword from '../composables/users/useResetPassword'
import useLoginUser from '../composables/users/useLoginUser'

const router = useRouter()
const store = useStore()

const { error: loginError, loginUser } = useLoginUser()
const { error: resetError, resetPassword, response: resetResponse} = useResetPassword()
const { error: emailError, generateVerificationEmail, response: emailResponse } = useVerificationEmail()

const activationError = ref(false)
const isPending = ref(false)
const user = ref({})

const login = async () => {
    isPending.value = true
    loginError.value = false

    await loginUser(user.value.email, user.value.password)

    if (!loginError.value) {
        await store.dispatch('getAccessToken')
        return router.push({ name: 'User' })

    } else if (loginError.value === 'You still have to activate your account!') {
        activationError.value = true

    } else {
        user.value.email = null
        user.value.password = null
    }
    isPending.value = false
}

const newVerificationEmail = async () => {
    if (confirm('Do you really want to request a new verification email?')) {
        isPending.value = true
        await generateVerificationEmail(user.value.email)
        isPending.value = false
    }
}

const setNewPassword = async () => {
    if(confirm('Do you really want to reset your password?')) {
        isPending.value = true
        await resetPassword(user.value.resetEmail) 
        isPending.value = false
    }
}
</script>