FROM    nginx:latest

WORKDIR /usr/share/nginx/html

# Install dependencies
RUN     apt-get update && apt-get install -y wget

# Download Bootstrap
RUN     wget https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css
RUN     wget https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js

# Download Three.js
RUN     wget https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js

# Download npm
RUN     apt-get install -y npm
RUN     npm install -g npm@latest

# Expose port
EXPOSE	3000

CMD ["nginx", "-g", "daemon off;"]