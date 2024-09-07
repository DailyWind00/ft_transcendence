<style src="./RegisterView.css" scoped></style>

<template>
  <b-container fluid class="container d-flex justify-content-center align-items-center" :class="[my_font_size, my_BG_color]">
    <b-card class="login-page text-center" text-variant="dark">
      <h1>{{$t('create_account')}}</h1>
      <b-form @submit.prevent="sendJSON">
        <div>
          <b-form-input
            v-size-placeholder
            v-model="username"
            id="username-input"
            class="b_form_input"
            type="text"
            :placeholder="$t('enter_username')"
            required
          ></b-form-input>
          <b-form-input
            v-size-placeholder
            v-model="password"
            class="b_form_input"
            id="password-input"
            type="password"
            :placeholder="$t('enter_password')"
            required
          ></b-form-input>
          <b-form-input
            v-size-placeholder
            v-model="password_2"
            class="b_form_input"
            id="password-input_2"
            type="password"
            :placeholder="$t('enter_passwordx2')"
            required
          ></b-form-input>
        </div>
        <b-button type="submit" class="btn_login btn-primary ">{{$t('create_account')}}</b-button>
        <div class="btn_register"><router-link class="btn_register" to="/login">{{$t('login')}}</router-link></div>
      </b-form>
    </b-card>
    <button @click="test()">test</button>
  </b-container>
</template>


<script>
import GlobalJS from './../../global.js';
import sendJSON from './../../send_JSON.js';

export default {
  components: {
    GlobalJS,
    sendJSON
  },
  directives: {
    sizePlaceholder: {
      inserted(el) {
        const input = el.querySelector('input');
        if (input && input.placeholder) {
          input.setAttribute('size', input.placeholder.length);
        }
      }
    }
  },
  data() {
    return {
      ...sendJSON.data.call(this),
      ...GlobalJS.data.call(this),
    };
  },
  methods: {
    ...sendJSON.methods,
    ...GlobalJS.methods,
    sendJSON() {
    if (this.password !== this.password_2) {
      this.$toast.error(this.$t('password_mismatch'), {
      position: "top-center",
      timeout: 2990,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 2,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    });
    }
    else {
    const data = JSON.stringify({
      "username": this.username,
      "password": this.password
    });
    this.sendRequestRegister(data);
    
    }
  },
  test() {
    console.log('test');
    this.$router.push('/gameselect');
  },
}
};
</script>

<script>
import GlobalJS from './../../global.js';
import sendJSON from './../../send_JSON.js';

export default {
  mixins: [GlobalJS, sendJSON], // Use mixins instead of components
  directives: {
    sizePlaceholder: {
      inserted(el) {
        const input = el.querySelector('input');
        if (input && input.placeholder) {
          input.setAttribute('size', input.placeholder.length);
        }
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    sendJSON() {
      if (this.password !== this.password_2) {
      this.$toast.error(this.$t('password_mismatch'), {
      position: "top-center",
      timeout: 2990,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 2,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    });
    }
    else {
      const data = JSON.stringify({
        username: this.username,
        password: this.password
      });
      this.sendRequestRegister(data);
    }
  }
  }
};
</script>
