import useCreateNoSocialsWrapper from './useCreateNoSocialsWrapper'

const createScript = (widgetName, href) => {
    const embed = document.createElement('script')
    embed.setAttribute('id', widgetName)
    embed.setAttribute('src', href)
    document.body.append(embed)
}

const setWrapperLoop = (query) => {
    const noSocialsWrapper = useCreateNoSocialsWrapper()
    let frames = document.querySelectorAll(query)
    frames.forEach(frame => {
        frame.parentNode.insertBefore(noSocialsWrapper, frame)
        frame.remove()
    })
} 

export default () => {
    let socialMediaScripts
    if (localStorage.socialMediaCookies) socialMediaScripts= JSON.parse(localStorage.socialMediaCookies)

    if (!socialMediaScripts) return

    // Facebook
    if (!socialMediaScripts.facebook) {
        if (document.querySelector('.fb-post')) {
            setWrapperLoop('.fb-post')
        }
    } else {
        if (window.FB) {
            window.FB.XFBML.parse(document.querySelector('.blog-content'))
        } else if (document.querySelector('.fb-post')) {   
            createScript('fb-script', 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2')
        }
    }    


    // Instagram
    if (!socialMediaScripts.instagram) {
        if (document.querySelector('.instagram-media')) {
            setWrapperLoop('.instagram-media')
        }
    } else {
        if (window.instgrm) {
            window.instgrm.Embeds.process(document.querySelector('.blog-content'))
        } else if (!document.getElementById('instagram-embed-0') && document.querySelector('.instagram-media')) {
            createScript('instagram-script', 'https://www.instagram.com/embed.js')
        } 
    }       


    // Twitter
    if (!socialMediaScripts.twitter) {
        if (document.querySelector('.twitter-tweet')) {
            setWrapperLoop('.twitter-tweet')
        }
    } else {
        if (window.twttr) {
            window.twttr.widgets.load(document.querySelector('.blog-content'))
        } else if (document.querySelector('.twitter-tweet')) {
            createScript('twitter-script', 'https://platform.twitter.com/widgets.js')
        }
    }


    // YouTube
    if (!socialMediaScripts.youTube) {
        if (document.querySelector('.yt-embed')) {
            setWrapperLoop('.yt-embed')
        }
    } else {
        if (document.querySelector('.yt-embed')) {
            const youtubeEmbeds = document.querySelectorAll('.yt-embed')
            youtubeEmbeds.forEach(youtubeEmbed => {
                if (!youtubeEmbed.dataset.href) {
                    youtubeEmbed.remove()
                }
                const iframe = document.createElement('iframe')
                iframe.async = true
                iframe.allowfullscreen = true
                iframe.loading = "lazy"
                iframe.classList.add('w-full', 'aspect-video', 'my-2')
                iframe.src = youtubeEmbed.dataset.href
                iframe.title = youtubeEmbed.dataset.title          
                youtubeEmbed.parentNode.replaceChild(iframe, youtubeEmbed)
            })
        }
    }
}