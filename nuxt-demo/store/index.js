import authHeader from './authheader'

export const state = () => ({
    isConnected: false,
    chatList: []
})

export const mutations = {
    SOCKET_ONOPEN(state, event) {
        state.isConnected = true
    },
    SOCKET_ONCLOSE(state, event) {
        state.isConnected = false
        console.log("Socket Closed")
    },
    SOCKET_ONMESSAGE(state, event) {
        var temp = JSON.parse(event.data)
        if (temp.type == "chat_history") {
            let chat = state.chatList.find(c => c.trip_id == temp.trip_id)
            state.chatList[state.chatList.indexOf(chat)]['messages'] = temp.data;
        }
        if (temp.type == "message_from_driver") {
        }
    },
    PUSH_TO_CHAT_LIST(state, driverObject) {
        let driver = state.chatList.find(c => c.driver_id == driverObject.driver_id);
        if (driver) {
            state.chatList.splice(state.chatList.indexOf(driver), 1);
        } else {
            driverObject.openChatBox = false;
            if (state.chatList.length == 3) {
                state.chatList.splice(0, 1);
                state.chatList.push(driverObject);
            } else {
                state.chatList.push(driverObject);
            }
        }
    },
    POP_FROM_CHAT_LIST(state, driver_id) {
        let driver = state.chatList.find(c => c.driver_id == driver_id);
        state.chatList.splice(state.chatList.indexOf(driver), 1);
    },
    TOGGLE_CHATBOX(state, driver_id) {
        let driver = state.chatList.find(c => c.driver_id == driver_id);
        state.chatList[state.chatList.indexOf(driver)].openChatBox = !state.chatList[state.chatList.indexOf(driver)].openChatBox
    },
}

export const actions = {
    GET_DRIVER_TRIP({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`get_driver_trip/?driver_id=${payload}`, { headers: authHeader() })
                .then(res => {
                    resolve(res.data.data)
                })
                .catch(err => {
                    reject(err.response.data.message);
                });
        });
    },
}