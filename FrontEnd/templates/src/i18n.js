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
	error: 'Error',
	launch_tictactoe: 'Launch Tic Tac Toe',
	player_names: 'Insert player names',
	history: 'History',
	tictactoe: 'Tic Tac Toe',
	tour: 'turn of',
	equality: 'Equality',
	game_history: 'Game history',
	winner: 'Winner',
	player1: 'Player 1',
	player2: 'Player 2',
	player: 'Player',
	tournament: 'Tournament',
	enter_a_name: 'Enter a name',
	save_players: 'Save players',
	online: 'Online',
	local: 'Local',
	tournament: 'Click here if you are in a tournament',
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
	error: 'Erreur',
	launch_tictactoe: 'Lancer le Morpion',
	player_names: 'Insérer les noms des joueurs',
	history: 'Historique',
	tictactoe: 'Morpion',
	tour: 'tour de',
	equality: 'Égalité',
	game_history: 'Historique des parties',
	winner: 'Gagnant',
	player1: 'Joueur 1',
	player2: 'Joueur 2',
	player: 'Joueur',
	tournament: 'Tournoi',
	enter_a_name: 'Entrez un nom',
	save_players: 'Sauvegarder les joueurs',
	online: 'En ligne',
	local: 'Local',
	tournament: 'Cliquez ici si vous êtes dans un tournoi',

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
	error: 'Eraro',
	launch_tictactoe: 'Ludi Tic Tac Toe',
	player_names: 'Enmetu la ludantnomojn',
	history: 'Historio',
	tictactoe: 'Tic Tac Toe',
	tour: 'vico de',
	equality: 'Egalaj',
	game_history: 'Ludhistorio',
	winner: 'Vicanto',
	player1: 'Ludanto 1',
	player2: 'Ludanto 2',
	player: 'Ludanto',
	tournament: 'Turniro',
	enter_a_name: 'Enmetu nomon',
	save_players: 'Konservi ludantojn',
	online: 'Enrete',
	local: 'Loka',
	tournament: 'Klaku ĉi tie se vi estas en turniro',
  }
};

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
});

export default i18n;