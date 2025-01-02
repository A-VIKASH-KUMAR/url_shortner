FROM node:20-alpine
WORKDIR /urlShortner
COPY . .
RUN npm i
RUN npm run build
EXPOSE 8000
EXPOSE 6379
CMD node dist/index.js