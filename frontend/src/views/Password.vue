<template>
    <div v-if="user" class="ynwacomp">
        <div v-show="!newPasswordResponse">
            <h1 class="h2-base">Reset Password</h1>
            <p>Hello <b>{{ user.username }}</b>, you can now set a new password. </p>
            <form @submit.prevent="submitNewPassword" class="input-form">
                <FormInput
                    v-model="passwordOne"
                    label="New password"
                    type="password"
                    minlength="6"
                    maxlength="20"
                    required
                />
                <FormInput
                    v-model="passwordTwo"
                    label="Repeat new password"
                    type="password"
                    minlength="6"
                    maxlength="20"
                    required
                />         
                <Button 
                    label="Set New Password"
                    :toggled="isPending" 
                    type="submit"
                />    
            </form>
            <p v-show="passwordError" class="font-bold"> {{ passwordError }}. </p>
        </div>
        <div v-show="newPasswordResponse"> 
            <h2 class="h2-base">Password successfully updated!</h2>
            <p>Please proceed to the <router-link :to="{ name: 'Login' }" class="link">Login</router-link> 
                page and log in using your new password!</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import getPasswordHash from '../composables/users/useGetPasswordHash'
import patchPasswordWithHash from '../composables/users/usePatchPasswordWithHash'

const { user, checkPasswordHash } = getPasswordHash()
const { newPasswordResponse, setPassword } = patchPasswordWithHash() 

const route = useRoute()
const router = useRouter()
const isPending = ref(false)
const passwordError = ref(null)
const passwordOne = ref(null)
const passwordTwo = ref(null)

if (!route.query && !route.query.hash) {  
    router.push({ name: 'FourOFour' })
} 

const submitNewPassword = async () => {
    passwordError.value = null
    if (passwordOne.value !== passwordTwo.value) {
        passwordError.value = 'Passwords don\'t match, please try again' 
    } else {
        await setPassword(route.query.hash, passwordOne.value, user.value._id)
        if (!newPasswordResponse.value) {
            passwordError.value = 'Something went wrong'
        } 
    }
    passwordOne.value = null; passwordTwo.value = null
}

onMounted ( async () => {
    await checkPasswordHash(route.query.hash)
    if (!user.value) {
        router.push({ name: 'FourOFour' })
    }
})

</script>