<template>
  <div id="header-container">
    <router-link to="/">
      <button id="logout">Se déconnecter</button>
    </router-link>
    <img src="../assets/logo.png" alt="logo" id="logo" >
    <router-link to="/profile">
      <div id="profile-container">
        <i class="fas fa-user-circle"></i>
        <span id="profile">Mon profil</span>
      </div>
    </router-link>
  </div>
  <h1>Bienvenue dans le forum</h1>
  <input id="message" type="texte" placeholder="Écrivez votre message" v-model="newMessage" @keypress.enter="sendMessage"/>
  <button id="send-message" @click="sendMessage" v-if="newMessage != ''">Publier mon message</button>

  <div id="message-container" v-for="singleMessage in allMessages" v-bind:key="singleMessage.id">
      <span>{{ singleMessage.message }}</span>
      <div>
      <span id="trash" @click="deleteMessage(singleMessage)"><i class="fas fa-trash-alt" ></i></span>
      <span id="update" @click="updateMessage(singleMessage)"><i class="fas fa-edit"></i></span>
      <span v-if="messageToUpdate !== null && messageToUpdate.id === singleMessage.id">
        <input type="texte" placeholder="Modifier votre message" v-model="messageToUpdate.message" @keypress.enter="save"/>
        <button id="update-message" @click="save">Sauvegarder</button>
      </span>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup(props, ctx) {

    let newMessage = ref("");
    let allMessages = ref([]);
    const sendMessage = function () {
      console.log(newMessage.value);
      ctx.emit("addNewMessage", newMessage.value);
      allMessages.value = [...allMessages.value, { message: newMessage.value, id: Date.now() }];
      console.log(allMessages.value);
      newMessage.value = "";
    };
    const deleteMessage = function (singleMessage) {
      ctx.emit('delete-message', singleMessage);
      console.log(singleMessage);
      allMessages.value = allMessages.value.filter(m => m.id !== singleMessage.id);

    };
    let messageToUpdate = ref(null);
    const updateMessage = function (singleMessage) {
        messageToUpdate.value = singleMessage;
    };
    let save = function () {
        messageToUpdate.value = null;
    };
    return {
      newMessage,
      sendMessage,
      allMessages,
      deleteMessage,
      updateMessage,
      save,
      messageToUpdate,
    };
  }
};
</script>

<style scoped>
#app{
  background-color: white;
}
#logout {
  width: 130px;
  height: 30px;
  background-color: cadetblue;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 30px;
  border: none;
}
#send-message {
  background-color: cadetblue;
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 30px;
  border: none;
  margin: 15px auto;
}
i {
  font-size: 30px;
  color: cadetblue;
}
#profile-container {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  transition : all 200ms;
}
#profile-container:hover {
  transform: scale(1.1);
}
#profile {
    margin-top: 10px;
}
a {
    color: inherit;
}
#message {
  border: 1px solid black;
  width: 80%;
  height: 150px;
  padding-left: 10px;
}
input {
  display: flex;
  justify-content: flex-start;
}
input:focus{
    outline: 3px black;
}
#message-container {
  border: 2px solid cadetblue;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  width: 80%;
  justify-content: space-between;
}
#trash i, #update i{
  font-size: 15px;
  margin-left: 15px;
  cursor: pointer;
}
</style>