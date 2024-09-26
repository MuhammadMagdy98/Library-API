# Use the official Node.js image
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# # Build TypeScript code
# RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
