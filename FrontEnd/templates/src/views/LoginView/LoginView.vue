<style src="./LoginView.css" scoped></style>

<template>
  <b-container fluid class="d-flex justify-content-center align-items-center">
    <!-- Image de fond -->
    <b-card class="login-page" text-variant="dark">
      <h1>{{$t('login')}}</h1>
      <b-form @submit.prevent="sendJSON">
        <div>
          <b-form-input
            id="username-input"
            class="b_form_input"
            type="text"
            aria-required="true"
            v-model="username"
            :placeholder="$t('enter_username')"
            required
          ></b-form-input>
          <b-form-input
            label="password_input"
            aria-required="true"
            class="b_form_input"
            id="password-input"
            type="password"
            v-model="password"
            :placeholder="$t('enter_password')"
            required
          ></b-form-input>
        </div>
        <b-button type="submit" class="btn_login btn-primary">{{$t('login')}}</b-button>
        <div class="btn_register">
          <router-link class="btn_register" to="/register">{{$t('create_account')}}</router-link>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>



<script>
import GlobalJS from './../../global.js';
import sendJSON from './../../send_JSON.js';

export default {
  mixins: [GlobalJS, sendJSON],
  directives: {
    sizePlaceholder: {
      inserted(el) {
        const input = el.querySelector('input');
        if (input && input.placeholder) {
          input.setAttribute('size', input.placeholder.length);
        }
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    sendJSON() {
      const data = JSON.stringify({
        username: this.username,
        password: this.password
      });
      this.sendRequestLogin(data);
    }
  }
};
</script>
<!-- <script>
export default {
	data() {
	  return {
		username: '',
		password: '',
		responseMessage: '' // Ajout d'une variable pour afficher la réponse
	  };
	},
	methods: {
  sendJSON() {
    // Ensure the values are correctly extracted
    const data = JSON.stringify({ 
      "username": this.username, 
      "password": this.password 
    });
    
    // Debugging with a properly formatted alert
    alert(`bite, username: ${this.username}, password: ${this.password}`);
    
    let xhr = new XMLHttpRequest();
    let url = "dj-rest-auth/login"; // Ensure this URL is correct
  
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  
    // Using an arrow function to retain the `this` context
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.responseMessage = xhr.responseText; // Storing the response
        } else {
          this.responseMessage = `Erreur: ${xhr.status}`;
        }
      }
    };
    
    xhr.send(data);
  }
}
  };</script> -->

<style scoped src="./LoginView.css"></style>
