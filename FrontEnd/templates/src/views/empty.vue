<template>
	<div>
	  <ScoreDisplay />
	</div>
  </template>
  
  <script>
  import ScoreDisplay from "./../components/score/score.vue";
  import { getScores, get_win_status } from "./../components/ThreeJS/main.js";
  
  export default {
	components: {
	  ScoreDisplay,
	},
	mounted() {
	  // Exposer la fonction `getScores` globalement pour qu'elle soit accessible dans `ScoreDisplay`
	  window.getScores = getScores;
	  window.get_win_status = get_win_status;
	  // Si besoin, ici tu peux aussi initialiser ton jeu (si ce n'est pas déjà fait ailleurs)
	},
	destroyed() {
		window.location.reload();
		console.log('Le composant est détruit');
	},
  };
  </script>