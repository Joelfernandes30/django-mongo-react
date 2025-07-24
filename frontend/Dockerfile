# ---- Builder stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install only the dependencies first for cache efficiency
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Set build-time environment variable for backend API (optional, can override below)
# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the React app for production
RUN npm run build

# ---- Nginx stage ----
FROM nginx:alpine

# Copy React build from previous stage to nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Uncomment if you have a custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
