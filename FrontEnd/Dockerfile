FROM    owasp/modsecurity-crs:nginx

USER    root

# Copy files
COPY    tools/nginx.conf /etc/nginx/nginx.conf
COPY    tools/modsecurity.conf /etc/modsecurity/modsecurity.conf
COPY    tools/crs-setup.conf /etc/modsecurity/crs-setup.conf

WORKDIR /usr/share/nginx/html

RUN    apt update -y
RUN    apt upgrade -y
RUN    apt install -y wget

# Download Three.js
RUN     wget https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js

EXPOSE	3002

ENTRYPOINT ["nginx", "-g", "daemon off;"]