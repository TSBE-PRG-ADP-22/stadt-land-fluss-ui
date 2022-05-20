FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
WORKDIR /app
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN /bin/sed -i "s/listen 80/listen ${PORT}/" /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
