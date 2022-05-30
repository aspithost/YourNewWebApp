import { createStore as _createStore } from 'vuex'
import { actions } from './actions'
import { mutations } from './mutations'

const state = () => {
    return {
        acceptFunctionalCookies: false,
        languageDutch: false,
    }
}

export default function createStore () {
    return _createStore ({
        actions,
        mutations,
        state
    })
}