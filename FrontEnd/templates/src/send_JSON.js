export default {
	methods: {
	  sendRequestRegister(data) {
		let xhr = new XMLHttpRequest();
		let url = "https://localhost:2000/api/accounts/register/";
  
		alert("data: " + data);
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
  
		xhr.onreadystatechange = () => {
		  if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			  this.responseMessage = xhr.responseText;
			} else {
			  this.responseMessage = `Erreur: ${xhr.status}`;
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
				if (xhr.status === 200) {
					let responseJson = JSON.parse(xhr.responseText);
					let token = responseJson.token;
	
					this.responseMessage = `Jeton récupéré: ${token}`;
	
					localStorage.setItem('authToken', token);
	
					this.makeAuthenticatedRequest(token);
				} else {
					this.responseMessage = `Erreur: ${xhr.status}`;
				}
			}
		};
		
		xhr.send(data);
		alert("response:" , xhr.responseText);
	},
	makeAuthenticatedRequest(token) {
		let xhr = new XMLHttpRequest();
		let url = "https://localhost/api/protected/resource";
	
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Authorization", `Bearer ${token}`);
		xhr.setRequestHeader("Content-Type", "application/json");
	
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					let responseJson = JSON.parse(xhr.responseText);
					this.responseMessage = `Réponse du serveur: ${JSON.stringify(responseJson)}`;
				} else {
					this.responseMessage = `Erreur lors de la requête authentifiée: ${xhr.status}`;
				}
			}
		};
	
		xhr.send();
	}
	}
  };