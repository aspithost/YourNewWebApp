import { axiosAuth, axiosAuthCredentials } from '/src/composables/axios'
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
            await axiosAuthCredentials.get('/users/getUser');  
            const accessToken = cookies.get('accessCookie');
            if (!accessToken) return
            dispatch('verifyUser', accessToken)
        } catch (err) {
            return err
        }
    },

    async generateAccessTokenServer ({ dispatch }, refreshToken) {
        try {
            const data = await axiosAuth.get('/users/getUserFirstRender',
                { headers: { Cookie: `refreshCookie=${refreshToken}` }}
            )
            const accessToken = data.data.accessToken
            if (!accessToken) return

            dispatch('verifyUser', accessToken)
            return accessToken
        } catch (err) {
            return err
        }
    },

    async verifyUser ({ commit, dispatch }, accessToken) {
        try {
            const user = jwt(accessToken)
            if (user && (user.exp - (Date.now() / 1000)) < 60) {
                await dispatch('generateAccessToken')             
            } 
            commit('setUser', user)
        } catch (err) {
            return
        }
    },


    incrementAPICall ({ commit }) {
        commit('addAPICall')
    },

    subtractAPICall ({ commit }) {
        commit('removeAPICall')
    },

    storeAxiosError ({ commit }, value) {
        commit('setAxiosError', value)
    },
    
    allowFunctionalCookies ({ commit }, value) {
        commit('acceptFunctionalCookies', value)
    },

    storeScreenSize ({ commit }, screenSize) {
        commit('setScreenSize', screenSize)
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