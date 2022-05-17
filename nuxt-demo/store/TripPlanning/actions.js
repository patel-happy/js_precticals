import authHeader from '../authheader'

export default {
    GET_TEMPLATE_LIST({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('template/', { headers: authHeader(), })
                .then(res => {
                    console.log(res.data)
                    commit('TEMPLATE_LIST', res.data)
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    CREATE_TEMPLATE({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('template/', payload, { headers: authHeader() })
                .then(res => {
                    console.log(res)
                    commit('PUSH_TEMPLATE_CREATED', res.data)
                    resolve(res.data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error)
                })
        })
    },
    UPDATE_TEMPLATE({ commit }, payload) {
        console.log(payload);
        return new Promise((resolve, reject) => {
            this.$axios.put(`template_actions/${payload.id}/`, payload, { headers: authHeader() })
                .then(res => {
                    console.log(res)
                    commit("UPDATE_TEMPLATE", res.data)
                    resolve(res.data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error)
                })
        })
    },
    DELETE_TEMPLATE({ commit }, id) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`template_actions/${id}/`, { headers: authHeader() })
                .then(res => {
                    console.log(res)
                    commit("REMOVE_TEMPLATE", id);
                    resolve(res)
                })
                .catch(error => {
                    console.log(error);
                    reject(error)
                })
        })
    }
}