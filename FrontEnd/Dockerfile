## Vue deployment
FROM    node:16.10.0-alpine3.13 AS build-stage

WORKDIR /app

# Install Vue
COPY    templates/ .
RUN     npm install 

RUN     npm run build

# ---------------------------- #

FROM    owasp/modsecurity-crs:nginx

USER   	root

RUN    	apt update -y
RUN    	apt upgrade -y
RUN   	apt install -y wget

COPY    --from=build-stage /app/dist /usr/share/nginx/html

# Copy files
COPY    tools/nginx.conf /etc/nginx/nginx.conf
COPY    tools/modsecurity.conf /etc/nginx/modsecurity/modsecurity.conf
COPY    tools/crs-setup.conf /etc/nginx/modsecurity-crs/crs-setup.conf
COPY 	tools/ssl/ /etc/nginx/certs/

COPY    templates/static/ /usr/share/nginx/html/static

# Copy CA certificate
COPY    tools/ssl/cert.crt /usr/local/share/ca-certificates/cert.crt
RUN     update-ca-certificates

WORKDIR /usr/share/nginx/html

# Download and extract OWASP CRS rules
RUN     mkdir -p /usr/local/modsecurity-crs && \
        cd /usr/local/modsecurity-crs && \
        wget https://github.com/coreruleset/coreruleset/archive/v3.3.2.tar.gz && \
        tar -xzvf v3.3.2.tar.gz --strip-components=1 && \
        rm v3.3.2.tar.gz

# Download Three.js
RUN     wget https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js

# Download vue
RUN     wget https://cdn.jsdelivr.net/npm/vue/dist/vue.js

EXPOSE	443                     

ENTRYPOINT ["nginx", "-g", "daemon off;"]