import authHeader from '../authheader'

export default {
    GET_ORDERS ({ state, commit }) {
        if (state.params.order_page == null) {
            return false
        }
        else {
            return new Promise((resolve, reject) => {
                this.$axios.get(`get_order_list/`, {
                    headers: authHeader(),
                    params: {
                        page: state.params.order_page,
                        user_company: localStorage.getItem("user_company"),
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            const retrivedData = response.data
                            commit('GET_ALL_ORDERS', retrivedData)
                            resolve(retrivedData);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        }
    },
    CREATE_SINGLE_ORDER({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`create_new_order/`, payload, {
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.status === 201) {
                        resolve(response)
                    }
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    GET_TRIPS ({ state, commit }) {
        if (state.params.trip_page == null) {
            return false
        }
        else {
            return new Promise((resolve, reject) => {
                this.$axios.get(`get_trip_list/`, {
                    headers: authHeader(),
                    params: {
                        page: state.params.trip_page,
                        user_company: localStorage.getItem("user_company")
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            const retrivedData = response.data
                            commit('GET_ALL_TRIPS', retrivedData)
                            resolve(retrivedData);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        }
    },
    GET_PROJECTS ({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`get_project_list/`, {
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.status === 200) {
                        const retrivedData = response.data
                        commit('GET_ALL_PROJECTS', retrivedData)
                        resolve(retrivedData);
                    }
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    GET_ORDER_DETAILS ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`get_order_details/?order_id=${payload}`, { headers: authHeader() })
                .then(({ data, status }) => {
                    if (status === 200) {
                        let retrivedData = data
                        retrivedData.type = "order"
                        commit('GET_SELECTED_ORDER_DETAILS', retrivedData)
                        resolve(retrivedData);
                    }
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    GET_TRIP_DETAILS ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`get_trip_details/?trip_id=${payload}`, { headers: authHeader() })
                .then(({ data, status }) => {
                    if (status === 200) {
                        let retrivedData = data
                        retrivedData.type = "trip"
                        commit('GET_SELECTED_TRIP_DETAILS', retrivedData)
                        resolve(retrivedData);
                    }
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
}