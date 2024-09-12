<template>
	<div class="tournament">
	  <h1>{{ $t('tournament') }}</h1>
  
	  <form @submit.prevent="savePlayers">
		<div v-for="(player, index) in players" :key="index">
		  <label :for="'player-' + index">{{$t('player')}} {{ index + 1 }} :</label>
		  <input
			type="text"
			v-model="players[index].name"
			:id="'player-' + index"
			:placeholder="$t('enter_a_name')"
			maxlength="10"
			minlength="3"
			required
		  />
		</div>
		<button type="submit">{{$t('save_players')}}</button>
	  </form>
	</div>
  </template>
  
  <script>
import {initGame, playDefault, playLocal} from './../../components/ThreeJS/main.js';
  export default {
	data() {
	  return {
		players: [
		  { name: "" },
		  { name: "" },
		  { name: "" },
		  { name: "" },
		],
	  };
	},
	async created() {
	  const savedPlayers = localStorage.getItem("tournament_players");
	  if (savedPlayers) {
		this.players = JSON.parse(savedPlayers);
	  }
	  
	  const round = localStorage.getItem("tournament_round");
	  
	  if (round == 0) {
		alert(this.players[0].name + " vs " + this.players[2].name);
		localStorage.setItem("tournament_round", 1);
		initGame();
		this.$router.push('/empty');
		await this.waitFor(5000);
		playLocal();
		if (localStorage.getItem("winner_name") == "Player 1") {
		  localStorage.setItem("tournament_first_round", this.players[0].name);
		} else {
		  localStorage.setItem("tournament_first_round", this.players[2].name);
		}
	  } else if (round == 1) {
		alert(this.players[1].name + " vs " + this.players[3].name);
		localStorage.setItem("tournament_round", 2);
		initGame();
		this.$router.push('/empty');
		await this.waitFor(5000);
		playLocal();
		if (localStorage.getItem("winner_name") == "Player 1") {
		  localStorage.setItem("tournament_second_round", this.players[1].name);
		} else {
		  localStorage.setItem("tournament_second_round", this.players[3].name);
		}
	  } else if (round == 2) {
		alert(localStorage.getItem("tournament_first_round") + " vs " + localStorage.getItem("tournament_second_round"));
		localStorage.removeItem("tournament_round");
		localStorage.removeItem("tournament_first_round");
		localStorage.removeItem("tournament_second_round");
		initGame();
		this.$router.push('/empty');
		await this.waitFor(5000);
		playLocal();
	  }
	},
	methods: {
	  savePlayers() {
		localStorage.setItem("tournament_players", JSON.stringify(this.players));
		localStorage.setItem("tournament_round", 0);
		window.location.reload();
	  },
	  waitFor(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  },
	},
  };
  </script>
  
  <style src="./TournamentView.css" scoped>
  </style>