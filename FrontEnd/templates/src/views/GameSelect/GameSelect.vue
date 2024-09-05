<template>
  <div class="app">
    <b-container fluid>
      <div class="spacer"></div>
      <div><h1>{{ $t('game_choose') }}</h1></div>
      <div class="button-container d-flex justify-content-around">
        <div>
          
          <b-button class="button"><h2>PONG</h2><img src="./../../assets/pong.png" alt="pong logo"></b-button>
        </div>
        <div>
          
          <b-button class="button"><h2>TICTACTOE</h2><img src="./../../assets/tictactoe.png" alt="tictactoe logo"></b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<style src="./GameSelect.css" scoped></style>