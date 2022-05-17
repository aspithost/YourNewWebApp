export default (date) => {

    let UTCDate = Date.parse(date).valueOf()
    let timezoneOffset = new Date().getTimezoneOffset() * 60000

    let localDate = UTCDate - timezoneOffset 
    
    return new Date(localDate)
        .toISOString()
        .substring(0,16)
}