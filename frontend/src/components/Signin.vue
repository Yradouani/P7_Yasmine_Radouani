<template>
<h1>Bienvenue sur votre réseau social d'entreprise !</h1>
  <div id="connexion" @submit.prevent="connexion">
    <h2>Connexion</h2>
    <div id="create-accompt">
      <span>Tu n'as pas encore de compte ? </span>
      <span>Créer un compte</span>
    </div>
    <input type="text" id="email" v-model="newUser.adress" placeholder="Adresse mail"/>
    <input type="text" id="firstname" v-model="newUser.firstname" placeholder="Prénom"/>
    <input type="text" id="lastname" v-model="newUser.lastname" placeholder="Nom"/>
    <input type="text" id="password" v-model="newUser.password" placeholder="Mot de passe"/>
    <router-link to='/forum'>
        <button type="submit" @click="connexion" id="signin">Connexion</button>
    </router-link>
  </div>
</template>

<script>
export default {
  setup(props, ctx) {
      let newUser = {
          firstname: "",
          lastname: "",
          adress: "",
          password: ""
      }
    //   let firstname = ref("");
    //   let lastname = ref("");
    //   let adress = ref("");
    //   let password = ref("");

      const connexion = function () {
          console.log(newUser);
          ctx.emit("add", (newUser));

        newUser.value = "";
        // newUser.firstname.value = "";
        // newUser.lastname.value = "";
        // newUser.adress.value = "";
        // newUser.password.value = "";

      };

      return {
        //   firstname,
        //   lastname,
        //   adress,
        //   password,
          newUser,
          connexion,
      }
  }
};
</script>

<style>
h1 {
  font-size: 25px;
}
#connexion {
    border: 1px solid #070707;
    border-radius: 20px;
    width: 50%;
    background-color: white;
    flex-wrap: wrap;
display: flex;
justify-content: center;
    margin-top: 20px;
}
#signin {
    width: 200px;
    height: 40px;
    background-color: cadetblue;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 20px;
}
input {
  background-color: aliceblue;
  border-radius: 5px;
  margin: 5px;
  border: none;
  height: 30px;
}
input::placeholder {
  color: black;
  margin-left: 5px;
}
#create-accompt {
  margin: 0 10px 20px;
}
#create-accompt span{
 font-size: 15px;
}
#email {
  width: 80%;
}
#password {
  width: 80%;
}
</style>