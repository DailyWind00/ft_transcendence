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
	data_options: 'Data options',
	tictactoe: 'Tic Tac Toe',
	settings: 'Settings',
	player_info: 'Player info',
	color: 'Color',
	font_size: 'Font size',
	delete_account: 'Delete account',
	anonymize_account: 'Anonymize account',
	small: 'Small',
	medium: 'Medium',
	large: 'Large',
	purple: 'Purple',
	green: 'Green',
	orange: 'Orange',
	password_mismatch: 'Passwords do not match',
	login_success: 'Login successful',
	presentation: 'Find us at:',
	deuteranopia: 'Deuteranopia',
	protanopia: 'Protanopia',
	tritanopia: 'Tritanopia',
	daltonism: 'Daltonism',
	without: 'Without',
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
	data_options: 'Options de données',
	tictactoe: 'Morpion',
	settings: 'Paramètres',
	player_info: 'Informations du joueur',
	color: 'Couleur',
	font_size: 'Taille de la police',
	delete_account: 'Supprimer compte',
	anonymize_account: 'Anonymiser compte',
	small: 'Petit',
	medium: 'Moyen',
	large: 'Grand',
	purple: 'Violet',
	green: 'Vert',
	orange: 'Orange',
	password_mismatch: 'Les mots de passe ne correspondent pas',
	login_success: 'Connexion réussie',
	presentation: 'Nous retrouver :',
	deuteranopia: 'Deutéranopie',
	protanopia: 'Protanopie',
	tritanopia: 'Tritanopie',
	daltonism: 'Daltonisme',
	without: 'Sans',
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
	data_options: 'Datumojn opcioj',
	tictactoe: 'Tic Tac Toe',
	settings: 'Agordoj',
	player_info: 'Informoj pri la ludanto',
	color: 'Koloro',
	font_size: 'Tipara grandeco',
	delete_account: 'Forigi konton',
	anonymize_account: 'Anonimigi konton',
	small: 'Malgranda',
	medium: 'Meza',
	large: 'Granda',
	purple: 'Purpura',
	green: 'Verda',
	orange: 'Oranĝa',
	password_mismatch: 'La pasvortoj ne kongruas',
	login_success: 'Ensaluto sukcesis',
	presentation: 'Trovi nin ĉe:',
	deuteranopia: 'Deuteranopia',
	protanopia: 'Protanopia',
	tritanopia: 'Tritanopia',
	daltonism: 'Daltonismo',
	without: 'Sen',
  }
};

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
});

export default i18n;