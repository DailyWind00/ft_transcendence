export default {
  methods: {

    sendRequestRegister(data) {
      let xhr = new XMLHttpRequest();
      let url = "https://localhost/api/accounts/register/";

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            let responseJson = JSON.parse(xhr.responseText);
            let idNumber = responseJson.id;

            localStorage.setItem('ultra_secret_id', idNumber);
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
            n
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

            localStorage.setItem('token', token);
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
            this.$toast.error((this.$t('login_success'), ` ${xhr.status} - ${errorResponse.error}`), {
              position: "top-center",
              timeout: 2990
            });
          }
        }
      };

      xhr.send(data);
    },
    joinMatchmaking() {

      // Check for token in localStorage
      if (!localStorage.getItem('token')) {
        console.error('No token found');
        this.$toast.error('you are not logged in !', {
          position: "top-center",
          timeout: 2990
        });
        this.$router.push('/login');
        return;
      }
      
      // Get token and player from localStorage
      const token = localStorage.getItem('token');
      const player = localStorage.getItem('ultra_secret_id');
      
      if (!player) {
        console.error('No player found');
        this.$toast.error('you are not logged in !', {
          position: "top-center",
          timeout: 2990
        });
        this.$router.push('/login');
        return;
      }
    
      // Prepare data to be sent
      const data = JSON.stringify({
        player: player,
        token: token,
      });
    
      console.log('Sending data:', data);
    
      // Function to check matchmaking status
      function checkMatchmaking() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://localhost/api/matchmaking/join_matchmaking/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Token ${token}`);
    
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              if (response.status === 'waiting' || response.status === 'already_in_queue') {
                console.log('Still waiting for a match...');
                // this.$toast.error('you are not logged in !', {
                //   position: "top-center",
                //   timeout: 2990
                // });
              } else {
                console.log('Match found:', response);
                clearInterval(waitingLoop);
              }
            } else {
              console.error('Error checking matchmaking:', xhr.statusText);
              this.$toast.error("Error :", xhr.responseText, {
                position: "top-center",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              });
              this.$router.push('/login');
              clearInterval(waitingLoop);
            }
          }
        };
    
        // Send request with data
        xhr.send(data);
      }
    
      // Call the matchmaking function and set an interval to repeat it every 5 seconds
      const waitingLoop = setInterval(checkMatchmaking, 5000);
      checkMatchmaking();
    },
    getUserProfile() {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let url = "https://localhost/api/accounts/profile/";
        // Retrieve the stored token from localStorage
        let token = localStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
          reject('Token not found in localStorage');
          return;
        }

        xhr.open("GET", url, true);

        // Set the authorization header with the token
        xhr.setRequestHeader("Authorization", `Token ${token}`);
        // xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
              console.log('Profile:', xhr.responseText);
              // If the request is successful, resolve the promise with the response
              resolve(xhr.responseText);
            } else if (xhr.status === 401) {
              // Handle unauthorized response
              console.error('Unauthorized request, check token or API');
              reject('Unauthorized: Check your token or API');
            } else {
              // If there's an error, reject the promise with an error message
              console.error('Error fetching profile:', xhr.responseText);
              reject(xhr.responseText);
            }
          }
        };
        

        // Send the GET request
        xhr.send(data);

      });
    },
    deleteAccount() {
      let xhr = new XMLHttpRequest();
      let url = "https://localhost/api/accounts/delete-account/";
      let token = localStorage.getItem('token');
    
      if (!token) {
        this.$toast.error('you are not logged in !', {
          position: "top-center",
          timeout: 2990
        });
        return;
      }
      console.log('Token:', token);
      xhr.open("DELETE", url, true);
      xhr.setRequestHeader("Authorization", `Token ${token}`);
      xhr.setRequestHeader("Content-Type", "application/json");
    
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 204) {
            // Account successfully deleted
            localStorage.removeItem('token');
            localStorage.removeItem('idNumber');
            this.$toast.success(this.$t('account_deleted_success'), {
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
            this.$router.push('/login'); // Redirect to login page
          } else {
            // Handle errors
            try {
              let errorResponse = JSON.parse(xhr.responseText);
              this.$toast.error(`Error: ${xhr.status} - ${errorResponse.error}`, {
                position: "top-center",
                timeout: 2990
              });
            } catch (e) {
              // If response is not JSON, show a generic error
              this.$toast.error(`Error: ${xhr.status} - Unable to parse error response`, {
                position: "top-center",
                timeout: 2990
              });
            }
          }
        }
      };
    
      xhr.send();
    },
    anonymiseAccount() {
      let xhr = new XMLHttpRequest();
      let url = "https://localhost/api/accounts/anonymize-account/";
      let token = localStorage.getItem('token');
    
      if (!token) {
        this.$toast.error('Token not found in localStorage', {
          position: "top-center",
          timeout: 2990
        });
        return;
      }
      console.log('Token:', token);
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Authorization", `Token ${token}`);
      xhr.setRequestHeader("Content-Type", "application/json");
    
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('idNumber');
            this.$toast.success(this.$t('account_anonymise_success'), {
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
            this.$router.push('/login');
          } else {
            // Handle errors
            try {
              let errorResponse = JSON.parse(xhr.responseText);
              this.$toast.error(`Error: ${xhr.status} - ${errorResponse.error}`, {
                position: "top-center",
                timeout: 2990
              });
            } catch (e) {
              // If response is not JSON, show a generic error
              this.$toast.error(`Error: ${xhr.status} - Unable to parse error response`, {
                position: "top-center",
                timeout: 2990
              });
            }
          }
        }
      };
    
      xhr.send();
    },
    
  }
}
