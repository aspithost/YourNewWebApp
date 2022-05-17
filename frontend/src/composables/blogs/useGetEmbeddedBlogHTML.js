export default (blogServer, embeddedBlog, frame) => {
        
    frame.classList.add('border', 'border-gray-300', 'my-2')

    let link = document.createElement('a')
        link.setAttribute('href', `https://yournewwebapp.com/blogs/${embeddedBlog.id}/${embeddedBlog.slug}`)
        link.setAttribute('hreflang', `${(embeddedBlog.language = 'English') ? 'en' : 'nl'}`)
        link.setAttribute('rel', 'noopener')
        link.setAttribute('target', '_blank')
        link.classList.add('grid', 'grid-cols-8')

    let image = document.createElement('img')
        image.setAttribute('src', `${blogServer}/fissafotos/${embeddedBlog.thumbnail}`)
        image.setAttribute('onerror', "this.src='/barney720x540.png'")
        image.setAttribute('alt', `${embeddedBlog.title}`)
        image.classList.add('col-start-1', 'col-span-2',
            'flex-grow', 'object-scale-down', 'xl:object-contain', 'self-center')

    let title = document.createElement('h2')
        title.classList.add('font-semibold', 'text-gray-800', 'hover:text-yournewwebapp', 'leading-4', 
            'sm:leading-5', 'sm:font-bold', 'text-sm', 'sm:text-base')
        title.innerText = embeddedBlog.title

    let snippetStart = embeddedBlog.content.substr(embeddedBlog.content.indexOf('<p>'))
    let snippetEnd = snippetStart.indexOf(' ', 135) 
    
    let description = document.createElement('p')
        description.classList.add('hover:opacity-60', 'text-xs', 'sm:text-sm', 'md:text-xs', 'lg:text-sm')
        description.innerText = snippetStart.substr(3, (snippetEnd - 3))

    let descriptionParent = document.createElement('div')
        descriptionParent.classList.add('hidden', 'sm:contents')
        descriptionParent.append(description)

    let yournewwebapp = document.createElement('span')
        yournewwebapp.classList.add('pr-1', 'border-r', 'border-gray-500', 'sm:pr-1.5', 'xl:pr-2.5')
        yournewwebapp.innerText = 'yournewwebapp'

    let author = document.createElement('span')
        author.classList.add('px-1', 'border-r', 'border-gray-500', 'sm:px-1.5', 'xl:px-2.5')
        author.innerText = embeddedBlog.author.username

    let date = document.createElement('span')
        date.classList.add('pl-1', 'sm:pl-1.5', 'xl:pl-2.5')
        date.innerText = new Date(embeddedBlog.createdAt).toString().split(' ').splice(1,2).join(' ')
    
    let footerDiv = document.createElement('div')
        footerDiv.classList.add('text-xs', 'text-gray-600')
        footerDiv.append(yournewwebapp, author, date)

    let rightDiv = document.createElement('div')
        rightDiv.classList.add('col-start-3', 'col-span-6', 'flex', 'flex-col', 'justify-between', 'mx-3', 'py-1')
        rightDiv.append(title, descriptionParent, footerDiv)        

    frame.append(link)
    frame.firstChild.append(image, rightDiv)
}