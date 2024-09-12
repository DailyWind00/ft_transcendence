<template id="test">
  <div id="app" :class="[my_font_size, my_BG_color]">
    <div class="picture_info">
      <div id="settings">
        <b-button id="delete" class="button" @click="delete_confirm">{{ $t('delete_account') }}</b-button>
        <b-button id="anonimyse" class="button" @click="anonymise_confirm">{{ $t('anonymize_account') }}</b-button>
        <b-button id="disconnect" class="button" @click="disconnect_confirm">{{ $t('disconnect') }}</b-button>
      </div>
      <div id="info">
        <h1>name : {{player_name}}</h1>
        <p>ID: {{id}}</p>
      </div>
    </div>
    <div class="history">
      <p>History</p>
      <table v-if="match_history.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Score</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in match_history" :key="match.id">
            <td>{{ match.id }}</td>
            <td>{{ match.score }}</td>
            <td>{{ match.is_user_winner ? 'Won' : 'Lost' }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No match history available.</p>
    </div>
  </div>
  </template>


<!-- <script src="./../../global.js" ></script> -->
<style src="./Player_info.css" scoped></style> 
<script>
import GlobalJS from './../../global.js';
import SENDJS from './../../send_JSON.js';

export default {
  components: {
    GlobalJS,
    SENDJS,
  },
  data() {
    return {
      player_name: 'not logged in',
      id: 'not logged in',
      match_history: [], // Initialize match history as an empty array
      ...GlobalJS.data.call(this),
    };
  },
    created() {
      this.getUserProfile()
        .then(responseText => {
          let profileData = JSON.parse(responseText);
          console.log('Profile Data:', profileData);
          this.$nextTick(() => {
            this.player_name = profileData.username;
            this.id = profileData.id;
            console.log('Profile fetched:', this.player_name, ' ID:', this.id);
          });
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });

      this.get_match_history()
        .then(responseText => {
          let match_history = JSON.parse(responseText);
          console.log('Match History:', match_history);
          this.$nextTick(() => {
            this.match_history = match_history; // Store match history data
            console.log('Match history fetched:', this.match_history);
          });
        })
        .catch(error => {
          console.error('Error fetching match history:', error);
        });
    },
    methods: {
      ...GlobalJS.methods,
      ...SENDJS.methods,
      delete_confirm() {
        if (confirm('Are you sure you want to delete your account?')) {
          this.deleteAccount();
        }
      },
      anonymise_confirm() {
        if (confirm('Are you sure you want to anonymize your account?')) {
          this.anonymiseAccount();
        }
      },
      disconnect_confirm() {
        if (confirm('Are you sure you want to disconnect?')) {
          localStorage.removeItem('token');
          localStorage.removeItem('ultra_secret_id');
          this.$router.push('/login');
        }
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
    }
}
</script>
