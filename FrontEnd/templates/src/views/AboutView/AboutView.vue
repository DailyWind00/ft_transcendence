<template>
  <div class="app">
    <div class="zone" :class="[my_font_size, my_BG_color]">
        <h1>{{ $t('presentation') }}</h1>
    </div>
    <div class="zone">
    <div class="people" id="ber">
      <p>Bérengère Lebas : </p>
      <a href="https://profile.intra.42.fr/users/blebas">
          <img class="img" src="./../../assets/42logo.png" alt="Link Image" />
        </a>
        <a href="https://github.com/DailyWind00/">
          <img class="img" src="./../../assets/gitlogo.png" alt="Link Image" />
        </a>
        <a href="www.linkedin.com/in/valentin-soltys-a28647300">
          <img class="img " src="./../../assets/linklogo.png" alt="Link Image" />
        </a>
    </div>
    <div class="people" id="alex">
      <p>Alexis Bailleul : </p>
      <a href="https://profile.intra.42.fr/users/abailleu">
          <img class="img" src="./../../assets/42logo.png" alt="Link Image" />
        </a>
        <a href="https://github.com/Ichibi05/">
          <img class="img" src="./../../assets/gitlogo.png" alt="Link Image" />
        </a>
        <a href="www.linkedin.com/in/valentin-soltys-a28647300">
          <img class="img " src="./../../assets/linklogo.png" alt="Link Image" />
        </a>
    </div>
    <div class="people" id="anto">
      <p>Anthony Liaudet : </p>
      <a href="https://profile.intra.42.fr/users/aliaudet">
          <img class="img" src="./../../assets/42logo.png" alt="Link Image" />
        </a>
        <a href="https://github.com/HaSYxD/">
          <img class="img" src="./../../assets/gitlogo.png" alt="Link Image" />
        </a>
        <a href="www.linkedin.com/in/valentin-soltys-a28647300">
          <img class="img " src="./../../assets/linklogo.png" alt="Link Image" />
        </a>
    </div>
    <div class="people" id="mael">
      <p>Mael Gallais : </p>
      <a href="https://profile.intra.42.fr/users/mgallais">
          <img class="img" src="./../../assets/42logo.png" alt="Link Image" />
        </a>
        <a href="https://github.com/DailyWind00/">
          <img class="img" src="./../../assets/gitlogo.png" alt="Link Image" />
        </a>
        <a href="www.linkedin.com/in/valentin-soltys-a28647300">
          <img class="img " src="./../../assets/linklogo.png" alt="Link Image" />
        </a>
    </div>
    <div class="people" id="aurel">
      <p>Aurélien Fromont : </p>
      <a href="https://profile.intra.42.fr/users/afromont">
          <img class="img" src="./../../assets/42logo.png" alt="Link Image" />
        </a>
        <a href="https://github.com/DailyWind00/">
          <img class="img" src="./../../assets/gitlogo.png" alt="Link Image" />
        </a>
        <a href="www.linkedin.com/in/valentin-soltys-a28647300">
          <img class="img " src="./../../assets/linklogo.png" alt="Link Image" />
        </a>
    </div>
    <div class="people" id="val">
      <p>Valentin Soltys : </p>
      <a href="https://profile.intra.42.fr/users/vsoltys">
          <img class="img" src="./../../assets/42logo.png" alt="Link Image" />
        </a>
        <a href="https://github.com/tuvosyl/">
          <img class="img" src="./../../assets/gitlogo.png" alt="Link Image" />
        </a>
        <a href="www.linkedin.com/in/valentin-soltys-a28647300">
          <img class="img " src="./../../assets/linklogo.png" alt="Link Image" />
        </a>
    </div>
  </div>
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
    };
  },
  methods: {
    ...GlobalJS.methods,
  },
}
</script>

<style src="./AboutView.css" scoped></style>