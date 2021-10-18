<template>
  <div id="header-container">
      <button id="logout" @click="logout()">Se déconnecter</button>
    <img src="../assets/logo.png" alt="logo" id="logo" >
    <router-link to="/profile">
      <div id="profile-container">
        <i class="fas fa-user-circle"></i>
        <span id="profile">Mon profil</span>
      </div>
    </router-link>
  </div>
  <h1>Bienvenue dans le forum {{ user.firstname }}</h1>
  <div id="message_container">
  <span>Exprimez-vous !</span>
  <input class="message" :class="{'button--disabled' : !validatedFields}" type="texte" placeholder="Écrivez votre message" v-model="content" @keypress.enter="sendMessage"/>
  <div id="button_container">
    <input type="file" @change="onFileSelected" id="add-picture">
    <button @click="onUpload">Ajouter mon image</button>
    <button id="send-message" @click="sendMessage" >Publier mon message</button>
  </div>
  </div>

  <div id="all-message-container" v-if="allMessages.length > 0">
  <div id="message-container" v-for="singleMessage in allMessages" v-bind:key="singleMessage.id">
      <div id="user-infos-container">
        <img src="" alt="" id="img-user">
        <span>{{ user.firstname }} {{ user.lastname }}</span>
      </div>
      <div id="message-text">
        <span>{{ singleMessage.content }}</span>
      </div>
      <hr>
      <div>
      <span id="trash" @click="deleteMessage(singleMessage)"><i class="fas fa-trash-alt" ></i> Supprimer</span>
      <span id="update" @click="updateMessage(singleMessage)"><i class="fas fa-edit"></i> Modifier</span>
      <span v-if="messageToUpdate !== null && messageToUpdate.id === singleMessage.id">
        <input type="texte" placeholder="Modifier votre message" v-model="messageToUpdate.message" @keypress.enter="save"/>
        <button id="update-message" @click="save">Sauvegarder</button>
      </span>
      </div>
  </div>
  </div>
</template>

<script>
// import { ref } from 'vue';
// import store from '@/store/index.js'
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name: 'profile',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1 || this.$store.state.user== null) {
      this.$router.push('/');
      return;
    }
    this.$store.dispatch('getUserInfos');

    axios.get('http://localhost:3000/api/messages')
      .then((response) => {
        this.allMessages = response.data
        })
      .catch(error => console.log(error))
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  data() {
    return {
      content: "",
      allMessages: '[]',
      selectedFile: "",
      messageToUpdate: "",
    };
  },
  methods: {
      sendMessage: function () {
        console.log(this.content);
      // ctx.emit("addNewMessage", this.content);
      this.allMessages = [...this.allMessages, { message: this.content}];
      console.log(this.allMessages);
      axios.post('http://localhost:3000/api/messages', {"content": this.content})
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error))
      axios.get('http://localhost:3000/api/messages')
      .then((response) => {
        this.allMessages = response.data
        })
      .catch(error => console.log(error))
      this.content = "";
      },
      deleteMessage: function (singleMessage) {
          let self = this;
          console.log(singleMessage);
          axios.delete(`http://localhost:3000/api/messages/${singleMessage.id}`)
              .then(response => {
                  this.message = response;
                  this.allMessages = self.allMessages.filter(m => m.id !== singleMessage.id);
                  console.log('Message effacé')
              })
              .catch(error => console.log(error))
      },
      onFileSelected: function (e) {
        this.selectedFile = e.target.files[0];
      },
      updateMessage: function (singleMessage) {
          this.messageToUpdate = singleMessage;
      },
      logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
      },
      save: function () {
        this.messageToUpdate = null;
      },
      validatedFields: function () {
        this.content != '';
      },

  },

};
// export default {
//   setup(props, ctx) {

//     let content = ref("");
//     let allMessages = ref([]);
//     // let imageUrl = ref

//     const sendMessage = function () {
//       console.log(content.value);
//       ctx.emit("addNewMessage", content.value);
//       allMessages.value = [...allMessages.value, { message: content.value, id: Date.now() }];
//       console.log(allMessages.value);
//       axios.post('http://localhost:3000/api/messages', content.value)
//         .then(response => {
//           console.log(response);
//         })
//         .catch(error => {
//           console.log(error);
//         })
//       // store.dispatch('sendMessage', allMessages.value)
//       content.value = "";
//     };
//     const deleteMessage = function (singleMessage) {
//       ctx.emit('delete-message', singleMessage);
//       console.log(singleMessage);
//       allMessages.value = allMessages.value.filter(m => m.id !== singleMessage.id);

//     };
//     let selectedFile = null;
//     const onFileSelected = function (e) {
//         selectedFile.value = e.target.files[0];
//     };
//     const onUpload = function () {

//     };
//     let messageToUpdate = ref(null);
//     const updateMessage = function (singleMessage) {
//         messageToUpdate.value = singleMessage;
//     };
//     let save = function () {
//         messageToUpdate.value = null;
//     };
//     const validatedFields = function () {
//         content.value != '';
//     };
//     return {
//       content,
//       sendMessage,
//       allMessages,
//       deleteMessage,
//       updateMessage,
//       save,
//       messageToUpdate,
//       validatedFields,
//       onFileSelected,
//       selectedFile,
//       onUpload
//     };
//   }
// };
</script>

<style scoped>
hr {
  width: 100%;
  height: 1px;
  color: rgb(108, 151, 151);
  border: none;
  background-color: rgb(108, 151, 151);
}
#background-image {
  width: 100%;
  height: 100%;
}
#app{
  background-color: white;
}
#logout {
  width: 130px;
  height: 30px;
  background-color: rgb(189, 195, 196);
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 30px;
  border: none;
  box-shadow: 2px 2px 3px rgb(209, 209, 209);
}
#button_container {
  display: flex;
  justify-content: space-between;
}
#add-picture {
  background-color: rgb(189, 195, 196);
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 30px;
  border: none;
  margin: 15px auto;
  box-shadow: 1px 2px 3px rgb(209, 209, 209);
}
#send-message {
  background-color: rgb(189, 195, 196);
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 30px;
  border: none;
  margin: 15px auto;
  box-shadow: 1px 2px 3px rgb(209, 209, 209);
}
i {
  font-size: 30px;
  color: rgb(189, 195, 196);
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
#message_container {
  background-color: white;
  border: 1px solid black;
  width: 80%;
  padding-top: 20px;
}
#message-text {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  margin: 0 10px 10px 10px;
}
#message_container span {
  text-align: start;
}
.message {
  border: 1px solid black;
  width: 80%;
  height: 150px;
  padding-left: 10px;
  margin: 20px auto;
}
#all-message-container {
  background-color: white; 
  width: 80%;
  margin-top: 30px;
  padding: 20px 30px 20px 30px;
  margin-bottom: 50px;
}
input {
  display: flex;
  justify-content: flex-start;
}
input:focus{
    outline: 3px black;
}
#message-container {
  border: 1px solid rgb(189, 195, 196);
  margin-top: 10px;
  padding: 10px;
  display: flex;
  width: 95%;
  justify-content: space-between;
  flex-direction: column;
}
#trash i, #update i{
  font-size: 15px;
  margin-left: 15px;
  cursor: pointer;
}
#user-infos-container{
  margin: 10px 10px 20px 10px;
  display: flex;
  justify-content: flex-start;
}
#user-infos-container span {
  font-weight: bold;
}
</style>