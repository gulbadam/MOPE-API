FROM node:alpine
WORKDIR /STUDY/containers/mope-api
COPY ./ ./
RUN npm install
CMD ["/bin/sh"]