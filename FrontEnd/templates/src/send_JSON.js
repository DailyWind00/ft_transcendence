export default {
	methods: {
		sendRequestRegister(data) {
			let xhr = new XMLHttpRequest();
			let url = "https://localhost:2000/api/accounts/register/";
		
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
		let url = "https://localhost:2000/api/accounts/login/";
	
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
  }
}