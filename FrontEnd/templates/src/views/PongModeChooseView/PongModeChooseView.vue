<template>
	<div class="app">
	  <b-container fluid>
		<div class="spacer"></div>
		<div><h1>{{ $t('game_choose') }}</h1></div>
		<div class="button-container d-flex justify-content-around">
		  <div>
			
			<b-button class="button"><h2>Search_match</h2><img src="./../../assets/pong.png" alt="pong logo"></b-button>
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

  export default {
	components: {
    GlobalJS,
    SENDJS,
  	},
	data() {
	  return {
	  }
	},
	methods: {
		...sendJSON.methods,
		search_game(){
			this.joinMatchmaking();
		},
		launchtournament() {
		this.$router.push('/tournament');
	  }
	}
  }
  </script>

  <style src="./PongModeChooseView.css" scoped></style>