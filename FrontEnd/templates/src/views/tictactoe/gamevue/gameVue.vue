<template>
	
<div id="global">
		<!-- <winningvue id ="marche_fdp" class="WinningVue" hidden></winningvue> -->
		<div class="app">
	  <h1>{{$t('tictactoe')}}</h1>
	  
	  <div id="grid">
		<div id="c1" class="case"></div>
		<div id="c2" class="case"></div>
		<div id="c3" class="case"></div>
		<div id="c4" class="case"></div>
		<div id="c5" class="case"></div>
		<div id="c6" class="case"></div>
		<div id="c7" class="case"></div>
		<div id="c8" class="case"></div>
		<div id="c9" class="case"></div>
	  </div>
	  <div id="score">
		<p>{{$t('tour')}} <span id="player">{{ player1 }}</span></p>
		<p>score {{ player1 }}: <span id="score1">0</span></p>
		<p>score {{ player2 }}: <span id="score2">0</span></p>
		<p>{{$t('equality')}} : <span id="score3">0</span></p>
	  </div>
	  
	</div>
	<button id="button_hidden" @click="change_route()" hidden>test</button>
</div>
	
  </template>

<style src="./gameVue.css" scoped></style>

<script defer>
import winningvue from './../../../components/Winningvue/Winning.vue';
export default {
	components: {
		winningvue
	},
	data() {
		return {
			renderComponent: 0,
			player1: localStorage.getItem('player1') || 'player 1',
			player2: localStorage.getItem('player2') || 'player 2',
		}
	},
  name: 'GameVue',
  mounted() {
    const script = document.createElement('script');
    script.src = require('./gameVue.js');
  },
  methods: {
	reset() {
	  localStorage.removeItem('player1');
	  localStorage.removeItem('player2');
	  this.player1 = 'player 1';
	  this.player2 = 'player 2';
	},
	change_route() {
		this.$router.push('/gameselect');
	}
}
}
</script>


