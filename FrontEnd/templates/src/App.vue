
<template>
  <div id="app" :class="[my_font_size, bgColor, my_daltonism]">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100..700&display=swap" rel="stylesheet">
    <div class="background">
      <TestThreeJS></TestThreeJS>
    </div>
        
    <LanguageSelector></LanguageSelector>
    <nav id="a">
      <button :class="{'nav-toggle': true, 'is-active': isMenuActive}" @click="toggleMenu">
         ☰
      </button>
      <div id="test" :class="{'nav-menu': true, 'is-active': isMenuActive}" >
        <router-link id="right" to="/tictactoe/game" @click.native="closeMenu">A RETIRER</router-link>
        <router-link id="right" to="/home" @click.native="closeMenu">{{ $t('home') }}</router-link>
        <router-link id="right" to="/gameselect" @click.native="closeMenu">{{ $t('game_choose') }}</router-link>
        <router-link id="right" to="/login" @click.native="closeMenu">{{$t('login')}}</router-link>
        <router-link id="right" to="/register" @click.native="closeMenu">{{$t('sign_up')}}</router-link>
        <router-link id="right" to="/player_info" @click.native="closeMenu">{{ $t('player_info') }}</router-link>
        <router-link id="right" to="/about" @click.native="closeMenu">{{$t('about')}}</router-link>
        <router-link id="right" to="/settings" @click.native="closeMenu">{{$t('settings')}}</router-link>
        
      </div>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view v-slot="{ Component, route }" :key="$route.path">
        <component :is="Component" :key="$route.fullPath"></component>
    </router-view>
  </transition>
  </div>
</template>



<script>
// import { get } from 'core-js/core/dict';
import LanguageSelector from './components/language_selector.vue';
import TestThreeJS from './components/ThreeJS/three.vue';
import GlobalJS from './global.js';
import router from './router';
export default {
  components: {
    LanguageSelector,
    GlobalJS,
    TestThreeJS
  },
  data() {
    return {
      isMenuActive: false,
      ...GlobalJS.data.call(this),
      bgColor: localStorage.getItem('my_BG_color') || 'purple',
    };
  },
  methods: {
    ...GlobalJS.methods,
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
    getLanguage() {
      return this.$i18n.locale;
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    closeMenu() {
      this.isMenuActive = false;
    },
  },
  watch: {
    '$i18n.locale': function(newLang) {
      document.documentElement.setAttribute('lang', newLang);
    },
    my_BG_color: function(newColor) {
      localStorage.setItem('my_BG_color', newColor);
      
    }
    
  },
  mounted() {
    document.documentElement.setAttribute('lang', this.getLanguage());
    window.addEventListener('my_BG_color', this.updateGlobalData);
  }
}
</script>
<style lang="scss" src="./App.scss"></style>
