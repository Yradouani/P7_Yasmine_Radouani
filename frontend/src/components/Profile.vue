<template>
  <router-link to="/forum">
    <div id="forum-access">
      <i class="fas fa-comments"></i>
      <span>Accéder au forum</span>
    </div>
  </router-link>
  <h1>Bienvenu sur votre profil</h1>
  <div id="profil-container">
    <router-link to="/">
    <button id="logout">Se déconnecter</button>
  </router-link>
  </div>
  
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
}
</style>