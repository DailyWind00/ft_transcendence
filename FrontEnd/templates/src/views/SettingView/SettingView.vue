<style src="./SettingView.css" scoped></style>

<template>
<div class="app">
	<div class="settings">
		<h1>Settings</h1>
		<div style="margin-bottom: 10vh"></div>
		<div class="font_size">
			<h2>Font Size :</h2>
			<b-button id="small"class="button" @click="setFontSize('small')">Small</b-button>
			<b-button id="medium"class="button" @click="setFontSize('medium')">Medium</b-button>
			<b-button id="large"class="button" @click="setFontSize('large')">Large</b-button>
		</div>
		
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      fontSizeClass: 'medium-font'
    };
  },
  methods: {
    setFontSize(size) {
      this.fontSizeClass = `${size}-font`;
    }
  }
};
</script>