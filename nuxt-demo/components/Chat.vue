<template>
  <div class="chatMainContainer d-flex justify-end">
    <div v-for="chat of chats" :key="chat.index" class="chatPanel mr-5">
      <v-card
        elevation="2"
        class="parentCard pa-0"
        :id="'parentCard' + chat.driver_id"
      >
        <v-card-subtitle class="px-2 py-0 font-weight-bold chatHeader">
          <v-row dense>
            <v-col cols="8">
              <v-avatar color="success" size="10"> </v-avatar>
              <span class="pl-1">{{ chat.driver_name }}</span>
            </v-col>
            <v-col cols="4" class="d-flex justify-end">
              <v-btn @click="toggleChatBox(chat.driver_id)" dark icon small>
                <v-icon small v-if="!chat.openChatBox"
                  >mdi-arrow-top-right</v-icon
                >
                <v-icon small v-else>mdi-arrow-bottom-left</v-icon>
              </v-btn>
              <v-btn dark icon small @click="closeChat(chat.driver_id)">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-expand-transition>
          <div v-if="chat.openChatBox">
            <v-card-text :id="chat.driver_id" class="chatWindow px-2 pb-0 pt-2">
              <div
                :id="'Chat-List' + chat.driver_id"
                class="chatHistory mx-1 flex-grow-1 overflow-y-auto"
              >
                <template v-for="msg in chat.messages">
                  <div
                    :key="msg.index"
                    :class="{
                      'd-flex flex-row-reverse': checkSender(msg.sender_name),
                    }"
                  >
                    <template>
                      <v-card
                        elevation="0"
                        dark
                        :color="
                          checkSender(msg.sender_name) ? '#d6d2d2f0' : '#8bd8e4'
                        "
                        class="px-2 py-1 mb-1 chatCard"
                        max-width="80%"
                      >
                        {{ msg.message }}

                        <h5
                          class="text-right"
                          style="font-size: 0.6rem; font-weight: normal"
                        >
                          {{ msg.sent_timestamp }}
                        </h5>
                      </v-card>
                    </template>
                  </div>
                </template>
              </div>
            </v-card-text>
            <div class="mt-2">
              <v-text-field
                v-model="vModels[chat.driver_id]"
                hide-details
                solo
                :multiple="fileType == 'file'"
                dense
                @keyup.enter="
                  sendMessages($event, chat.trip_id, chat.driver_id)
                "
                label="Send message"
                :type="fileType"
                style="font-size: 10px !important"
              >
                <template v-slot:append>
                  <div>
                    <v-btn @click="changeInputType(chat.driver_id)" icon small>
                      <v-icon small v-if="fileType == 'text'"
                        >mdi-paperclip</v-icon
                      >
                      <v-icon small v-else>mdi-format-text</v-icon>
                    </v-btn>
                  </div>
                  <v-btn
                    @click="sendMessages($event, chat.trip_id, chat.driver_id)"
                    icon
                    small
                    style="background-color: #175282"
                    dark
                  >
                    <v-icon x-small>mdi-send</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileType: "",
      vModels: {},
    };
  },
  computed: {
    chats() {
      return this.$store.state.chatList;
    },
  },
  methods: {
    changeInputType(id) {
      if (this.fileType == "file") {
        this.vModels[id] = null;
        this.fileType = "text";
      } else {
        this.vModels[id] = null;
        this.fileType = "file";
      }
    },
    checkSender(name) {
      return localStorage.getItem("username") == name;
    },
    sendMessages(event, trip_id, driver_id) {
      console.log(event);
      // const content = this.vModels[driver_id];
      // this.vModels[driver_id] = "";
      // if (content == undefined || content == null || content == "") {
      //   this.$snackbar.showMessage({
      //     content: "Can't send empty message.",
      //     color: "error",
      //   });
      // } else {
      //   const sender_name = localStorage.getItem("username");
      //   let sendMessage = {
      //     command: "new_message",
      //     data: {
      //       trip_id: trip_id,
      //       message: content,
      //       message_type: this.fileType,
      //       logged_user: sender_name,
      //     },
      //   };
      //   let strObj = JSON.stringify(sendMessage);
      //   this.$socket.send(strObj);
      //   this.$forceUpdate();
      // }
    },
    scrollControl(driver_id) {
      setTimeout(() => {
        let elem = document.getElementById("Chat-List" + driver_id);
        if (elem == null) {
          return false;
        } else {
          elem.scrollTop = elem.scrollHeight;
        }
      }, 50);
    },
    toggleChatBox(driver_id) {
      this.$store.commit("TOGGLE_CHATBOX", driver_id);
      let driver = this.chats.find((c) => c.driver_id == driver_id);
      if (driver.openChatBox) {
        this.scrollControl(driver_id);
      }
      this.$forceUpdate();
    },
    closeChat(id) {
      this.$store.commit("POP_FROM_CHAT_LIST", id);
    },
    checksocket() {
      console.log(this);
      // // console.log(this.$socket.__proto__.close(this.$socket));
      // this.$socket.__proto__.close(this.$socket);
      // // Vue.prototype.$socket.close();
    },
  },
  async mounted() {},
};
</script>

<style scoped>
.chatMainContainer {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70%;
  z-index: 999;
  align-items: flex-end;
}

.parentCard {
  border-radius: 9px 9px 0px 0px;
  border-bottom: 0px;
}

.chatPanel {
  max-width: 35%;
  width: 16em;
  height: 20%;
}

.chatHeader {
  background-color: #175282 !important;
  color: white !important;
  border-radius: 8px 8px 0px 0px !important;
}

.chatWindow {
  height: 20rem;
  width: 100%;
}

.chatCard {
  color: #58595b !important;
}

.chatHistory {
  height: 100%;
}

.chatHistory::-webkit-scrollbar {
  width: 0;
}
</style>