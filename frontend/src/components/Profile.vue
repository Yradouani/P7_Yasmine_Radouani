<template>
<div id="header-container">
      <button id="logout" @click="logout()">Se déconnecter</button>
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
      <span>Nom : {{ user.lastname }}</span>
      <span>Prénom : {{ user.firstname }}</span>
    </div>
    <div id="image-container">
      <img :src="user.imageUrl" alt="">
    </div>
    <div id="buttons">
      <button id="update-profile">Modifier mon profil</button>
      <button id="logout" @click="logout()">Se déconnecter</button>
    </div>
  </div>
  
</template>

<script>
// import axios from 'axios'
import {mapState} from 'vuex';
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
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
#buttons {
  display: flex;
  justify-content: space-between;
  margin: 30px;
}
h1{
  background-color: rgba(255, 255, 255, .6);
  padding: 10px;
  border-radius: 5px;
}
#logout {
  width: 150px;
  height: 40px;
  background-color: rgb(189, 195, 196);
  border-radius: 10px;
  cursor: pointer;
}
#update-profile {
  width: 150px;
  height: 40px;
  background-color: rgb(189, 195, 196);
  border-radius: 10px;
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
  width: 50%;
  margin-top: 50px;
}
#first-last-name {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
#image-container {
  width: 45%;
  height: 350px;
  overflow: hidden;
  margin: 20px auto;
}
#image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>