<template>
  <div id="header-container">
    <img src="../assets/logo.png" alt="logo" id="logo" >
    
      <div id="profile-container" @click="openDropDown" v-if="!dropdown">
        <span id="img-profil-container" >
          <img :src="user.imageProfil" alt="" id="img-user" v-if="user.imageProfil">
        </span>
      </div>
      <div id="dropdown" v-if="dropdown">
          <span @click="closeDropDown"><i class="fas fa-times" id="cross"></i></span>
          
          <ul>
            <hr>
            <router-link to="/profile"><li>Mon profil</li></router-link>
            <hr>
            <li @click="logout()">Me déconnecter</li>
            <hr>
            <li><a href="mailto:contact@groupomania.com">Nous contacter</a></li>
            <hr>
            <li>À propos</li>
            <hr>
            <router-link to="/allusers" v-if="user.isAdmin == true"><li>Tous les participants</li></router-link>
            <hr v-if="user.isAdmin == true">
          </ul>
      </div>
  </div>
  <h1>Bienvenue dans le forum {{ user.firstname }} !</h1>
  <div id="message_container">
  <span>Exprimez-vous !</span>
  <input class="message" :class="{'button--disabled' : !validatedFields}" type="texte" placeholder="Écrivez votre message" v-model="content" @keypress.enter="sendMessage"/>
  <img :src="selectedFile" alt="">
  <div id="button_container">
    <label for="add-picture" class="label-file">Choisir une image</label>
    <input type="file" @change="onFileSelected" id="add-picture">
    <button id="send-message" @click="sendMessage" >Publier mon message</button>
  </div>
  </div>
  <div id="input-container">
        <input v-model="searchKey" type="search" id="search" placeholder="Rechercher les messages d'un utilisateur" autocomplete="off">
    </div>
  <div id="all-message-container" v-if="allMessages.length > 0">
  <div id="message-container" v-for="singleMessage in allMessagesReverse" v-bind:key="singleMessage.id">
      <div id="user-infos-container">
        <span id="img-user-container" v-if="singleMessage.imageProfil != null">
          <img :src="singleMessage.imageProfil" alt="" id="img-user">
        </span>
        <span id="first-and-last-name">{{ singleMessage.firstname }} {{ singleMessage.lastname }}</span>
      </div>
      <div id="message-text">
        <span id="single-message-text">{{ singleMessage.content }}</span>
        <div v-if="singleMessage.imageUrl != null">
          <img :src="singleMessage.imageUrl" alt="" id="message_imageurl">
        </div>
      </div>
      <hr>
      <div id="like-delete-update-container">
        <span class="unlike" v-if="!singleMessage.likes" @click="likeMessage(singleMessage)" ><span v-if="singleMessage.likes" id="user-like">{{ singleMessage.likes }}</span><i id="unlike" class="far fa-thumbs-up"></i> J'aime</span>
        <span class="like" v-if="singleMessage.likes" @click="likeMessage(singleMessage)" >{{ singleMessage.likes }}<i id="like" class="far fa-thumbs-up"></i> J'aime</span>
      <span id="trash" @click="deleteMessage(singleMessage)" v-if="(singleMessage.userId == user.userId) || (user.isAdmin == true)"><i class="fas fa-trash-alt" ></i> Supprimer</span>
      <span id="update" @click="updateMessage(singleMessage)" v-if="singleMessage.userId == user.userId"><i class="fas fa-edit"></i> Modifier</span>
      <div v-if="messageToUpdate !== null && messageToUpdate.id === singleMessage.id" id="message-to-update-container">
        <span id="update-header-text">Modifier votre message</span>
        
          <label for="new-picture" class="new-file" id="new-picture-container">Modifier mon image</label>
          <input type="file" @change="onFileSelected" id="new-picture">
        
        <input type="texte" placeholder="Modifier votre message" v-model="messageToUpdate.content" @keypress.enter="save" id="update-text-input"/>
        <!-- <img :src="messageToUpdate.imageUrl" alt=""> -->
        <hr>
        <div>
          <button id="update-message" @click="save(singleMessage)" @keypress.enter="save(singleMessage)">Sauvegarder</button>
          <button id="cancel" @click="cancel()">Annuler</button>
        </div>
      </div>
      </div>
  </div>
  </div>
</template>

