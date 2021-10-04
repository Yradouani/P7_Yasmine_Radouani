<template>
  <router-link to="/profile">
    <div id="profile-container">
      <i class="fas fa-user-circle"></i>
      <span id="profile">Mon profil</span>
    </div>
  </router-link>
  <h1>Bienvenue dans le forum</h1>
  <router-link to="/">
    <button id="logout">Se déconnecter</button>
  </router-link>
</template>

<script>
export default {};
</script>

<style>
#logout {
  width: 150px;
  height: 40px;
  background-color: cadetblue;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 30px;
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
</style>