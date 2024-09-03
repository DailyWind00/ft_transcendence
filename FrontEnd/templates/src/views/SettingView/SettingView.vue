<style src="./SettingView.css" scoped></style>

<template>
<div class="app" :class="[my_font_size, my_BG_color]">
	<div class="settings">
		<h1>Settings</h1>
		<div style="margin-bottom: 10vh"></div>
		<div id="selector"class="font_size">
			<h2>Font Size :</h2>
			<b-button id="small"class="button" @click="set_font_size('small')">Small</b-button>
			<b-button id="medium"class="button" @click="set_font_size('medium')">Medium</b-button>
			<b-button id="large"class="button" @click="set_font_size('large')">Large</b-button>
		</div>
		<div id="selector" class="color_choose">
			<h2>Color :</h2>
			<b-button id="purple" class="button" @click="set_BG_color('purple')">Purple</b-button>
			<b-button id="green" class="button"@click="set_BG_color('green')">Green</b-button>
			<b-button id="yellow" class="button"@click="set_BG_color('yellow')">Yellow</b-button>
		</div>
		
	</div>
</div>
</template>

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