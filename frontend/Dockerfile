# Stage 1: Build the Angular App
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Angular application for production
# Angular 17+ uses the new builder, so output dir is usually dist/frontend/browser
RUN npm run build 

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy the build artifacts from the builder stage
# Adjust the path if the project name in angular.json is different
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
