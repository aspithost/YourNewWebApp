<template>
    <div class="flex flex-wrap">
        <Button 
            v-for="buttonText in buttons"
            @click.prevent="insertHTML(buttonText.replace(/\s/g, '').toLowerCase())"
            class="grow"
        >                
            {{ buttonText }}
        </Button>
    </div>
</template>

<script setup>
import useEditBlogHTML from '/src/composables/blogs/useEditBlogHTML'
import useGetSelectedText from '/src/composables/blogs/useGetSelectedText'  

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const buttons = [
    'Strong', 
    'Italic',
    'Code', 
    'Code Block', 
    'Quote',
    'Quotepic',
    'Link', 
    'Link NL', 
    'Ol',
    'Ul',
    'Image',
    'FB Embed', 
    'Gram Embed',
    'Twt Embed', 
    'YT Embed', 
    'Card', 
]

const { start, end } = useGetSelectedText()

const insertHTML = (type) => {
    let val = useEditBlogHTML(props.modelValue, type, start.value, end.value)
    emit('update:modelValue', val)
}

</script>

