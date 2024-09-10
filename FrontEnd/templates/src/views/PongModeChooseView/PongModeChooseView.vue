<template>
	<div class="app">
	  <b-container fluid>
		<div class="spacer"></div>
		<div><h1>{{ $t('game_choose') }}</h1></div>
		<div class="button-container d-flex justify-content-around">
		  <div>
			
			<b-button class="button"><h2>PONG</h2><img src="./../../assets/pong.png" alt="pong logo"></b-button>
		  </div>
		  <div>
			
			<b-button class="button" @click="launchgame()"><h2>{{$t('tournament')}}</h2><img src="./../../assets/tournament_tree.png" alt="tictactoe logo"></b-button>
		  </div>
		</div>
	  </b-container>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
	  }
	},
	methods: {
	  launchgame() {
		this.$router.push('/tournament');
	  }
	}
  }
  </script>
  <style src="./PongModeChooseView.css" scoped></style>