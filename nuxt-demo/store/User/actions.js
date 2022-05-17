export default {
    LOGIN({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('login/', payload)
                .then(res => {
                    if (process.browser) {
                        localStorage.setItem('user', JSON.stringify(res.data.token));
                        localStorage.setItem('user_company', res.data.user_company);
                        localStorage.setItem('username', res.data.username);
                    }
                    commit('AUTH_SUCCESS', res.data)
                    resolve(res)
                })
                .catch(err => {
                    commit('AUTH_ERROR')
                    reject(err);
                });
        });
    },
    LOGOUT({ commit }) {
        return new Promise((resolve, reject) => {
            commit('LOGOUT')
            if (process.browser) {
                localStorage.removeItem('user');
                localStorage.removeItem('user_company');
                localStorage.removeItem('username');
            }
            resolve()
                .catch(error => {
                    reject(error);
                })
        })

    },
}