FROM node:21 AS build

WORKDIR /app

COPY package*.json .
RUN npm install 
COPY . . 
ENV REACT_APP_IP=124.70.222.207
RUN npm run build


FROM node:21
COPY --from=build /app/build .
# RUN npm install serve
EXPOSE 3000
CMD ["npx", "serve", "-s", ".", "-l", "3000"]