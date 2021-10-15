<template>
  <router-link to="/forum">
    <div id="forum-access">
      <i class="fas fa-comments"></i>
      <span>Accéder au forum</span>
    </div>
  </router-link>
  <h1>Bienvenu sur votre profil</h1>
  <div id="profil-container">
    <div id="first-last-name">
      <span>Nom</span>
      <span>Prénom</span>
    </div>
    <div id="image-container">
      <img src="../assets/depositphotos.jpg" alt="">
    </div>
    <div id="buttons">
      <button id="update-profile">Modifier mon profil</button>
      <router-link to="/">
        <button id="logout">Se déconnecter</button>
      </router-link>
    </div>
  </div>
  
</template>

<script>
// import axios from 'axios'
export default {
  name: 'profile',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return;
    }
    // this.$store.dispatch('getUserInfos');

    // axios.get('http://localhost:3000/api/users/:userid')
    //   .then(function(response){
    //     if(response.ok){
    //         return response.json();
    //     }  
    //   })
  }

};
</script>

<style scoped>
#buttons {
  display: flex;
  justify-content: space-between;
  margin: 30px;
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