FROM    owasp/modsecurity-crs:nginx

USER   	root

# Copy files
COPY    tools/nginx.conf /etc/nginx/nginx.conf
COPY    tools/modsecurity.conf /etc/nginx/modsecurity/modsecurity.conf
COPY    tools/crs-setup.conf /etc/nginx/modsecurity/crs-setup.conf
COPY	templates/* /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html

RUN    	apt update -y
RUN    	apt upgrade -y
RUN   	apt install -y wget


# Download and extract OWASP CRS rules
RUN mkdir -p /usr/local/modsecurity-crs && \
    cd /usr/local/modsecurity-crs && \
    wget https://github.com/coreruleset/coreruleset/archive/v3.3.2.tar.gz && \
    tar -xzvf v3.3.2.tar.gz --strip-components=1 && \
    rm v3.3.2.tar.gz

# Download Three.js
RUN     wget https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js

EXPOSE	80

ENTRYPOINT ["nginx", "-g", "daemon off;"]