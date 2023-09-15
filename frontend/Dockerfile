FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy the package.json and package-lock.json to /app
COPY package*.json ./
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm i
# Copy app files
COPY . ./
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:stable-alpine
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]