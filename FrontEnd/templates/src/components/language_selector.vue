<template>
	<div class="language-selector-container">
	  <div class="custom-select" @click="toggleDropdown">
		<div class="selected-option">
		  <img :src="flags[selectedLanguage]" class="flag-icon" alt="naguage_selection" />
		</div>
		<div v-if="isOpen" class="options">
		  <div v-for="(flag, lang) in flags" :key="lang" class="option" @click="selectLanguage(lang), toggleDropdown()">
			<img :src="flag" class="flag-icon" alt="languageNames[lang]" />
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
export default {
  name: 'LanguageSelector',
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      isOpen: false,
      flags: {
        'fr': require('@/assets/fr.png'),
        'en': require('@/assets/en.png')
      }
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectLanguage(lang) {
      this.$i18n.locale = lang;
      this.selectedLanguage = lang;
      this.isOpen = false;
    }
  }
}
  </script>

<style src="./language_selector.css" scoped></style>