FROM node:20-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application source code
COPY . .

# Expose the port your app listens on (e.g., 8080)
EXPOSE 3002

# Start the application
CMD ["node", "app.js"] 
