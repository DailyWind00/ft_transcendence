<style src="./LoginView.css" scoped></style>

<template>
  <b-container fluid class="d-flex justify-content-center align-items-center">
    <!-- Image de fond -->
    <b-card class="login-page" text-variant="dark">
      <h1>{{$t('login')}}</h1>
      <b-form @submit.prevent="handleSubmit">
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
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      alert(`Nom d'utilisateur: ${this.username}\nMot de passe: ${this.password}`);
    }
  }
}
</script>

<style scoped src="./LoginView.css"></style>
