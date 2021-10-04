<template>
  <h1>Bienvenue sur votre réseau social d'entreprise !</h1>
  <div id="connexion" @submit.prevent="connexion">
    <h2 v-if="mode == 'login'">Connexion</h2>
    <h2 v-else>Créer un compte</h2>
    <div id="create-accompt" v-if="mode == 'login'">
      <span >Je n'ai pas encore de compte ? </span>
      <span @click="switchToCreateAccount()" id="create_account">Créer un compte</span>
    </div>
    <div id="create-accompt" v-else>
      <span >J'ai déjà compte ? </span>
      <span @click="switchToLogin()" id="connect">Se connecter</span>
    </div>
    <div id="input-container">
      <input
        type="text"
        id="email"
        v-model="newUser.adress"
        placeholder="Adresse mail"
      />
      <div id="firstname-lastname" v-if="mode == 'create'">
        <input
          type="text"
          id="firstname"
          v-model="newUser.firstname"
          placeholder="Prénom"
        />
        <input
          type="text"
          id="lastname"
          v-model="newUser.lastname"
          placeholder="Nom"
        />
      </div>
      <input
        type="text"
        id="password"
        v-model="newUser.password"
        placeholder="Mot de passe"
      />
    </div>
    <router-link to="/forum">
      <button type="submit" @click="connexion" id="signin">Connexion</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
      return {
        mode: 'login',
      }
  },
  methods: {
      switchToCreateAccount : function () {
        this.mode = 'create';
      },
      switchToLogin : function () {
        this.mode = 'login'
      }
  },
  setup(props, ctx) {
    let newUser = {
      firstname: "",
      lastname: "",
      adress: "",
      password: "",
    };
    const connexion = function () {
      console.log(newUser);
      ctx.emit("add", newUser);
      newUser.value = "";
    };

    return {
      newUser,
      connexion,
    };
  },
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
  flex-direction: column;
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
  margin: 5px auto;
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
#create-accompt span {
  font-size: 15px;
}
#input-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto;
}
#email {
  width: 100%;
}
#password {
  width: 100%;
}
#firstname-lastname {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
#firstname {
  width: 50%;
  margin-right: 20px;
}
#lastname {
  width: 50%;
}
#create_account, #connect {
  color: cadetblue;
  font-weight: bold;
  cursor: pointer;
}
</style>