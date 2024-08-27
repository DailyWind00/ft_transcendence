<template>
  <div class="container">
    <div class="logo-container">
      <img src="../../assets/logo1.png" alt="ft_transcendence logo" />
    </div>
    <div class="spacer"></div>
    <div class="button_container">
      <router-link class="button" href="#" style="--color:#800080" to="/register">{{$t('sign_up')}}</router-link>
      <span></span>
      
    </div>
    <div style="margin-top: 15vh;"></div>
    <div class="button_container">
      <router-link class="button" href="#" style="--color:#800080" to="/login">{{$t('login')}}</router-link>
      <span></span>
      
    </div>
  </div>
</template>

<style src="./HomeView.css" scoped></style>