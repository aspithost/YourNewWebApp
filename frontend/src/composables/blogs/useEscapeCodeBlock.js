const escapeCodeBlock = (content, pos) => {

    const posStart = content.indexOf('<code>', pos) + 6
    const posEnd = content.indexOf('</code>', posStart)
    
    const start = content.substr(0, posStart)
    const end = content.substr(posEnd)

    content = 
        start 
        + content.substr(posStart, posEnd - posStart)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')  
        + end

    if (content.indexOf('<code>', posEnd) > -1) {
        return escapeCodeBlock(content, posEnd)
    } 

    return content
}

export default (content) => {
    return escapeCodeBlock(content)
}