FROM mcr.microsoft.com/playwright:v1.42.0-jammy

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install your dependencies
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 3002

CMD ["node", "app.js"]
