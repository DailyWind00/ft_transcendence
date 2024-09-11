<template>
	<div id="app">
	  <div><h1>{{$t('game_history')}}</h1></div>
	
	  <table>
		<thead>
		  <tr>
			<th>Date</th>
			<th>{{$t('player1')}}</th>
			<th>{{$t('player2')}}</th>
			<th>{{$t('winner')}}</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="game in recentGames" :key="game.date">
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
	computed: {
	  recentGames() {
		return this.games.slice(-10).reverse();
	  }
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
  
<style src="./historyVue.css" scoped></style>
