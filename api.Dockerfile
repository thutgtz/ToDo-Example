FROM node:18.13.0-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN npm run build

FROM node:18.13.0-alpine AS server
ENV TZ=Asia/Bangkok
RUN echo -e "https://dl-cdn.alpinelinux.org/alpine/v3.11/main\nhttps://dl-cdn.alpinelinux.org/alpine/v3.11/community" > /etc/apk/repositories
RUN apk update
RUN apk --no-cache add ca-certificates \
  && apk add --update tzdata \
  && cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime \
  && apk del tzdata
RUN rm -rf /var/cache/apk/* && \
  rm -rf /tmp/*
WORKDIR /app
COPY package.json ./
RUN yarn install --production
COPY --from=builder ./app/dist ./
CMD ["npm", "run","prod"]