<template>
	<div class="score-display">
	  <h1>Score</h1>
	  <p>{{ playername }}: {{ player1Score }}</p>
	  <p>{{ playername2 }}: {{ player2Score }}</p>
	</div>
  </template>
  
  <script>
import SENDJS from './../../send_JSON.js';


  export default {
	components: {
    SENDJS,
  },
	data() {
	  return {
		player1Score: 0,
		playername: localStorage.getItem("tournament_name_1") || "Player 1",
		playername2: localStorage.getItem("tournament_name_2") || "Player 2",
		player2Score: 0,
		scoreUpdater: null,
		winstatus: 0,
	  };
	},
	methods: {
		...SENDJS.methods,
	  // Méthode qui récupère les scores depuis le fichier JavaScript de ton jeu
	  updateScores() {
		const scores = this.getScoresFromGame();
		this.player1Score = scores.player1;
		this.player2Score = scores.player2;
	  },
	  updatewinstatus() {
		this.winstatus = this.get_winfromGame();
		if (this.winstatus == 1 || this.winstatus == 2) {
			localStorage.setItem("left_score", this.player1Score);
			localStorage.setItem("right_score", this.player2Score);
			if (this.winstatus == 1) {
				localStorage.setItem("winner_name", "Player 1");
			} else {
				localStorage.setItem("winner_name", "Player 2");
			}
			let str = this.player1Score + " - " + this.player2Score;
			let win_or_not = this.winstatus == 1 ? true : false;
			const data = JSON.stringify({
			"score": str,
			"is_user_winner": win_or_not
			});
			this.set_match_in_history(data);
			this.$router.push('/win');
			window.location.reload();
		}
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
	top: 10px;
    left: 50%;
    transform: translateX(-50%);
	color: white;
	font-size: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px;
	border-radius: 10px;
  }
  </style>