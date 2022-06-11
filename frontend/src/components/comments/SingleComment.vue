<template>
    <li class="comment">
        <div class="pt-2 pb-3 px-2 text-gray-600">
            <p class="font-bold text-gray-800 pb-0"> {{ singleComment.username }} </p>
            <p class="italic font-light text-sm py-0"> {{ formattedDate }} </p>
            <p v-show="!edit" class="pt-2" > {{ singleComment.content }} </p>

            <div v-if="userId">

                <div v-show="edit" class="w-full sm:w-2/3">
                    <Textarea 
                        v-model="editedComment"
                        class="h-32 mb-1"
                        required
                    />
                </div>

                <span 
                    v-if="!singleComment.banned && userId === comment.userId || userRights === 3"
                    :class="{ '[border-right-width:1px] pr-1 mr-1' : !showReply }"
                >
                    <ButtonAlt
                        v-show="!showReply"
                        @click="edit = !edit; error = null"
                        :toggled="edit"
                        label="Edit Comment"
                    />
                </span>
                <span v-show="edit">
                    <ButtonAlt
                        @click="updateComment"  
                        :toggled="isPending"
                        label="Save Changes"   
                        type="submit"
                    />
                </span>
                <span
                    v-show="!edit"
                >
                    <ButtonAlt
                        @click="showReply = !showReply"
                        label="Reply"
                        :toggled="showReply"
                    />
                </span>

                <p v-show="error" class="font-bold my-2">{{ error }}</p>

                <span v-if="userRights === 3"> 
                    <Button
                        @click="setTranquilo"
                        label="tranquilo"
                        type="submit"
                    />
                    <Button
                        @click="deleteCommentEntry"
                        :toggled="isPending"
                        label="Delete"
                        type="submit"
                    />
                </span>
                <PostComment 
                    v-if="showReply" 
                    :commentId="comment._id" 
                    @updateCounter="onUpdateCounter" 
                />
            </div>
        </div>
        <ul v-if="comment.replies.length" class="replies ml-4 sm:ml-6 lg:ml-8 ">
            <SingleComment 
                v-for="comment in comment.replies" 
                :comment="comment"
                @updateCounter="onUpdateCounter"
            />
        </ul>
    </li>
</template>

<script setup>
import { defineAsyncComponent, inject, ref } from 'vue'

import useGetBlogDate from '/src/composables/blogs/useGetBlogDate'
import useDeleteComment from '/src/composables/comments/useDeleteComment'
import usePatchComment from '/src/composables/comments/usePatchComment'

const PostComment = defineAsyncComponent(() => import('../comments/PostComment.vue'))

const { formattedDate, findDate } = useGetBlogDate()
const { deleteComment } = useDeleteComment()
const { patchResponse, patchComment } = usePatchComment()

const { userId, userRights } = inject('user')

const props = defineProps(['comment'])
const emit = defineEmits(['updateCounter'])

const edit = ref(false)
const editedComment = ref(props.comment.content)
const error = ref(false)
const isPending = ref(false)
const showReply = ref(false)
const singleComment = ref(props.comment)

findDate(props.comment.createdAt)

const onUpdateCounter = () => {
    emit('updateCounter')
    showReply.value = false
}

const updateComment = async (event) => {
    error.value = null; isPending.value = true
    if (userRights !== 3 && userId !== singleComment.value.userId) {
        error.value = 'You may not edit this comment'
    } else if (singleComment.value.content === editedComment.value) {
        error.value = 'You didn\'t make any changes!'
    } else {
        if (confirm('Do you really want to edit this comment?')) {
            await patchComment(singleComment.value._id, editedComment.value)
            singleComment.value = patchResponse.value
            edit.value = false
        }
    } 
    isPending.value = false
} 

const setTranquilo = async () => {
    error.value = null; isPending.value = null
    editedComment.value = '- tranquilo -'
    if (confirm('Do you really want to tranquilo this comment?')) {
        await patchComment(singleComment.value._id, editedComment.value, true)   
        singleComment.value = patchResponse.value
        edit.value = false         
    }
    isPending.value = false
}

const deleteCommentEntry = async () => {
    isPending.value = true
    if (userRights !== 3) {
        return
    } else {
        if (confirm('Do you really want to delete this comment?')) {
            await deleteComment(singleComment.value._id)
            emit('updateCounter')
        } 
    } 
    isPending.value = false
}

</script>