<style src="./RegisterView.css" scoped></style>

<template>
	  <b-container fluid class="container d-flex justify-content-center align-items-center">
    <!-- Image de fond -->
    <b-card class="login-page text-center" text-variant="dark">
      <h1>{{$t('create_account')}}</h1>
      <b-form >
        <div>
          <b-form-input
            id="username-input"
            class="b_form_input"
            type="text"
            :placeholder="$t('enter_username')"
            required
          ></b-form-input>
          <b-form-input
            class="b_form_input"
            id="password-input"
            type="password"
            :placeholder="$t('enter_password')"
            required
          ></b-form-input>
          <b-form-input
            class="b_form_input"
            id="password-input"
            type="password"
            :placeholder="$t('enter_passwordx2')"
            required
          ></b-form-input>
        </div>
        <b-button class="btn_login btn-primary ">{{$t('create_account')}}</b-button>
        <div class="btn_register"><router-link class="btn_register" to="/login">{{$t('login')}}</router-link></div>
        
      </b-form>
    </b-card>
  </b-container>
  </template>
