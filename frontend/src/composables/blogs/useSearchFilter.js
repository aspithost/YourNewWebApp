export default (searchTags, blogTags) => {   
    const indexArray = searchTags.map(searchTag => {
        for (let i = 0; i < blogTags.length; i ++) {
            if (blogTags[i].includes(searchTag)) {
                return true
            } 
        }
    })
    return !indexArray.includes(undefined)
}