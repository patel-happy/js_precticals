export default {
    GET_ALL_DRIVERS(state, payload) {
        if (payload.results) {
            payload.results.forEach(element => {
                state.drivers.push(element);
            });
            state.params.drivers_page = payload.next
        }
        else {
            payload.forEach(element => {
                state.drivers.push(element);
            });
        }
    },
}