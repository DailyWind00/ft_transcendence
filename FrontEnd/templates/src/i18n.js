import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    welcome: 'FT_TRANSCENDENCE',
	home: 'Home',
	about: 'About',
	login: 'Log in',
	sign_up: 'Sign up',
	enter_username: 'Enter your username',
	enter_password: 'Enter your password',
	enter_passwordx2: 'Enter your password again',
	create_account: 'Create an account',
	game_choose: 'Choose a game',
	forgot_password: 'Forgot your password ?',
  },
  fr: {
    welcome: 'FT_TRANSCENDENCE',
	home: 'Accueil',
	about: 'À propos',
	login: 'Se connecter',
	sign_up: 'S\'inscrire',
	enter_username: 'Entrez votre nom d\'utilisateur',
	enter_password: 'Entrez votre mot de passe',
	enter_passwordx2: 'Entrez votre mot de passe à nouveau',
	create_account: 'Créer un compte',
	game_choose: 'Choisissez un jeu',
	forgot_password: 'Mot de passe oublié ?',
  },
  es: {
	welcome: 'FT_TRANSCENDENCE',
	home: 'Bonvenon',
	about: 'pri',
	login: 'ensalutu',
	sign_up: 'Aliĝu',
	enter_username: 'Enigu vian uzantonomon',
	enter_password: 'Enigu vian pasvorton',
	enter_passwordx2: 'Enigu vian pasvorton denove',
	create_account: 'Kreu konton',
	game_choose: 'Elektu ludon',
	forgot_password: 'Ĉu vi forgesis vian pasvorton ?',
	
  }
};

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
});

export default i18n;