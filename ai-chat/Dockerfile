FROM node:16-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Use a lightweight server to serve the build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 and start the server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
