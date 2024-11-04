# Use the Node.js image as the build environment
FROM node:20 AS build
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files and build the application
COPY . ./
RUN npm run build

# Use a lightweight Node.js image to serve the built application
FROM node:20
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app ./

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]