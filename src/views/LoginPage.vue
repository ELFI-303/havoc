<template class="login">
  <div id="login-content">
    <h1 style="">Welcome to our discussion App</h1>
    <form class="form"  @submit.prevent="handleSubmit">
      <fieldset id="inputsl">
        <input  id="username" type="username" name="Username" placeholder="Enter you username" class="ipt" v-model="username" required>
        <input  id="password" type="password" name="Password" placeholder="Password" class="ipt" v-model="password" required>
      </fieldset>
      <fieldset id="actionsl">
        <input  type="submit" id="submit" value="Log in" class="ipt" >
      </fieldset>
      <div></div>
    </form>
    
  </div>
</template>

<script>
/* eslint-disable */ 
import {
  AuthenticationDetails,
  CognitoUser,
  //CognitoUserSession
} from "amazon-cognito-identity-js";
import store from '@/store/store.js'; // Import your Vuex store instance
import router from '@/router/router.js'; // Import your Vue router instance
import UserPool from '@/aws/UserPool.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated;
    },
    posts() {
      return store.getters.posts;
    },
    getUser: state => {
        return state.user;
    },
  },
  methods: {
    handleSubmit() {
      var authenticationData = {
        Username: this.username,
        Password: this.password
      };
      const authDetails = new AuthenticationDetails(authenticationData);
      const userData = {
        Username: this.username,
        Pool: UserPool
      };

      const congnitoUser = new CognitoUser(userData);
      congnitoUser.authenticateUser(authDetails, {
        onSuccess (result) {
            // User authentication was successful
            store.dispatch('connectUser', UserPool.getCurrentUser());
            router.push('/home');
            console.log(congnitoUser);
        },
        onFailure (err) {
            // User authentication was not successful
            console.log('onFailure:', err);
        },
      });
      
    },
  },
};
</script>
<style>
#login-content {
  background-color: rgb(223, 223, 223);
  border: 1px solid rgb(110, 110, 110);
  border-radius: 5px;
  padding: 10px;
  margin: auto;
  width:50%;
  height:200px;
  display:flex;
  flex-direction: column;
}
.form {
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  height:max-content;
}
.ipt {
  margin:10px;
  font-size: large;
}
</style>