<script>
// import { ref } from 'vue';
// import store from '@/store/index.js'
// import router from '../router/index.js'
import axios from 'axios';
import { mapState } from 'vuex';
// import { cacheAdapterEnhancer } from 'axios-extensions';
export default {
  name: 'profile',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId < 1 || this.$store.state.user== null || this.userInLocalStorage.token == null) {
      this.logout();
      this.$router.push('/');
      return;
    }
    this.$store.dispatch('getUserInfos');


    axios.get('http://localhost:3000/api/messages')
      .then((response) => {
        this.allMessages = response.data
        this.allMessagesReverse = this.allMessages.reverse();
        console.log(this.allMessagesReverse);
        console.log(this.allMessages);
        })
      .catch(error => console.log(error))

    axios.get

  },
  computed: {
    ...mapState({
      user: 'userInfos',
    }),
    allMessagesToReturn: function () {
      return this.getAllMessages();
    },
    filteredUser: function () {
      console.log(this.allMessages);
      console.log(this.allMessagesReverse);
        return this.allMessagesReverse.filter((user) => {
            return user.firstname.toLowerCase().includes(this.searchKey.toLowerCase());
        })
    },
    
  },
  data() {
    return {
      content: "",
      allMessages: '[]',
      selectedFile: null,
      messageToUpdate: "",
      userInLocalStorage: JSON.parse(localStorage.getItem('user')),
      allMessagesReverse: '',
      dropdown: '',
      searchKey: "",
      like: "",
      allLikes: "",
    };
  },
  methods: {
      getAllMessages: function (){
        // const http = axios.create({
        //     baseURL: '/',
        //     headers: { 'Cache-Control': 'no-cache' },
        //     // cache will be enabled by default
        //     adapter: cacheAdapterEnhancer(axios.defaults.adapter)
        // });
        axios.get('http://localhost:3000/api/messages')
          .then((response) => {
            this.allMessages = response.data
            this.allMessagesReverse = this.allMessages.reverse();
            console.log(this.allMessagesReverse);
            console.log(this.allMessages);
            })
          .catch(error => console.log(error))
      },
      onFileSelected: function (e) {
        console.log(e);
        this.selectedFile = e.target.files[0];
        console.log(this.selectedFile)
      },
      sendMessage: function () {
        console.log(this.content);
      const formData = new FormData();
      if(this.selectedFile != null) {
          formData.append('image', this.selectedFile, this.selectedFile.name)
      }
          formData.append('content', this.content)
          formData.append('firstname', this.user.firstname)
          formData.append('lastname', this.user.lastname)
          formData.append('userId', this.user.userId)
          formData.append('imageProfil', this.user.imageProfil)
          console.log(this.user.imageProfil)
          this.allMessages = [...this.allMessages, { message: this.content}];
          console.log(this.allMessages);
          console.log(formData)
          axios.post('http://localhost:3000/api/messages', formData)
            .then(response => {
              console.log(response);
              this.getAllMessages();
            })
            .catch(error => console.log(error))
      
        this.getAllMessages();
        this.content = "";
      },
      deleteMessage: function (singleMessage) {
          let self = this;
          console.log(this.userInLocalStorage.token)
          console.log(singleMessage);
          axios.delete(`http://localhost:3000/api/messages/${singleMessage.id}`)
              .then(response => {
                  this.message = response;
                  this.allMessages = self.allMessages.filter(m => m.id !== singleMessage.id);
                  console.log('Message effacé');
                  this.getAllMessages();
              })
              .catch(error => console.log(error))
          this.getAllMessages();
      },
      updateMessage: function (singleMessage) {
        
          console.log(singleMessage)
          this.messageToUpdate = singleMessage;
          
      },
      cancel: function () {
          this.messageToUpdate = null;
      },
      save: function (singleMessage) {
        
        let newFormData = new FormData();

        console.log(this.selectedFile)
        // let newMessage;
        if(this.selectedFile != null) {
          newFormData.append('image', this.selectedFile, this.selectedFile.name)
        }
        newFormData.append('content', singleMessage.content)
        console.log(newFormData)
        axios.put(`http://localhost:3000/api/messages/${singleMessage.id}`, newFormData)
          .then(response => {
              console.log(response);
            })
          .catch(error => console.log(error))
        this.messageToUpdate = null;
      console.log(singleMessage)
      this.getAllMessages();
      },
      logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
      },
      validatedFields: function () {
        this.content != '';
      },
      openDropDown: function () {
        this.dropdown = true;
      },
      closeDropDown: function () {
        this.dropdown = false;
      },
      likeMessage: function (singleMessage) {
        axios.get(`http://localhost:3000/api/like/${singleMessage.id}/like/${this.user.userId}`)
            .then(response => {
              console.log(response.data.message);
              this.like = response.data.message;
              console.log(this.like)
        if(this.like) {
          this.like = false;
          console.log(this.like)
          axios.post(`http://localhost:3000/api/messages/${singleMessage.id}`, {like:this.like, userId: this.user.userId, id: singleMessage.id})
            .then(response => {
              console.log(response);
              // this.allMessages = self.allMessages.filter(m => m.id !== this.singleMessage.id);
            })
            .catch(error => console.log(error))
        } else {
          this.like = true;
          console.log(this.like)
          axios.post(`http://localhost:3000/api/messages/${singleMessage.id}`, {like: this.like, userId: this.user.userId, id: singleMessage.id})
            .then(response => {
              console.log(response);
            })
            .catch(error => console.log(error))
        }
        console.log(singleMessage.id)
        let self = this;
        axios.get(`http://localhost:3000/api/messages/${singleMessage.id}/like`)
          .then(response => {
              console.log(response.data.message.length);
              this.getAllMessages();
              self.allLikes = response.data.message;
              console.log(self.allLikes)
            })
            .catch(error => console.log(error))
            })
            .catch(error => console.log(error))


        // let self = this;
        // this.allMessages = this.allMessages.filter(m => m.id !== this.singleMessage.id);
        // this.like = singleMessage.likes;
        
      },
      // isLiked: function (singleMessage) {
      
      
      // },
  },

};
</script>

