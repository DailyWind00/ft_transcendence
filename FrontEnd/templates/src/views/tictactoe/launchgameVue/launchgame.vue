<template>
	<div class="app" :class="my_BG_color">
		<h1>{{$t('player_names')}}</h1>
		<b-form @submit.prevent="store_name">
			<b-form-input
				maxlength="10"
				class="input"
				v-model="player_1"
				type="text"
				:placeholder="$t('player_1')"
				required
			></b-form-input>
			<b-form-input
				maxlength="10"
				class="input"
				v-model="player_2"
				type="text"
				:placeholder="$t('player_2')"
				required
			></b-form-input>
			<b-button type="submit" class="btn_login btn-primary button" >{{$t('launch_tictactoe')}}</b-button>
			<div id="right"><router-link  to="/tictactoe/history">{{$t('history')}}</router-link></div>
			
		</b-form>
	</div>
</template>

<script>
import GlobalJS from './../../../global.js';

export default {
	components: {
    GlobalJS,
  },
	data() {
		return {
			player_1: 'player_1',
			player_2: 'player_2'
		}
	},
	methods: {
		store_name() {
			localStorage.setItem('player1', this.player_1);
			localStorage.setItem('player2', this.player_2);

			console.log('Player names stored:', this.player_1, this.player_2);
			this.$router.push('/tictactoe/game');
		}
	}
}
</script>

<style src="./launchgame.css" scoped></style>