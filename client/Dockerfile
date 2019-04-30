FROM node:8-alpine

RUN apk add --no-cache \
            alpine-sdk \
            python \
            bash \
            lcms2-dev \
            libpng-dev \
            gcc \
            g++ \
            make \
            autoconf \
            automake 
            
WORKDIR /usr/src/app
ADD . .

RUN yarn install
RUN yarn run build
CMD yarn start

FROM nginx:1.14-alpine
COPY --from=0 /usr/src/app/public /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf