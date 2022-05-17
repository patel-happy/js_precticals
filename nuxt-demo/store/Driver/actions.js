import authHeader from '../authheader'

export default {
    GET_ALL_DRIVERS ({ state, commit }) {
        if (state.params.drivers_page == null) {
            return false
        }
        else {
            return new Promise((resolve, reject) => {
                this.$axios.get(`get_driver_list/`, {
                    headers: authHeader(),
                    params: {
                        page: state.params.drivers_page,
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            const retrivedData = response.data
                            commit('GET_ALL_DRIVERS', retrivedData)
                            resolve(retrivedData);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        }
    },
}