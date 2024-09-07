<template>
  <div class="container" :class="[my_font_size, my_BG_color]"> 
    <div class="logo-container">
      <img src="../../assets/logo1.png" alt="ft_transcendence logo" />
    </div>
    <div class="spacer"></div>
    <div class="button_container">
      <router-link class="button" href="#"  to="/register">{{$t('sign_up')}}</router-link>
      <span></span>
      
    </div>
    <div style="margin-top: 15vh;"></div>
    <div class="button_container">
      <router-link class="button" href="#"  to="/login">{{$t('login')}}</router-link>
      <span></span>
    </div>
  </div>
</template>

<style src="./HomeView.css" scoped></style>
<script>
import GlobalJS from './../../global.js';

export default {
  components: {
    GlobalJS
  },
  data() {
    return {
      ...GlobalJS.data.call(this),
    };
  },
  methods: {
    ...GlobalJS.methods,
  },
}
</script>