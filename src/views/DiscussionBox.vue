<template>
  <div v-if="posts && posts.items">
    <button @click="handleSignOut">disconnect</button>
    <div style="background-color:rgb(231, 231, 231);width:50%;height:600px;margin:auto;">
      <h1>Feed of discussion</h1>
      <div style="height:550px;overflow:scroll;background-color:rgb(231, 231, 231);">
        <div v-for="i in posts.items" v-bind:key="i.timestamp_utc_iso8601">
          <div class="box">
            <div class="exp">{{ i.user_id }} :</div>
            <textarea class="mes" v-model="i.message"></textarea>
          </div>
        </div>
      </div>
      <button @click="nextMessages">more messages</button>
    </div>
    <div class="foo">
      <div class="mesbox">
        <form @submit.prevent="handleSubmit">
          <fieldset id="inputs" class="fs">
            <textarea id="message" type="string" name="Message" placeholder="Enter your message"  v-model="message" required></textarea>
          </fieldset>
          <fieldset id="actions" class="fs">
            <input  type="submit" id="submit" value="Envoyer" class="envmes">
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'; // Import your Vuex store instance
import router from '@/router/router.js'; // Import your Vue router instance
import UserPool from '@/aws/UserPool.js';


const aws = require('aws-sdk'); 
aws.config.region = 'eu-west-1';
      const credentials = new aws.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:bbi3cqg9ld',
      })
      const locationClient = new aws.Location({
        credentials,
      })
const dynamodb = new aws.DynamoDB({credentials: credentials, region: locationClient.config.region});
const TableName = 'test_hellolambda/message';

export default {
  name: 'DiscussionBox',
  data() {
    return {
      user_id: '',
      message: '',
    };
  },
  methods: {
    handleSignOut() {
      const cognitoUser = UserPool.getCurrentUser();
      console.log(cognitoUser);
      if (cognitoUser) {
        cognitoUser.signOut();
        store.dispatch('logOut');
        router.push('/login');
      }
    },
    nextMessages() {
      const cursor = this.posts.next_cursor;
      store.dispatch('loadPosts',cursor);
    },
    async handleSubmit() {
      
      const requestBody = {

      }
      const params = {
        TableName: TableName,
        Item: requestBody,
      }
      
      return await dynamodb.putItem(params).promise().then(() => {
        return params.Item;
      }).catch((error) => {
        console.log(error);
        return error;
      });
      /*
      process.env.AWS_ACCESS_KEY_ID = 'bbi3cqg9ld';
      process.env.AWS_REGION = 'eu-west-1';
      //const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
      const axios = require("axios");
      const dynamoDBClient = new DynamoDBClient({ 
            endpoint: 'http://localhost:8080/',
            forcePathStyle: false,
            region: 'eu-west-1',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
            }
          });
        try {
        const command = new ListTablesCommand({});
        const results = await dynamoDBClient.send(command);
        console.log(results.TableNames.join("\n"));
         
        // Remplacez dataPost par les données que vous souhaitez envoyer à la fonction Lambda
        
        const dataPost = { user_id: "boubiboubibouuu",message: "Hello World" };
      
        // Remplacez l'URL par l'URL de votre API Gateway et endpoint approprié
        const lambdaURL = "http://localhost:8080/test_hellolambda/message";
        try {  
        const response = await axios.post(lambdaURL, dataPost);
        console.log(response.data);
        } catch (error) {
          console.error("Error:", error.message || error);
        }
      */
    },
  },
  computed: {
    posts() {
    const posts = store.getters.posts;
    return posts;
    },
    isAuthenticated() {
      return store.getters.isAuthenticated;
    },
  },
  async created() {
    // Dispatch the action and wait for it to complete before rendering
    await store.dispatch('loadPosts');
  },
};
</script>

<style>
.box {
  background-color: white;
  border: 1px solid rgb(110, 110, 110);
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  display:flex;
  flex-direction: row;
}
.exp {
  font-weight: bold;
  font-size: 20px;
  width: 30%;
  height:30px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgb(226, 226, 226);
}
.mes {
  font-size: 15px;
  padding: 5px;
  margin:5px;
  width:50%;
  max-width: 60%;
}
.foo{
  height: 200px;
  background-color: royalblue;
  position: relative;
  width: 50%;
  margin-top: 50px;
  margin-left:auto;
  margin-right:auto;
  }
  .mesbox{
    width:max-content;
    height:max-content;
    margin:auto;
  }
  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
  }
  form {
    display:flex;
    flex-direction: row;
  }
  h1 {
    background-color: royalblue;
  }
  #message{
    width: 140%;
    max-width: 140%;
    min-width: 140%;
    height: 70%;
    max-height: 70%;
    min-height: 70%;
    margin-top:12.5px;
    border-radius: 5px;
    padding: 5px;
    font-size: 20px;
  }
  .envmes{
    margin-top:150px;
    margin-left:50px;
    border-radius: 5px;
    padding: 5px;
  }
</style>