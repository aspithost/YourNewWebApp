export default () => {

    const noSocialsDiv = document.createElement('div')
    noSocialsDiv.classList.add( 'no-socials-div', 'py-3', 'px-4', 'mb-2', 'bg-gray-300', 'rounded', 'font-bold', 'text-sm')

    let noSocialsContent = document.createTextNode('If you see this message you\'re missing out on Social Media embeds. Please go to your Cookie Settings. If you have already hit accept, simply refresh the page!')
    let brk = document.createElement('BR')
    let btn = document.createElement('BUTTON')

    btn.innerText = 'Cookie Settings.'
    btn.classList.add('bg-white', 'text-ynwa', 'mt-2', 'border', 'border-ynwa', 'rounded', 'font-bold', 'py-1', 'px-3', 'hover:border-white', 'hover:text-white', 'hover:bg-ynwa', 'focus:outline-none', 'cursor-pointer') 

    noSocialsDiv.append(noSocialsContent, brk, btn)

    return { noSocialsDiv }
}