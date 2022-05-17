const wrap = (frame, wrapper) => {
    frame.parentNode.insertBefore(wrapper, frame)
    wrapper.append(frame)
}

export default () => {
    // Image wrapper voor blogcontent
    if (document.querySelector('.blogContent img')) {
        let images = document.querySelectorAll('.blogContent img')
        for (let i = 0; i < images.length; i++) {
            let wrapper = document.createElement('figure')
            wrapper.classList.add('flex', 'md:mx-4', 'justify-center')
            wrap(image[i], wrapper)
        }
    }
}