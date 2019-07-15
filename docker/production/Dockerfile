FROM nginx:1.17.1

ARG MOLGENIS_VERSION=latest

# Remove default configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy the server configuration
COPY conf.d/molgenis.conf /etc/nginx/conf.d/

# Copy default proxy configuration
COPY proxy.d/common.conf /etc/nginx/proxy.d/
COPY proxy.d/backend.conf /etc/nginx/proxy.d/
COPY proxy.d/frontend/experimental.conf /etc/nginx/proxy.d/
COPY proxy.d/frontend/custom.conf /etc/nginx/proxy.d/

# Copy MOLGENIS version specific configuration
COPY proxy.d/frontend/${MOLGENIS_VERSION}.conf /etc/nginx/proxy.d/