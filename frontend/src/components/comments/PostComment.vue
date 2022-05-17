<template>
    <form v-if="!postResponse" @submit.prevent="submitComment" class="w-full sm:w-2/3">
        <Textarea 
            v-model="commentContent" 
            class="h-32 mb-1" 
            placeholder="Leave a comment!" 
            required
        />
        <Button 
            label="Post Comment"
            :toggled="isPending"
            type="submit"
        />
        <p v-if="postError" class="my-2 font-bold"> {{ postError }} </p>
        <p v-if="postResponse" class="my-2 font-bold">Thanks for sharing!</p>
    </form>
</template>

<script setup>
import { inject, ref } from 'vue'

import usePostComment from '/src/composables/comments/usePostComment'
import useSanitizeHTML from '/src/composables/useSanitizeHTML'

const blogId = inject('blogId')
const { userId, username } = inject('user')

const props = defineProps(['commentId'])

const emit = defineEmits(['updateCounter'])

const commentContent = ref(null)
const isPending = ref(false)
const { postError, postResponse, postComment } = usePostComment()

const submitComment = async () => {
    isPending.value = true
    
    const comment = {
        blogId: blogId.value,
        content: useSanitizeHTML(commentContent.value),
        userId,
        username
    }
    if (props.commentId) {
        comment.commentId = props.commentId
    }
    await postComment(comment)
    if (postResponse.value) {
        if (postError.value) postError.value = null
        emit('updateCounter')
    } else {
        postError.value = 'Something wrent wrong when posting your comment, please try again.'
        commentContent.value = null
    }
    isPending.value = false
}

</script>