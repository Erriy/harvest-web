FROM node:16.13.1-alpine3.15 as builder

WORKDIR /build
COPY . /build
RUN npm install && npm run build


FROM nginx:1.21.6-alpine
COPY --from=builder /build/dist/ /usr/share/nginx/html/
