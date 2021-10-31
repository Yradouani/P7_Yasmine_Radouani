<template>
<div id="header-container">
    <img src="../assets/logo.png" alt="logo" id="logo" >
    <router-link to="/forum">
    <div id="forum-access">
      <i class="fas fa-comments"></i>
      <span>Accéder au forum</span>
    </div>
  </router-link>
  </div>
  <h1>Bienvenu sur votre profil {{ user.firstname }} !</h1>
  <div id="profil-container">
    <div id="first-last-name">
      <span>{{ user.firstname }}  </span>
      <span>{{ user.lastname }}</span>
    </div>
    <div id="image-container">
      <img :src="user.imageProfil" alt="">
    </div>
    <div id="buttons">
      <div id="buttons-update-and-logout">
        <button id="update-profile" @click="updateUser()">Modifier mon image de profil</button>
        <!-------------------------------------------------------------------------------------->
        <div v-if="userToUpdate" id="user-to-update-container">
        <span id="update-header-text">Modifier votre image de profil</span>
        
          <label for="new-picture" class="new-file" id="new-picture-container">Choisir une nouvelle image de profil</label>
          <input type="file" @change="onFileSelected" id="new-picture">
        
        <hr>
        <div>
          <button id="update-user" @click="save(singleMessage)" @keypress.enter="save(singleMessage)">Sauvegarder</button>
          <button id="cancel" @click="cancelUpdate()">Annuler</button>
        </div>
      </div>
      <!-------------------------------------------------------------------------------------->
        <button id="logout" @click="logout()">Se déconnecter</button>
      </div>
      <button @click="deleteAccount()" id="delete-user">Je souhaite supprimer mon compte ?</button>
      <div v-if="iWantToDeleteAccount" id="confirmation-container">
        <h2>Êtes-vous sûr de supprimer votre compte Groupomania ?</h2>
        <button id="confirmation" @click="deleteUser()">Oui j'en suis sûr !</button>
        <button @click="cancel()" id="cancel">Non je souhaites annuler</button>

      </div>
    </div>
  </div>
  
</template>

<script>
// import axios from 'axios'
import {mapState} from 'vuex';
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
export default {
  name: 'profile',
  mounted: function () {
      console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1  || this.$store.state.user== null) {
      this.$router.push('/');
      return;
    }
    this.$store.dispatch('getUserInfos');

  },
  data() {
    return {
      iWantToDeleteAccount: false,
      userLocalStorage: JSON.parse(localStorage.getItem('user')),
      userToUpdate: "",
      selectedFile: null,
    };
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    findUserInfos: function () {
      const http = axios.create({
            baseURL: '/',
            headers: { 'Cache-Control': 'no-cache' },
            // cache will be enabled by default
            adapter: cacheAdapterEnhancer(axios.defaults.adapter)
        });
        http.get(`http://localhost:3000/api/users/${this.user.userId}`)
          .then(response => {
              console.log(response);
              console.log(response.data.user)
              this.user.imageProfil = response.data.user.imageProfil
            })
          .catch(error => console.log(error))
    },
    deleteAccount: function () {
      this.iWantToDeleteAccount = true;
    },
    cancel: function () {
      this.iWantToDeleteAccount = false;
    },
    updateUser: function () {
      this.userToUpdate = this.user.firstname + this.user.lastname
    },
    onFileSelected: function (e) {
        console.log(e);
        this.selectedFile = e.target.files[0];
        console.log(this.selectedFile)
      },
    save: function () {       
        let newFormData = new FormData();
        console.log(this.selectedFile)
        // let newMessage;
        if(this.selectedFile != null) {
          newFormData.append('image', this.selectedFile, this.selectedFile.name)
        }
        axios.put(`http://localhost:3000/api/users/${this.user.userId}`, newFormData)
          .then(response => {
              console.log(response);
              this.findUserInfos();
              console.log(this.user.imageProfil)
            })
          .catch(error => console.log(error))
          this.userToUpdate = null;
    },
    cancelUpdate: function () {
      this.userToUpdate = "";
    },
    deleteUser: function () {
      axios.delete(`http://localhost:3000/api/users/${this.user.userId}`)
              .then(response => {
                  this.message = response;
                  console.log("Suppression de l'utilisateur")
                  this.$store.commit('logout');
                  this.$router.push('/');
              })
              .catch(error => console.log(error))
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
#buttons {
  display: flex;
  justify-content: space-between;
  margin: 30px;
  align-items: center;
  flex-direction: column;
}
#buttons-update-and-logout{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
#buttons-update-and-logout button:hover{
  border: 2px solid gray;
}
h1{
  background-color: rgba(255, 255, 255, .6);
  padding: 10px;
  border-radius: 5px;
}
#logo{
  margin-left: 90px;
}
#header-container{
  width: 100%;
  display: flex;
}
#logout {
  width: 150px;
  height: 40px;
  background-color: white;
  cursor: pointer;
}
#update-profile {
  width: 150px;
  height: 40px;
  background-color: #6cb5b5;
  border: 1px solid #6cb5b5;
  cursor: pointer;
}
i {
  font-size: 30px;
  color: rgb(189, 195, 196);
}
a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
#forum-access {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  transition : all 200ms;
}
#forum-access:hover {
  transform: scale(1.01);
}
#profil-container {
  background-color: white;
  border: 1px solid #070707;
  border-radius: 20px;
  width: 60%;
  margin-top: 50px;
  margin-bottom: 50px;
}
#first-last-name {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
#first-last-name span{
  margin: 0 10px;
  font-weight: bold;
  font-size: 20px;
  margin: 0 20px;
}
#image-container {
  width: 70%;
  height: 350px;
  overflow: hidden;
  margin: 20px auto;
}
#image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#confirmation-container{
  width: 70%;
  border: 1.5px solid black;
  background-color: white;
  position: fixed;
  top: 40%;
  padding: 20px;
  left: 11%;
}
#confirmation-container button {
  margin: 20px;
  height: 40px;
  width: 200px;
  cursor: pointer;
}
#confirmation-container button:hover{
  border: 2px solid gray;
}
#cancel{
  background-color: #6cb5b5;
  border: 1px solid #6cb5b5;
}
#confirmation{
  background-color: white;
}
#delete-user{
  color: red;
  border: none;
  cursor: pointer;
  height: 30px;
  background-color: white;
  font-weight: bold;
}
#user-to-update-container{
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
#update-user, #cancel{
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
hr {
  width: 100%;
  height: 1px;
  color: rgb(108, 151, 151);
  border: none;
  background-color: rgb(108, 151, 151);
}
.new-file{
  cursor: pointer;
}
#new-picture{
  display: none;
}
@media (max-width: 800px){
  #profil-container{
    width: 85%;
  }
}
@media (max-width: 600px){
  #message_imageurl{
    width: 90%;
  }
}
</style>