# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for cache efficiency
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build production version
RUN npm run build

# Use nginx for static serving
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Optional: custom nginx config for history mode/react-router
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
