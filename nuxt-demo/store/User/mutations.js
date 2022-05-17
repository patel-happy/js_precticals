export default {
    AUTH_SUCCESS(state, data) {
        state.status = 'success'
        state.token = data.token
        state.user_company = data.user_company
        state.username = data.username
    },
    AUTH_ERROR(state) {
        state.status = 'error'
        state.authenticated = false
    },
    LOGOUT(state) {
        state.status = ''
        state.token = ''
        state.user_company = ''
        state.authenticated = false
    },
}