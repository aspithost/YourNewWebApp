<template>
    <div class="ynwacomp"> 
        <h2 v-if="blog" class="h2-narrow"> Edit Blog </h2>
        <h2 v-else class="h2-narrow"> Create Blog </h2>   

        <!-- Image Upload -->
        <form 
            v-for="upload in [
                'Upload Image ', 
                'Upload Image Full Quality',
                'Upload Image No Crop', 
                'Upload Image Small', 
                'Upload Thumbnail', 
                'Upload Twitter Thumbnail'
            ]" 
            @submit.prevent="submitImage(upload)"
            enctype="multipart/form-data"
        >
            <FileInput
                :label="upload"
                name="imageUpload"
            />
            <Button 
                :toggled="isPending"
                label="Upload Image"
                type="submit"
            />
        </form>

        <p v-if="imageResponse"> {{ imageResponse }} </p>
        <p v-if="imageError"> {{ imageError }} </p>

        <!-- Blog Form -->

        <form @submit.prevent="submitBlog">
            <FileInput 
                v-model="blog.image"
                label="Select Image"
            />  
            <FileInput 
                v-model="blog.imageSmall"
                label="Select Image Small"
            />  
            <FileInput 
                v-model="blog.thumbnail"
                label="Select Thumbnail"
            />  
            <FileInput 
                v-model="blog.twitterThumbnail"
                label="Select Twitter Thumbnail"
            />  

            <div class="flex flex-col">

                <FormInput
                    v-model="blog.imageAttribution"
                    type="text"
                    label="Image Credits"               
                /> 
                <FormInput
                    v-model="blog.title"
                    type="text"
                    label="Title"
                    required
                /> 

                <label v-if="blog.author" class="flex flex-col w-full" > Author: {{ blog.author.username }}</label>

                <FormInput @change="updateSlug" @keyup="updateSlug"
                    v-model="slug"
                    type="text"
                    label="Slug"       
                />
                <div v-show="blog.slug" class="py-1">
                    <span v-for="slug in blog.slug" @click="deleteSlug(slug)" class="tag">
                        {{ slug }}
                    </span>
                </div>

                <FormInput @keyup="updateTags" @change="updateTags"
                    v-model="tag"
                    type="text"
                    label="Tags"
                />
                <div v-show="blog.tags" class="py-1">
                    <span v-for="tag in blog.tags" @click="deleteTag(tag)" class="tag">
                        {{ tag }} 
                    </span>
                </div>

                <RadioGroup 
                    v-model="blog.language"
                    name="language"
                    :labels="['English', 'Nederlands']" 
                />

                <div v-if="mounted">
                    <!-- Buttons to insert links & other HTML -->
                    <EditButtons
                        v-model="blog.content"
                        class="py-2"
                    />

                    <Textarea  
                        v-model="blog.content" 
                        label="Content"
                        class="h-96"
                        required
                    />

                    <Button 
                        @click="preview = !preview"  
                        label="Show Preview"  
                        type="button"
                    />
                    
                    <div v-show="preview" v-html="blog.content" class="blog-content px-4 py-2 my-2 border text-default h-96 overflow-auto"></div>
                </div>

            </div>

            <SelectInput 
                v-model="blog.featured"
                label="Featured"
                :options="['None', ...Array.from(Array(17).keys()).slice(1)]"
            /> 
                
            <CheckboxInput 
                v-model="blog.disableComments"
                label="Disable Comments"     
            />
            
            <DateInput 
                v-model="blog.publishDate"
                label="Publish Date"
            />

            <span class="flex w-full">
                <Button
                    v-show="blog.isPublished" 
                    :toggled="isPending"
                    label="Take Blog Offline"      
                    type="submit"
                />   
                <Button
                    :toggled="isPending"
                    label="Save Blog"      
                    type="submit"
                />     
                <Button
                    v-show="!blog.isPublished"
                    :toggled="isPending"
                    label="Schedule Blog"     
                    type="submit"
                />
                <Button 
                    :toggled="isPending"
                    label="Publish Blog"
                    type="submit"
                />   
            </span>
            <p v-show="isPending"> Loading...</p>
            <p v-show="error" class="font-bold"> {{ error }} </p>
        </form>

        <!-- Get Blog Backup -->
        <Button 
            @click="getBackup"
            label="Get Backup Blog Data"
            type="submit"
        />

        <!-- Delete Blog -->
        <Button
            v-show="blog"
            @click="deleteBlog"
            :toggled="isPending"
            label="Delete Blog"      
            type="submit"
        />
    </div>
    <div v-if="deleteResponse"> {{ deleteResponse }} </div>
</template>

