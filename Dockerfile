FROM nginx:stable
RUN rm -rf /usr/share/nginx/html/*
COPY packages/*/dist /usr/share/nginx/html/