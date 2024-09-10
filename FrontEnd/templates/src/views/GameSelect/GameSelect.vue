<template>
  <div class="app">
    <b-container fluid>
      <div class="spacer"></div>
      <div><h1>{{ $t('game_choose') }}</h1></div>
      <div class="button-container d-flex justify-content-around">
        <div>
          
          <b-button class="button" @click="launchpong()"><h2>PONG</h2><img src="./../../assets/pong.png" alt="pong logo"></b-button>
        </div>
        <div>
          
          <b-button class="button" @click="launchtictactoe()"><h2>{{$t('tictactoe')}}</h2><img src="./../../assets/tictactoe.png" alt="tictactoe logo"></b-button>
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
    launchtictactoe() {
      this.$router.push('/tictactoe/launch');
    },
    launchpong() {
      this.$router.push('/Pong_mode_choose');
    },
  }
}
</script>
<style src="./GameSelect.css" scoped></style>