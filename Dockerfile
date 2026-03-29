FROM node:20-bookworm

WORKDIR /app

# Copy package files and install production dependencies first
COPY package*.json ./
RUN npm install

# Install Playwright browsers and their OS dependencies
# (--with-deps installs both the browsers and the OS level dependencies at once)
RUN npx playwright install --with-deps

# Copy the rest of your application source code
COPY . .

EXPOSE 3002

CMD ["node", "app.js"]
