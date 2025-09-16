# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's layer caching.
# This way, npm install only re-runs if dependencies change.
COPY package.json yarn.lock* pnpm-lock.yaml* ./
COPY tsconfig.json tsconfig.*json ./

# Install dependencies using pnpm
RUN corepack enable pnpm && pnpm install --frozen-lockfile
# Choose your package manager. Uncomment the one you use.
# RUN npm install
# RUN yarn install --frozen-lockfile
#RUN pnpm install --frozen-lockfile

# Copy the rest of your application code
COPY . .
ENV NODE_ENV=production
# Build the Tanstack Start application
# Replace 'pnpm build' with 'npm run build' or 'yarn build' if you use those.
RUN pnpm build

# list the contents of the /app directory for debugging purposes
RUN ls -la /app/src/generated/prisma

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary files from the builder stage
#COPY --from=builder /app/package.json ./
#COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./
#COPY --from=builder ./src/generated/prisma ./prisma


# set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port your Tanstack Start app listens on.
# By default, Tanstack Start apps run on port 3000 in production.
EXPOSE 3000

# Set the command to run your Tanstack Start application
# This typically starts the production server.
# Replace 'pnpm start' with 'npm start' or 'yarn start' if you use those.
CMD ["node", "server/index.mjs"]