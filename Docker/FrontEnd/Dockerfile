FROM    owasp/modsecurity:nginx

# Copy files
COPY    tools/nginx.conf /etc/nginx/nginx.conf
COPY    tools/modsecurity.conf /etc/modsecurity/modsecurity.conf
COPY    tools/crs-setup.conf /etc/modsecurity/crs-setup.conf

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

EXPOSE	3002

CMD ["nginx", "-g", "daemon off;"]