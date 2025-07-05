# Stage 1: build the application
FROM node:20-alpine AS build

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# copy source
COPY . .

# build for production
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine

# copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
