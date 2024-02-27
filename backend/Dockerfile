# Use the official Node.js image as the base image
FROM --platform=$BUILDPLATFORM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
