# Use the official Bun image as a parent image
FROM oven/bun:1 as base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["bun", "start"]