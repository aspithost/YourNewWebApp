export const mutations = {

    setUser (state, user) {
        state.user = user
    },

    acceptFunctionalCookies(state, value) {
        state.acceptFunctionalCookies = value
    },

    setLanguageDutch (state, languageDutch) {
        state.languageDutch = languageDutch
    },

    setScreenSize (state, screenSize) {
        state.screenSize = screenSize
    },

    setShowBlogsTraditional (state, value) {
        state.showBlogsTraditional = value
    },
    
    setAxiosError (state, value) {
        state.axiosError = value
    },

    logoutUser (state) {
        state.user = null
        state.response = null
    }
}