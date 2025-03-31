FROM nginx:bookworm

ARG MOLGENIS_VERSION=latest
ARG MOLGENIS_FRONTEND_VERSION=local 

# Remove default configuration
RUN rm -rf /etc/nginx/conf.d/*.conf
RUN rm -rf /etc/nginx/sites-enabled/*.conf

# Copy the server configuration
COPY conf.d/molgenis.conf /etc/nginx/conf.d/

# Copy default proxy configuration
COPY proxy.d/common.conf /etc/nginx/proxy.d/
COPY proxy.d/backend.conf /etc/nginx/proxy.d/
COPY proxy.d/frontend/experimental.conf /etc/nginx/proxy.d/
COPY proxy.d/frontend/custom.conf /etc/nginx/proxy.d/

# Copy MOLGENIS FRONTEND version specific configuration
COPY proxy.d/frontend/${MOLGENIS_FRONTEND_VERSION}.conf /etc/nginx/proxy.d/

# The following lines will install the frontend packages locally, comment if frontend version is not local.
COPY local-install/install-frontend.js / usr/share/nginx/html/

RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

RUN node /usr/share/nginx/html/install-frontend.js