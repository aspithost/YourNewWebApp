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

    setscreenWidth (state, screenWidth) {
        state.screenWidth = screenWidth
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