<style scoped>
hr {
  width: 100%;
  height: 1px;
  color: rgb(108, 151, 151);
  border: none;
  background-color: rgb(108, 151, 151);
}
h1{
  background-color: rgba(255, 255, 255, .6);
  padding: 10px;
  border-radius: 5px;
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
input[type="file"] {
    display: none;
}
.label-file{
  background-color: rgb(144, 188, 206);
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 30px;
  border: none;
  margin: 15px auto;
  box-shadow: 1px 2px 3px rgb(209, 209, 209);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.new-file{
  cursor: pointer;
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
#profile-container {
  display: flex;
  flex-direction: column;
  transition : all 200ms;
  position: absolute;
  top: 20px;
  left: 20px;
}
#img-user-container{
  width: 35px;
  height: 35px;
  border-radius: 20px;
  overflow: hidden;
}
#img-profil-container{
  width: 50px;
  height: 50px;
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
}
#img-user-container img, #img-profil-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.without-img{
  display: none;
}
#first-and-last-name{
  margin: 7px 0 0 12px;
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
  margin: 0 auto 10px auto;
  flex-direction: column;
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
  justify-content: space-between;
  flex-direction: column;
}
#trash i, #update i{
  font-size: 15px;
  margin-left: 25px;
  
}
#trash, #update, .like{
  cursor: pointer;
}
#trash, #update{
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
#message_imageurl{
  width: 80%;
  margin-top: 20px;
  height: 300px;
  object-fit: cover;
}
#single-message-text{
  display: flex;
  justify-content: flex-start;
}
#message-to-update-container{
  position: fixed;
  width: 80%;
  height: 300px;
  top: 20%;
  border: 1.5px solid black;
  left: 5%;
  right: 5%;
  background-color: white;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
#update-header-text{
  font-size: 20px;
  font-weight: bold;
}
#update-header-text::placeholder {
  position: relative;
  top: 10px;
  margin-bottom: 30px;
}
#update-text-input{
  width: 100%;
  padding: 0;
  margin: 20px 0;
  border: none;
  height: 200px;
  display: flex;
}
#update-message, #cancel{
  background-color: white;
  margin: 10px 30px;
  width: 100px;
}
#new-picture-container{
  border: 1px dashed black;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
#like-delete-update-container{
  margin: 5px;
}
#dropdown{
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(43, 44, 45);
  color: white;
  height: 1000px;
  width: 180px;
  display: flex;
  flex-direction: column;
  animation: apparition 0.8s  ease-out;
}
@keyframes apparition {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
#dropdown ul{
 list-style: none;
 padding: 0;
 margin-top: 60px;
}
a {
  text-decoration: none;
}
ul li {
  margin: 20px;
  cursor: pointer;
  /* animation: glissement 2s  ease-out; */
}
ul li:hover {
  color: rgb(56, 82, 104);
}
#cross {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;

}
#header-container {
  position: relative;
  width: 100%;
}
#cross:hover {
  color: rgb(56, 82, 104);
}
#dropdown hr {
  width: 100%;
  height: 1px;
  color: white;
  border: none;
  background-color: white;
}
#search {
  background-color: aliceblue;
  border-radius: 5px;
  margin: 25px 40px;
  border: none;
  height: 30px;
  padding-left: 10px;
  width: 300px;
}
#input-container {
    display: flex;
}
#like {
  color: blue;
  font-weight: bold;
}
#user-like{
  margin-right: 5px;
}
@media (max-width: 700px){
  #all-message-container{
    width: 100%;
  }
  #message_imageurl{
    width: 90%;
  }
}
</style>