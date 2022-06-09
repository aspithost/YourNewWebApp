export default () => {
    const editHTML = (content, type, start, end) => {
        if (type.match(/(strong)|(italic)|(^code$)|(link)/g)) {
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
    card: '<div class="embedded-blog" id=""></div>',    
    fbembed: '<div class="fb-embed"><div class="fb-post" data-lazy="true" data-href=""></div></div>',
    gramembed: '<div class="ig-embed"></div>', 
    image: '<figure><img loading="lazy" src="" alt=""><figcaption></figcaption></figure>',
    ol: '<ol></ol>',
    codeblock: '<pre v-if="highlightCode" class="codeblock"><code></code></pre>',
    quote: '<figure class="quote-base"><blockquote><p>“ TEXT ”</p></blockquote><figcaption><strong> QUOTE NAAM </strong>,<cite><a href="" target="_blank"> QUOTE BRON </a>.</cite></figcaption></figure>',
    quotepic: '<figure class="quote-pic"><blockquote><p>“ TEXT ”</p></blockquote><div><img src="" alt="" width="40" height="40" loading="lazy"><figcaption><div>CAPTION ONE</div><div>CAPTION TWO</div></figcaption></div></figure>',
    twtembed: '<div class="twt-embed"></div>',
    ul: '<ul></ul>',
    ytembed: '<div class="yt-embed" data-href="https://www.youtube-nocookie.com/embed/" data-title=""></div>'
} 

const insertType = {
    strong: {
        insert1: '<strong>',
        insert2: '</strong>'
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