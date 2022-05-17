export default {
    isLoggedIn: state => !!state.token,
    user_company: state => state.user_company,
    username: state => state.username
}