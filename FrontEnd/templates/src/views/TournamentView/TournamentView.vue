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
	created() {
	  const savedPlayers = localStorage.getItem("tournament_players");
	  if (savedPlayers) {
		this.players = JSON.parse(savedPlayers);
	  }
	},
	methods: {
	  savePlayers() {
		localStorage.setItem("tournament_players", JSON.stringify(this.players));
	  },
	},
  };
  </script>

<style src="./TournamentView.css" scoped>
</style>