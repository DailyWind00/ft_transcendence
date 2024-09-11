export default {
	methods: {
		
		sendRequestRegister(data) {
			let xhr = new XMLHttpRequest();
			let url = "https://localhost/api/accounts/register/";
		
			alert("data: " + JSON.stringify(data));
		
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
		
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200 || xhr.status === 201) {
						let responseJson = JSON.parse(xhr.responseText);
						let idNumber = responseJson.id;

						localStorage.setItem('idNumber', idNumber);
						this.sendRequestLogin(data);
						// this.responseMessage = response.message;
						// this.$toast.success(this.$t('login_sucess'), {
						// 	position: "top-center",
						// 	timeout: 2990,
						// 	closeOnClick: true,
						// 	pauseOnFocusLoss: true,
						// 	pauseOnHover: false,
						// 	draggable: false,
						// 	draggablePercent: 2,
						// 	showCloseButtonOnHover: false,
						// 	hideProgressBar: true,
						// 	closeButton: "button",
						// 	icon: true,
						// 	rtl: false
						// });
						// this.$router.push('home');
					} else {
						let errorResponse = JSON.parse(xhr.responseText);
						let final = errorResponse.error + errorResponse.username + errorResponse.email + errorResponse.password;
						this.$toast.error(`Erreur: ${xhr.status} - ${final}`, {
							position: "top-center",
							timeout: 2990
						});
					}
				}
			};		
			xhr.send(data);
		},
	  sendRequestLogin(data) {
		let xhr = new XMLHttpRequest();
		let url = "https://localhost/api/accounts/login/";
	
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
	
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200 || xhr.status === 201) {
					let responseJson = JSON.parse(xhr.responseText);
					let token = responseJson.token;
					
					localStorage.setItem('authToken', token);
					this.$router.push('/gameselect');
					this.$toast.success(this.$t('login_success'), {
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
					
				} else {
					let errorResponse = JSON.parse(xhr.responseText);
					this.$toast.error((this.$t('login_success') ,` ${xhr.status} - ${errorResponse.error}`), {
						position: "top-center",
						timeout: 2990
					});
				}
			}
		};
		
		xhr.send(data);
	},
	joinMatchmaking() {

		if (!localStorage.getItem('token')) {
			console.error('No token found');
			return;
		}
		const token = localStorage.getItem('token');
	
		function checkMatchmaking() {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://localhost/api/join_matchmaking/', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Authorization', `Bearer ${token}`);
	
			xhr.onreadystatechange = function() {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						const response = JSON.parse(xhr.responseText);
						if (response.status === 'waiting') {
							console.log('Still waiting for a match...');
						} else {
							console.log('Match found:', response);
							clearInterval(waitingLoop);
						}
					} else {
						console.error('Error checking matchmaking:', xhr.statusText);
						clearInterval(waitingLoop);
					}
				}
			};
	
			xhr.send();
		}
	
		const waitingLoop = setInterval(checkMatchmaking, 5000);
		
		checkMatchmaking();
	},
  }
}