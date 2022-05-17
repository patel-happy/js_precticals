export default {
    GET_ALL_ORDERS(state, payload) {
        payload.results.forEach(element => {
            state.orders.push(element);
        });
        state.params.order_page = payload.next
    },
    GET_ALL_TRIPS(state, payload) {
        payload.results.forEach(element => {
            state.trips.push(element);
        });
        state.params.trip_page = payload.next
    },
    GET_ALL_PROJECTS(state, payload) {
        state.projects = payload
    },
    GET_SELECTED_ORDER_DETAILS(state, payload) {
        state.selectedDetails = payload
    },
    GET_SELECTED_TRIP_DETAILS(state, payload) {
        state.selectedDetails = payload
    },
    ADD_SELECTED_OBJ(state, object) {
        state.draggedOrders.push(object);
    },
    REMOVE_SELECTED_OBJ(state, object) {
        state.draggedOrders.splice(state.draggedOrders.indexOf(object), 1);
        state.orders.splice(object.index, 1, object.object)
    },
    POP_ORDER(state, object){
        state.orders.splice(object.index, 1, {});
    }
}