<script setup>
import { onUnmounted, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

import EditButtons from '/src/components/blogs/EditButtons.vue'

import useDeleteBlog from '/src/composables/blogs/useDeleteBlog'
import useEscapeCodeBlock from '/src/composables/blogs/useEscapeCodeBlock'
import usePostBlog from '/src/composables/blogs/usePostBlog'
import useSetDate from '/src/composables/blogs/useSetDate'

import usePostImage from '/src/composables/images/usePostImage'

const props = defineProps(['blog', 'user'])

const router = useRouter()

const isPending = ref(false)
const preview = ref(false)

// Edit blog or new blog
const blog = ref(props.blog ? JSON.parse(props.blog): {})

if (props.blog) {
    blog.value.publishDate = useSetDate(blog.value.publishDate)
    blog.value.slug = blog.value.slug.split('-')
    blog.value.tags = blog.value.tags.toString().split(',')
}

// Image Upload
const { error: imageError, response: imageResponse, uploadImage } = usePostImage()

const submitImage = async (type) => {
    isPending.value = true
    const formData = new FormData(event.target)
    formData.append('type', type.replace(/\s/g, ''))
    await uploadImage(formData, event.submitter.innerHTML.trim())
    isPending.value = false
}

// Textarea onmounted hook 
const mounted = ref(false)
onMounted(() => mounted.value = true)


// Submit Blog
const { error, response, postBlog } = usePostBlog()

const submitBlog = async () => {
    if (!blog.value.slug || !blog.value.tags) {
        return error.value = 'Vul wel slug en tags in!'
    }
    error.value = null
    if (confirm(`Are you sure you want to ${event.target.name}?`)) {
        try {
            isPending.value = true
            blog.value.slug = blog.value.slug.join('-')

            if (blog.value.featured === 'None') blog.value.featured = 0
            if (!blog.value.user) blog.value.user = props.user.userId     

            // Sanitize codeblock entries
            if (blog.value.content.match(/<pre\s{1,}v-if="highlightCode"/)) {
                blog.value.content = useEscapeCodeBlock(blog.value.content)
            }

            // If no props.blog, the blog is new. If there is, it's an edit
            await postBlog(event, blog.value, props.blog ? false : true)

            localStorage.removeItem(`blog${blog.value.id}`)

            router.push({ name: 'SingleBlogDetails', 
                params: { 
                    id: response.value.blog.id, 
                    slug: response.value.blog.slug, 
                    successMessage: response.value.message }
            }) 
        } catch (err) {
            blog.value.slug = blog.value.slug.split('-')
        }
        isPending.value = false
    } 
}


// Slug
const slug = ref(null)

const updateSlug = () => {
    if ((event.code === 'Space' || event.type === 'change') && slug.value?.match(/\w/)) {
        blog.value.slug = blog.value.slug ? blog.value.slug : []
        blog.value.slug.push(slug.value.toLowerCase().trim())
        slug.value = null        
    }
}

const deleteSlug = (slug) => {
    blog.value.slug = blog.value.slug.filter(item => {
        return slug !== item
    })
}


// Tag
const tag = ref(null)

const updateTags = () => {
    if ((event.code === 'Space' || event.type === 'change') && tag.value?.match(/\w/)) {
        tag.value = tag.value.toLowerCase().trim()
        blog.value.tags = blog.value.tags ? blog.value.tags : []
        if (!blog.value.tags.includes(tag.value)) {
            blog.value.tags.push(tag.value)
        }
        tag.value = null
    }
}

const deleteTag = (tag) => {
    blog.value.tags = blog.value.tags.filter(item => {
        return tag !== item
    })
}


// Delete Blog
const { deleteBlog: _deleteBlog, deleteResponse } = useDeleteBlog()

const deleteBlog = async () => {
    isPending.value = true
    if (props.user.rights !== 3) {
        error.value = 'Dit mag jij niet doen vriend'
    } else {
        if (confirm('Do you really want to delete this blog?')) { 
            await _deleteBlog(blog.value.id)
            blog.value = {}
        } 
    }
    isPending.value = false
}

// Blog backup in localstorage
const blogBackupInterval = ref(null)

const getBackup = () => {
    blog.value.content = localStorage.getItem(`blog${blog.value.id}`)
}

onMounted (() => {    
    blogBackupInterval.value = setInterval (() => {
        if (!blog.value.id) return
        localStorage.setItem(`blog${blog.value.id}`, blog.value.content)
    }, 30000)
})

onUnmounted (() => {
    clearInterval(blogBackupInterval.value)
})


// Route Leave Save Changes
onBeforeRouteLeave ((to, from, next) => {
    if (event.type === 'readystatechange' || event.type === 'loadend') {
        return next()
    } else {    
        const answer = confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
            next()
        } else {
            next(false)
        }
    }
}) 

</script>