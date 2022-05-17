export default {
    TEMPLATE_LIST(state, payload) {
        state.template_list = payload
    },
    PUSH_TEMPLATE_CREATED(state, payload) {
        state.template_list.unshift(payload)
    },
    REMOVE_TEMPLATE(state, id) {
        state.template_list.splice(state.template_list.indexOf(state.template_list.find((v) => v.id == id)), 1)
    },
    UPDATE_TEMPLATE(state, payload) {
        console.log
        console.log((state.template_list.find((v) => v.id == payload.id)));
        console.log(state.template_list.indexOf(state.template_list.find((v) => v.id == payload.id)))
        state.template_list.splice(state.template_list.indexOf(state.template_list.find((v) => v.id == payload.id)), 1, payload)
    }
}