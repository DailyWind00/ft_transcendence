<template>
	<div id="app">
		<div><h1>Historique des Jeux</h1></div>
	  
	  <table>
		<thead>
		  <tr>
			<th>Date</th>
			<th>Joueur 1</th>
			<th>Joueur 2</th>
			<th>Gagnant</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="game in games" :key="game.date">
			<td>{{ new Date(game.date).toLocaleString() }}</td>
			<td>{{ game.players[0].name }}</td>
			<td>{{ game.players[1].name }}</td>
			<td>{{ game.winner.name }}</td>
		  </tr>
		</tbody>
	  </table>
	</div>
  </template>

<script>
export default {
  name: 'App',
  data() {
    return {
      games: []
    };
  },
  mounted() {
    this.loadGames();
  },
  methods: {
    loadGames() {
      const games = JSON.parse(localStorage.getItem('games')) || [];
      this.games = games;
    }
  }
};
</script>
<style src="./historyVue.css" scoped></style>
