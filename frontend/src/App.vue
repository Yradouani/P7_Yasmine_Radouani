<template>

<router-view></router-view>
</template>

<script>
// import Signin from '@/components/Signin';
// import { ref } from '@vue/reactivity';

export default {
  // name: 'App',
  // components: {
  //   Signin,
  // },
  // setup() {
  //   let users = ref([]);
  //   const saveUser = function (data) {
  //     console.log(data);
  //     users.value = [...users.value, { user: data, id: Date.now() }];
  //     console.log(users.value);
  //   }
  //   return {
  //     saveUser,
  //     users,
  //   }
  // }
}
</script>

<style>
body {
  background-color: rgb(237, 250, 246);
  background-image: url('./sean-pollock-PhYq704ffdA-unsplash.jpg');
  background-size: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
#logo {
  width: 200px;
  height: 200px;
  margin-top: -50px;
  margin-bottom: -50px;
}
</style>
