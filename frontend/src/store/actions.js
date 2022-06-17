import { axiosUserCredentials } from '/src/composables/axios'
import cookies from 'js-cookie'
import jwt from 'jwt-decode'

export const actions = {

    getAccessToken ({ dispatch }) {
        const accessToken = cookies.get('accessCookie')
        if (!accessToken) {
            dispatch('generateAccessToken')
        } else {
            dispatch('verifyUser', accessToken)
        }          
    },

    async generateAccessToken ({ dispatch }) {
        try {
            await axiosUserCredentials.post('/user/autoLogin') 
            const accessToken = cookies.get('accessCookie')
            if (!accessToken) return
            dispatch('verifyUser', accessToken)
        } catch (err) {
            return err
        }
    },

    async verifyUser ({ commit, dispatch }, accessToken) {
        try {
            const user = jwt(accessToken)
            if (!user) return
            if (user && (user.exp - (Date.now() / 1000)) < 60) {
                await dispatch('generateAccessToken')             
            } 
            commit('setUser', user)
        } catch (err) {
            return
        }
    },


    storeAxiosError ({ commit }, value) {
        commit('setAxiosError', value)
    },
    
    allowFunctionalCookies ({ commit }, value) {
        commit('acceptFunctionalCookies', value)
    },

    storescreenWidth ({ commit }, screenWidth) {
        commit('setscreenWidth', screenWidth)
    },

    storeLanguageDutch ({ commit }, languageDutch) {
        commit('setLanguageDutch', JSON.parse(languageDutch))
    },

    showBlogsTraditional ({ commit }, value) {
        commit('setShowBlogsTraditional', value)
    },


    logoutUser ({ commit }) {
        commit('logoutUser')
    },

    logoutUserAllDevices ({ commit }) {
        commit('logoutUser')
    },
}