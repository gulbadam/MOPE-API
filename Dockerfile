FROM node:carbon-jessie
WORKDIR /STUDY/containers/mope-api
COPY ./ ./
RUN yarn --pure-lockfile
CMD ["/bin/sh"]