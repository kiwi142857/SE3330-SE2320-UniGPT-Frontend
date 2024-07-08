FROM node:21 AS build

WORKDIR /app

COPY package*.json .
RUN npm install 
COPY . . 
RUN npm run build

ENV REACT_APP_IP=124.70.222.207

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf


EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]