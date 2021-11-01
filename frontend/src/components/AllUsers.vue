<template>
  <div id="body">
      <div id="profile-container" @click="openDropDown">
        <span id="dropdown-icon" >
          <i class="fas fa-bars"></i>
        </span>
      </div>
      <div id="dropdown" v-if="dropdown">
          <span @click="closeDropDown"><i class="fas fa-times" id="cross"></i></span>
          <ul>
            <hr>
            <router-link to="/profile"><li>Mon profil</li></router-link>
            <hr>
            <router-link to="/forum"><li>Forum</li></router-link>
            <hr>
            <li @click="logout()">Me déconnecter</li>
            <hr>
            <li>À propos</li>
            <hr>
          </ul>
      </div>
      <h1>Gestion des utilisateurs</h1>
    <div id="all-users-container" v-if="allUsers.length > 0">
      <div id="user-container" v-for="singleUser in allUsers" v-bind:key="singleUser.id">
          <div id="img-container"><img :src="singleUser.imageProfil" alt=""></div>
          <div id="informations-user">
          <span> {{ singleUser.firstname }} {{ singleUser.lastname }}</span>
          <span>{{ singleUser.email }}</span>
          <span>Date de création du compte : {{ singleUser.createdAt.slice(0,10).split("-").join(" ").split(" ").reverse().join("-") }}</span>
          </div>
          <span id="trash" v-if="user.isAdmin == true" @click="deleteAccount(singleUser)"><i class="fas fa-trash-alt" ></i></span>
      </div>
    </div>
    <div v-if="iWantToDeleteAccount" id="confirmation-container">
            <h2>Êtes-vous sûr de supprimer ce compte utilisateur Groupomania ?</h2>
            <button id="confirmation" @click="deleteUser(singleUser)">Oui j'en suis sûr !</button>
            <button @click="cancel()" id="cancel">Annuler</button>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
export default {
  name: "allusers",
  mounted: function () {
    if (
      this.$store.state.user.userId < 1 ||
      this.$store.state.user == null ||
      this.userInLocalStorage.token == null
    ) {
      this.logout();
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");

    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        this.allUsers = response.data;
        console.log(this.allUsers);
      })
      .catch((error) => console.log(error));
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  data() {
    return {
      allUsers: "",
      userInLocalStorage: JSON.parse(localStorage.getItem('user')),
      dropdown: "",
      iWantToDeleteAccount: "",
      userToDelete: "",
    };
  },
  methods: {
    getAllUsers: function () {
        axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        this.allUsers = response.data;
        console.log(this.allUsers);
      })
      .catch((error) => console.log(error));
    },
    openDropDown: function () {
        this.dropdown = true;
    },
    closeDropDown: function () {
        this.dropdown = false;
    },
    logout: function () {
    this.$store.commit('logout');
    this.$router.push('/');
    },
    deleteAccount: function (singleUser) {
      this.iWantToDeleteAccount = true;
      console.log(singleUser)
      this.userToDelete = singleUser;
    },
    cancel: function () {
      this.iWantToDeleteAccount = false;
    },
    deleteUser: function () {
        let self = this;
        console.log(this.userToDelete)
      axios.delete(`http://localhost:3000/api/users/${this.userToDelete.userId}`)
              .then(response => {
                  this.message = response;
                  this.allUsers = self.allUsers.filter(m => m.id !== this.userToDelete.userId);
                  console.log("Suppression de l'utilisateur");
                  this.getAllUsers();
              })
              .catch(error => console.log(error))
              this.iWantToDeleteAccount = false;
    },
  },
};
</script>

<style scoped>
#body {
  background-color: white;
  width: 95%;
}
#all-users-container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#user-container{
    height: 120px;
    width: 80%;
    background-color: white;
    border: 1px solid black;
    margin: 10px;
    display: flex;
    align-items: center;
}
#user-container:hover {
    border: 1.5px solid rgb(66, 66, 66);
}
#img-container{
    width: 30%;
    height: 100%;
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
#informations-user {
    display: flex;
    flex-direction: column;
    margin: 10px;
}
#informations-user span {
    text-align: left;
    margin: 3px;
}
#trash {
    margin-right: 10px;
    cursor: pointer;
}
#trash:hover{
    color: rgb(107, 107, 109);
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
#dropdown-icon{
    border: 1px solid black;
    padding: 10px;
    margin: 20px;
    cursor: pointer;
}
a {
    color: inherit;
}
#profile-container{
    display: flex;
}
#confirmation-container{
  width: 70%;
  border: 1.5px solid black;
  background-color: white;
  position: fixed;
  top: 30%;
  transform: translateY(-50%);
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
</style>