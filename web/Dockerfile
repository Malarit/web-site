FROM node:16.18.0-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build


FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



