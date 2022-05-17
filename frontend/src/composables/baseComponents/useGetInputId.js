export default (label) => { 
    return label ? label.split(' ').join('-').toLowerCase() : null
}