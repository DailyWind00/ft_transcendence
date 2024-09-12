<template>
	<div class="app">
	  <b-container fluid>
		<div class="spacer"></div>
		<div><h1>{{ $t('game_choose') }}</h1></div>
		<div class="button-container d-flex justify-content-around">
		  <div>
			
			<b-button class="button" @click="search_game_online()" ><h2>online</h2><img src="./../../assets/pong.png" alt="pong logo"></b-button>
		  </div>
		  <div>
			<b-button class="button" @click="search_game_local()" ><h2>local</h2><img src="./../../assets/pong.png" alt="pong logo"></b-button>
		  </div>
		  <div>
			
			<b-button class="button" @click="launchtournament()"><h2>{{$t('tournament')}}</h2><img src="./../../assets/tournament_tree.png" alt="tictactoe logo"></b-button>
		  </div>
		</div>
	  </b-container>
	</div>
  </template>
  
  <script>
  import sendJSON from './../../send_JSON.js';
  import GlobalJS from './../../global.js';
  import {initGame, playLocal} from './../../components/ThreeJS/main.js';
  

  export default {
	components: {
    GlobalJS,
    sendJSON,
  	},
	data() {
	  return {
	  }
	},
	methods: {

		...sendJSON.methods,
		search_game_online(){
			// this.joinMatchmaking();
			initGame();
		},
		async search_game_local(){
			initGame();
			this.joinMatchmaking();
			this.$router.push('/empty');
			await this.waitFor(5000);
			playLocal();
		},
		launchtournament() {
		this.$router.push('/tournament');
	  },
	  waitFor(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
	}
  }
  </script>

  <style src="./PongModeChooseView.css" scoped></style>
