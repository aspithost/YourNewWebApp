export default () => {
    const editHTML = (content, type, start, end) => {
        if (type.match(/(bold)|(italic)|(^code$)|(link)/g)) {
            content = insertHTML(content, type, start, end)
        } else {
            content = addHTML(content, type, start)
        }
        
        return content
    }
    return { editHTML }
}

const insertHTML = (content, type, start, end) => {
    if (start >= end) {
        end = start
    }
    if (!content) content = ''
    return content = 
        content.substr(0, start) 
        + insertType[type].insert1
        + content.substr(start, (end - start)) 
        + insertType[type].insert2
        + content.substr(end)     
}

const addHTML = (content, type, position) => {
    if (!content) content = ''
    if (position === 0 && content.length) {
        return addType[type] + content
    } else {
        return content = 
            content.substr(0, position) 
            + addType[type]
            + content.substr(position)   
    }
}    

const addType = {
    card: '<div class="getEmbeddedBlog" id=""></div>',    
    fbembed: '<div class="w-[160px] sm:px-6 py-2"><div class="fb-post" data-lazy="true" data-href=""></div></div>',
    gramembed: '<div class="flex justify-center m-auto pt-2"></div>', 
    image: '<figure class="my-2"><img loading="lazy" src="" alt=""><figcaption></figcaption></figure>',
    ol: '<ol class="list-decimal list-inside space-y-1 marker:font-semibold"></ol>',
    codeblock: '<pre v-if="highlightCode" class="codeblock my-2"><code></code></pre>',
    quote: '<figure class="bg-ynwa bg-opacity-20 rounded-lg px-6 py-2 my-2"><blockquote class="italic font-serif"><p>“ TEXT ”</p></blockquote><figcaption><strong class="text-ynwa"> QUOTE NAAM </strong>,<cite><a href="" target="_blank" class="hover:opacity-70"> QUOTE BRON </a>.</cite></figcaption></figure>',
    quotepic: '<figure class="bg-ynwa bg-opacity-20 rounded-lg px-4 py-2 my-2"><blockquote class="italic font-serif"><p>“ TEXT ”</p></blockquote><div class="flex items-center space-x-3"><img src="" alt="" class="flex-none rounded-full object-cover h-10 w-10 sm:h-12 sm:w-12" width="40" height="40" loading="lazy"><figcaption><div class="font-semibold text-ynwa leading-5">CAPTION ONE</div><div class="text-gray-600 text-sm sm:text-base font-light leading-5">CAPTION TWO</div></figcaption></div></figure>',
    twtembed: '<div class="flex justify-center m-auto max-w-xs sm:max-w-xl md:max-w-full"></div>',
    ul: '<ul class="list-disc list-inside space-y-1 marker:text-ynwa"></ul>',
    ytembed: '<div class="youtube-embed" data-href="https://www.youtube-nocookie.com/embed/" data-title=""></div>'
} 

const insertType = {
    bold: {
        insert1: '<b>',
        insert2: '</b>'
    }, 
    italic: {
        insert1: '<i>',
        insert2: '</i>'
    },
    code: {
        insert1: '<code class="code-single-line">',
        insert2: '</code>'
    },
    link: {
        insert1: '<a href="" hreflang="en" target="_blank" rel="noopener" class="link">',
        insert2: '</a>'
    },
    linknl: {
        insert1: '<a href="" hreflang="nl" target="_blank" rel="noopener" class="link">',
        insert2: '</a>'
    }
}