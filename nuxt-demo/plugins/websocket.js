import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default (context, inject) => {
    // In this case, we added a plugin to our application and this
    // will give the opportunity to get it from middleware and on pages
    // in asyncData/fetch
    Vue.use(
        VueNativeSock,
        `ws://127.0.0.1:8000/ws/dms/${localStorage.getItem("user_company")}/`,
        {
            store: context.store,
            connectManually: false,
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 3000,
        }
    );

    inject('VueNativeSock', VueNativeSock)
}