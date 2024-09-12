<template>
	<div class="score-display">
	  <h1>Score</h1>
	  <p>Joueur 1: {{ player1Score }}</p>
	  <p>Joueur 2: {{ player2Score }}</p>
	  <p>winnier: {{ winstatus }}</p>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		player1Score: 0,
		player2Score: 0,
		scoreUpdater: null,
		winstatus: 0,
	  };
	},
	methods: {
	  // Méthode qui récupère les scores depuis le fichier JavaScript de ton jeu
	  updateScores() {
		const scores = this.getScoresFromGame();
		this.player1Score = scores.player1;
		this.player2Score = scores.player2;
	  },
	  updatewinstatus() {
		this.winstatus = this.get_winfromGame();
	  },
	  // Appel de la fonction du jeu pour récupérer les scores
	  getScoresFromGame() {
		return window.getScores(); // Assure-toi que `getScores` est exposé globalement
	  },
	  get_winfromGame() {
		return window.get_win_status();
	  },
	},
	mounted() {
	  // Mettre à jour les scores toutes les 100ms
	  this.scoreUpdater = setInterval(() => {
		this.updateScores();
		this.updatewinstatus();
	  }, 100);
	},
	beforeUnmount() {
	  // Nettoyage de l'intervalle pour éviter les fuites de mémoire
	  if (this.scoreUpdater) {
		clearInterval(this.scoreUpdater);
	  }
	},
  };
  </script>
  
  <style scoped>
  .score-display {
	position: absolute;
	top: 40%;
	left: 40%;
	transform: translate(-50%, -50%);
	color: white;
	font-size: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px;
	border-radius: 10px;
  }
  </style>