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
  width: 200px;
  height: 40px;
  background-color: cadetblue;
  border-radius: 10px;
  cursor: pointer;
}
i {
  font-size: 30px;
  color: cadetblue;
}
#profile-container {
  position: absolute;
  right: 10px;
  top: 10px;
  color: inherit;
  display: flex;
  flex-direction: column;
}
#profile {
    margin-top: 10px;
}
a {
    color: inherit;
}
</style>