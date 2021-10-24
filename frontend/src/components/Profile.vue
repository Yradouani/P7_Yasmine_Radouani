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
        <button id="update-profile">Modifier mon profil</button>
        <button id="logout" @click="logout()">Se déconnecter</button>
      </div>
      <button @click="deleteAccount()" id="delete-user">Je souhaite supprimer mon compte ?</button>
      <div v-if="iWantToDeleteAccount" id="confirmation-container">
        <h2>Êtes-vous sûr de supprimer votre compte Groupomania ?</h2>
        <button id="confirmation" @click="deleteUser(singleUser)">Oui j'en suis sûr !</button>
        <button @click="cancel()" id="cancel">Non je souhaites annuler</button>

      </div>
    </div>
  </div>
  
</template>

<script>
// import axios from 'axios'
import {mapState} from 'vuex';
import axios from 'axios';
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
    deleteAccount: function () {
      this.iWantToDeleteAccount = true;
    },
    cancel: function () {
      this.iWantToDeleteAccount = false;
    },
    deleteUser: function (singleUser) {
      axios.delete(`http://localhost:3000/api/users/${singleUser.userId}`)
              .then(response => {
                  this.message = response;
                  console.log("Suppression de l'utilisateur")
              })
              .catch(error => console.log(error))
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
  width: 55%;
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
</style>