<template>
  <div class="oui" :class="[my_font_size, my_BG_color]">
    <h1>{{ winner_name }} {{ $t('win') }}</h1>
    <h2>{{ $t('score') }}</h2>
    <h3>{{ left_score }} : {{ right_score }}</h3>
    <b-button class="btn" @click="goToHome">{{ $t('game_select') }}</b-button>
	<b-button class="btn" @click="goToTournament">{{ $t('tournament') }}</b-button>
  </div>
</template>

<script>
import GlobalJS from './../../global.js';

export default {
  components: {
    GlobalJS
  },
  data() {
    return {
      ...GlobalJS.data.call(this),
	  left_score: this.get_left_score(),
	  right_score: this.get_right_score(),
	  winner_name: this.get_winner_name(),
    };
  },
  methods: {
    ...GlobalJS.methods,
	goToHome(){
			this.$router.push('./../gameselect');
		},
	goToTournament(){
			this.$router.push('./../tournament');
		},
	get_left_score: function() {
		const left_score = localStorage.getItem('left_score') || 5;
		return left_score;
	},
	get_right_score: function() {
		const right_score = localStorage.getItem('right_score') || 5;
		return right_score;
	},
	get_winner_name: function() {
		const winner_name = localStorage.getItem('winner_name') || 'Player 1';
		return winner_name;
	},

  },
  mounted(){
	
  },
  watch: {
	g_left_score: function() {
			localStorage.setItem("left_score", this.left_score);
	},
	g_right_score: function() {
			localStorage.setItem("right_score", this.right_score);
	},
	g_winner_name: function() {
			localStorage.setItem("winner_name", this.winner_name);
	},
  }
}
</script>

<style src="./Winning.css" scoped></style>