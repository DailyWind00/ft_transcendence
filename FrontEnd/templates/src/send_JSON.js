export default {
	methods: {
	  sendRequest(data) {
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
	  }
	}
  };