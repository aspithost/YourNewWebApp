<template>
    <div v-if="user" class="ynwacomp">
        <h1 class="h2-narrow"> Welcome {{ user.username }}! </h1>
        <p class="mb-4"> Feel free to edit your profile! </p>

        <Button
            @click="changeUsername = !changeUsername; patchError = null; patchResponse = null" 
            v-show="!changeAvatar && !changePassword"
            :toggled="changeUsername"
            label="Change Username"
            class="block"
        />
        <form v-show="changeUsername" @submit.prevent="submitUsername" class="input-form">    
            <FormInput
                v-model="user.newUsername"
                label="New Username"
                type="text"
                required
            />
            <FormInput
                v-model="user.password"
                label="New Password"
                type="password"
                required
            />
            <Button
                class="inline-block"
                :toggled="isPending"
                label="Change Username"
                type="submit"
            />
        </form>


        <div v-if="user.rights >= 2">
            <Button
                @click="changeAvatar = !changeAvatar; patchError = null; patchResponse = null" 
                v-show="!changeUsername && !changePassword"
                :toggled="changeAvatar"
                label="Change Avatar"  
            />

            <div v-show="changeAvatar">
                <form @submit.prevent="submitAvatar" enctype="multipart/form-data">
                    <FileInput
                        label="Upload Avatar"
                        name="selectedAvatar"
                        accept="image/jpeg, image/jpg, image/png, image/gif"
                    />
                    <Button
                        :toggled="isPending"
                        label="Upload Avatar"
                        type="submit"
                    />
                </form>

                <form @submit.prevent="selectAvatar">
                    <FileInput
                        v-model="user.avatar"
                        label="Select Avatar"
                    />
                    <Button
                        :toggled="isPending"
                        label="Update Avatar"
                        type="submit"
                    />
                </form>
                <p v-if="avatarError"> {{ avatarError }} </p>
                <p v-if="avatarResponse"> {{ avatarResponse }} </p>         
            </div>


        </div>

        <Button
            @click="changePassword = !changePassword; patchError = null; patchResponse = null" 
            v-show="!changeUsername && !changeAvatar"
            :toggled="changePassword"
            label="Change Password"
        />
        <form v-show="changePassword" @submit.prevent="submitPassword" class="input-form">
            <FormInput
                v-model="user.oldPassword"
                label="Old Password"
                type="password"
                required
            />
            <FormInput
                v-model="user.newPassword"
                label="Set New Password"
                type="password"
                minlength="6"
                maxlength="20"
                required
            />
            <FormInput
                v-model="user.newPasswordCopy"
                label="Repeat New Password"
                type="password"
                minlength="6"
                maxlength="20"
                required
            />
            <Button
                :toggled="isPending"
                label="Change Password"
                type="submit"
            />
        </form>

        <p v-if="patchResponse || patchError" class="font-bold"> {{ patchError ? patchError : patchResponse.message }} </p>

        <div v-show="!changeUsername && !changeAvatar && !changePassword">
            <p class="pt-6"> Want to log out instead? Hope to see you again soon! </p>
            <p class="font-bold" v-if="logoutError"> {{ logoutError }}</p>
            <Button
                @click="logout"
                label="Logout User"
                class="block"
            />
            <Button
                @click="logoutAllDevices"
                label="Logout User All Devices"
            />
        </div>

        <Head>
            <title>Your New Web App - User</title>
            <meta name="description" content="Edit your user profile or logout user." />
        </Head> 
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Head } from '@vueuse/head'

import useLogoutUser from '../composables/users/useLogoutUser'
import usePatchUser from '../composables/users/usePatchUser'
import usePostAvatar from '../composables/images/usePostAvatar'

const props = defineProps(['user'])

const router = useRouter()
const store = useStore()

const user = ref(props.user)

const isPending = ref(false)


// Avatar Upload
const { error: avatarError, response: avatarResponse, uploadAvatar } = usePostAvatar()

const submitAvatar = async () => {
    isPending.value = true
    const formData = new FormData(event.target)
    await uploadAvatar(formData)
    isPending.value = false
}


// Patch User
const { patchError, patchResponse, patchPassword, patchUsername, patchAvatar } = usePatchUser()

const changeUsername = ref(false)
const changeAvatar = ref(false)
const changePassword = ref(false)

const submitUsername = async () => {
    patchError.value = null
    isPending.value = true
    if (user.value.newUsername === user.value.username) {
        patchError.value = 'New username is the same as your current username. Please enter a new username!'
    } else {
        if (confirm(`Do you really want to change your username to ${user.value.newUsername}?`)) { 
            await patchUsername(user.value.newUsername, user.value.password)
            if (!patchError.value) {
                store.commit('setUser', patchResponse.value.user)
                changeUsername.value = false
            }
        } 
    }
    user.value.newUsername = null
    user.value.password = null
    isPending.value = false
}

const submitPassword = async () => {
    patchError.value = null; isPending.value = true
    if (user.value.newPassword !== user.value.newPasswordCopy) {
        patchError.value = 'Passwords do not match!'
    } else if (user.value.oldPassword === user.value.newPassword) {
        patchError.value = 'New password is identical to your current password. Please change your new password!'
    } else {
        if (confirm('Do you really want to change your password?')) { 
            await patchPassword(user.value.newPassword, user.value.oldPassword)
            if (!patchError.value) changePassword.value = false                        
        }
    }
    user.value.oldPassword = null 
    user.value.newPassword = null
    user.value.newPasswordCopy = null
    isPending.value = false
}        

const selectAvatar = async () => {
    isPending.value = true
    if (confirm('Do you really want to update your avatar?')) {
        await patchAvatar(user.value.avatar)
    }
    isPending.value = false
}


// User Logout
const { error: logoutError, logoutUser, logoutUserAllDevices } = useLogoutUser()

const logout = async () => {
    if (confirm(`Do you really want to logout?`)) {
        logoutError.value = null
        await logoutUser()
        if (logoutError.value) return 
        store.dispatch('logoutUser')
        router.push({ name: 'Home' })
    }
}

const logoutAllDevices = async () => {
    if (confirm(`Do you really want to logout on all devices?`)) {
        logoutError.value = null
        await logoutUserAllDevices()
        if (logoutError.value) return 
        store.dispatch('logoutUserAllDevices')
        router.push({ name: 'Home'})
    }
}

</script>