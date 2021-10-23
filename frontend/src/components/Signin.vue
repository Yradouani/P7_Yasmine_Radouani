<template>
  <img src="../assets/logo.png" alt="logo" id="logo" >
  <h1>Bienvenue sur votre réseau social d'entreprise !</h1>
  <div id="connexion" @submit.prevent="connexion">
    <h2 v-if="mode == 'login'">Connexion</h2>
    <h2 v-else>Créer un compte</h2>
    <div id="create-accompt" v-if="mode == 'login'">
      <span>Je n'ai pas encore de compte ? </span>
      <span @click="switchToCreateAccount()" id="create_account">Créer un compte</span>
    </div>
    <div id="create-accompt" v-else>
      <span>J'ai déjà compte ? </span>
      <span @click="switchToLogin()" id="connect">Se connecter</span>
    </div>
    <div id="input-container">
      <input
        type="text"
        id="email"
        v-model="email"
        placeholder="Adresse mail"
      />
      <div id="firstname-lastname" v-if="mode == 'create'">
        <input type="text" id="firstname"
          v-model="firstname"
          placeholder="Prénom"
        />
        <input
          type="text"
          id="lastname"
          v-model="lastname"
          placeholder="Nom"
        />
      </div>
      <label for="" id="password-label">
          <input
        :type="visibility" 
        id="password"
        v-model="password"
        placeholder="Mot de passe"
        />
        <div id="password-icon">
          <i class="far fa-eye-slash" id="off" v-if="passwordMode == 'hide'" @click="switchToShowPassword()"></i>
          <i class="fas fa-eye" id="on" v-else @click="switchToHidePassword()"></i>
        </div>
      </label>
      <label for="add-picture" class="label-file" v-if="mode == 'create'">Choisir une image de profil</label>
      <input type="file" @change="onFileSelected" id="add-picture">
    </div>
    <!-- <div v-if="mode == 'login' && status == 'error_login'">Adresse mail et/ou mot de passe invalide</div> -->
    <!-- <div v-if="mode == 'login' && status == 'error_create'">Adresse mail déjà utilisée</div> -->
    
      <button @click="login()" v-if="mode == 'login'" class="button" :class="{'button--disabled' : !validatedFields}">
        <span v-if="status == 'loading'">En cours de connexion...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">En cours de création...</span>
        <span v-else>Inscription</span>
      </button>
    
  </div>
</template>

<script>
// import store from '@/store/'
import {mapState} from 'vuex';
export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      passwordMode: "hide",
      visibility: "password",
      selectedFile: null,
    };
  },
  mounted: function () {
      if (this.$store.state.user.userId !== -1) {
      this.$router.push('/forum');
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.firstname != "" &&
          this.lastname != "" &&
          this.password != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState([status])
  },
  methods: {
    onFileSelected: function (e) {
        console.log(e);
        this.selectedFile = e.target.files[0];
        console.log(this.selectedFile)
      },
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    switchToShowPassword: function () {
      this.passwordMode = "show";
      this.visibility = "text";
    },
    switchToHidePassword: function () {
      this.passwordMode = "hide";
      this.visibility = "password"
    },
    regExFLC: function (value) {
        return /^[A-Z\-a-z-àâäãçéèêëìîïòôöõùûüñ-]{3,20}$/.test(value);
    },
    createAccount: function (){
      const self = this;
      console.log(this.email, this.firstname, this.lastname, this.password);
      const formData = new FormData();
      if(this.selectedFile != null){
          formData.append('image', this.selectedFile, this.selectedFile.name)
      }
      
      formData.append('firstname', this.firstname)
      formData.append('lastname', this.lastname)
      formData.append('email', this.email)
      formData.append('password', this.password)
      this.$store.dispatch('createAccount', formData)
        .then(function () {
          self.login();
        }), function (error) {
          console.log(error);
        }
    },
    login: function (){
      const self = this;
      this.$store.dispatch('login', {
      email: this.email,
      password: this.password,
      }).then(function () {
          self.$router.push('/forum');
      }), function (error) {
        console.log(error);
      }
    }
    
  },
};
</script>

<style scoped>
#add-picture {
  background-color: rgb(189, 195, 196);
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 30px;
  border: none;
  margin: 15px auto;
  box-shadow: 1px 2px 3px rgb(209, 209, 209);
}
input[type="file"] {
    display: none;
}
.label-file{
  background-color: aliceblue;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  height: 30px;
  border: none;
  margin: 15px auto;
  box-shadow: 1px 2px 3px rgb(209, 209, 209);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 25px;
  background-color: rgba(255, 255, 255, .7);
  padding: 10px;
  border-radius: 5px;
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
input {
  background-color: aliceblue;
  border-radius: 5px;
  margin: 5px auto;
  border: none;
  height: 30px;
  padding-left: 10px;
}
input::placeholder {
  color: black;
  margin-left: 10px;
}
#password-label{
  position: relative;
}
input:focus{
  outline: none;
  border: 2px solid rgb(171, 171, 202);
}
#password-icon{
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}
#password-icon:hover{
  cursor: pointer;
  color: rgb(171, 171, 202);
}
/* #off{
  display: none;
} */
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
  width: 96%;
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
#create_account,
#connect {
  color: cadetblue;
  font-weight: bold;
  cursor: pointer;
}
.button {
  width: 200px;
  height: 40px;
  background-color: cadetblue;
  border-radius: 10px;
  cursor: pointer;
  margin: 20px auto;
  border: none;
}
.button--disabled {
    background:#cecece;
    color:#ececec
}
.button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
}

</style>