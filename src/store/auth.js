import { TOKEN_KEY, ROLE, USER_ID } from '@/store/cacheConstants'

export const getToken = localStorage.getItem(TOKEN_KEY) || undefined
const getRole = localStorage.getItem(ROLE) || undefined
const getUserId = localStorage.getItem(USER_ID) || undefined

export const auth = {
    state: () => ({
        token: getToken,
        role: getRole,
        userId: getUserId,
    }),
    mutations: {
        storeRole(state, data) {
            state.role = data
            localStorage.setItem(ROLE, data)
        },
        dropRole(state) {
            state.role = undefined
            localStorage.removeItem(ROLE)
        },
        storeToken(state, data) {
            state.token = data
            localStorage.setItem(TOKEN_KEY, data)
        },
        dropToken(state) {
            state.token = undefined
            localStorage.removeItem(TOKEN_KEY)
        },
        storeUserId(state, data) {
            state.userId = data
            localStorage.setItem(USER_ID, data)
        },
        dropUserId(state) {
            state.userId = undefined
            localStorage.removeItem(USER_ID)
        },

    },
    getters: {
        role(state) {
            return state.role
        },
        token(state) {
            return state.token
        },
        userId(state) {
            return state.userId
        },
    },
    actions: {
        login({ commit }, data) {
            console.log(data.token)
            commit('storeToken', data.token)
            //commit('storeRole', data.roles)
            //commit('storeUserId', data.user_id)
        },

        logout({ commit }) {
            commit('dropToken')
            //commit('dropRole')
            //commit('dropUserId')
        }
    }
}