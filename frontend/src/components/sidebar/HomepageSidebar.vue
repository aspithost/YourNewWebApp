<template>
    <div class="leading-7 bg-white border-gray-200 rounded-md shadow-md mb-2 p-4 lg:pt-6 lg:px-8">
        <div v-if="!user">
            <h2 class="h2-narrow">
                Sign Up Now!
            </h2>
            <p>
                Want to join the discussion? Sign up for free!
            </p>
            <router-link :to="{ name: 'Join' }">
                <Button 
                    label="Register Now!"
                    class="my-2"
                />
            </router-link>
            <p>
                Once registered, you'll be able to comment on any of the blogs.
            </p>
            <p class="text-sm">
                <strong>Don't worry</strong>: I will not send you spammy e-mails whatsoever.
            </p>
        </div>
        <div v-else>
            <h2 class="h2-narrow">Welcome back!</h2>
            <p>
                I appreciate returning users, and I'd love to hear from you!
            </p>
            <p>Any questions? Suggestions? Requests for guides? Let me know in the
                <router-link :to="{ name: 'Blogs' }" class="link">comments</router-link>!
            </p>
            <p>
                Prefer other forms of communication? Get <router-link :to="{ name: 'Contact'}" class="link">in touch</router-link>!
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed (() => store.state.user)
</script>