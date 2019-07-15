FROM nginx:1.17.1

# Remove default configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy the server configuration
COPY conf.d/molgenis.conf /etc/nginx/conf.d/

# Copy default proxy configuration
COPY proxy.d/backend.conf /etc/nginx/proxy.d/
COPY proxy.d/frontend/experimental.conf /etc/nginx/proxy.d/
COPY proxy.d/frontend/custom.conf /etc/nginx/proxy.d/
COPY proxy.d/frontend/latest.conf /etc/nginx/proxy.d/