import { onMounted, ref } from 'vue'

import hljs from 'highlight.js/lib/core'

import CSS from 'highlight.js/lib/languages/css'
import handlebars from 'highlight.js/lib/languages/handlebars'
import javascript from 'highlight.js/lib/languages/javascript'
import JSON from 'highlight.js/lib/languages/json'
import NGINX from 'highlight.js/lib/languages/nginx'
import XML from 'highlight.js/lib/languages/xml'
import YAML from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('css', CSS)
hljs.registerLanguage('handlebars', handlebars)
hljs.registerLanguage('json', JSON)
hljs.registerLanguage('nginx', NGINX)
hljs.registerLanguage('yaml', YAML)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', XML)

import '/src/highlightjs.css'

export default () => {
    onMounted(() => {
        setTimeout (() => {
            if (document.querySelector('pre code') && !document.querySelector('pre code').classList.length) {
                hljs.highlightAll()
            }
        }, 200)
    })
}