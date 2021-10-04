<template>
  <router-link to="/forum">
    <button>Accéder au forum</button>
  </router-link>
  <h1>Bienvenu sur votre profil</h1>

  <router-link to="/">
    <button id="logout">Se déconnecter</button>
  </router-link>
</template>

<script>
export default {};
</script>

<style>
#logout{
    width: 200px;
    height: 40px;
    background-color: cadetblue;
    border-radius: 10px;
    cursor: pointer;
}
</style>