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

    addAPICall (state) {
        state.APICalls += 1
    },

    removeAPICall (state) {
        state.APICalls -= 1
    },
    
    setAxiosError (state, value) {
        state.axiosError = value
    },

    logoutUser (state) {
        state.user = null
        state.response = null
    }
}