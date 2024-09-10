<style src="./SettingView.css" scoped></style>

<template>
<div class="app" :class="[my_font_size, my_BG_color]">
	<div class="settings">
		<h1>{{ $t('settings') }}</h1>
		<div style="margin-bottom: 10vh"></div>	
		<div id="selector"class="font_size">
			<h2>{{ $t('font_size') }} :</h2>
			<b-button id="small"class="button" @click="set_font_size('small')">{{ $t('small') }}</b-button>
			<b-button id="medium"class="button" @click="set_font_size('medium')">{{ $t('medium') }}</b-button>
			<b-button id="large"class="button" @click="set_font_size('large')">{{ $t('large') }}</b-button>
		</div>
		<div id="selector" class="color_choose">
			<h2>{{ $t('color') }} :</h2>
			<b-button id="purple" class="button" @click="set_BG_color('purple')">{{ $t('purple') }}</b-button>
			<b-button id="green" class="button"@click="set_BG_color('green')">{{ $t('green') }}</b-button>
			<b-button id="yellow" class="button"@click="set_BG_color('yellow')">{{ $t('orange') }}</b-button>
		</div>
		<div id="selector" class="daltonism">
			<h2>{{$t('daltonism')}} :</h2>
			<b-button id="Daltonisme" class="button" @click="set_daltonism('without')">{{ $t('without') }}</b-button>
			<b-button id="Deuteranopia" class="button" @click="set_daltonism('d')">{{ $t('deuteranopia') }}</b-button>
			<b-button id="Protanopia" class="button" @click="set_daltonism('p')">{{ $t('protanopia') }}</b-button>
			<b-button id="Tritanopia" class="button" @click="set_daltonism('t')">{{ $t('tritanopie') }}</b-button>
		</div>
		<div id="selector">
			<h2>{{$t('data_options')}} :</h2>
			<b-button id="delete" class="button" @click="delete_data">{{ $t('delete_account') }}</b-button>
			<b-button id="anonimyse" class="button" @click="anonimyse_data">{{ $t('anonymize_account') }}</b-button>
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