FROM alpine:edge

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories && \
    apk add --no-cache \
            alpine-sdk \
            libc6-compat \
            bash \
            aws-cli

COPY . .
RUN chmod +x /run-cron.sh

CMD /run-cron.sh