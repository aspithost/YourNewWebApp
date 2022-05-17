<template>
    <PostComment 
        v-if="userId" 
        @updateCounter="loadComments(blogId)" 
    />
    <div v-else>
        <p class="py-1"><span class="py-1 block">You have to be <router-link class="underline bold" :to="{ name: 'Login' }">logged in</router-link>
            to comment.</span>
            <span class="py-1 block">Haven't registered yet? It's very easy! All we'll need is a valid email address 
            to verify your account. You can sign up 
            <router-link class="underline bold" :to="{ name: 'Join'}">here</router-link>. And don't worry, we will not use your email
            address for anything else. We just want to keep bots out.</span>
        </p>
    </div>
    <ul v-if="comments.length" class="mt-6">
        <SingleComment 
            v-for="comment in comments" 
            :comment="comment"  
            class="border-t border-gray-200"
            @updateCounter="loadComments(blogId)"
        />
    </ul>
</template>

<script setup>
import { inject } from 'vue'

import PostComment from './PostComment.vue'
import SingleComment from './SingleComment.vue'

import useGetComments from '/src/composables/comments/useGetComments'

const blogId = inject('blogId')
const { userId } = inject('user')

const { comments, loadComments } = useGetComments()

loadComments(blogId.value)

</script>