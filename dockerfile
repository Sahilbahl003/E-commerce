
# Stage 1: Build React frontend
FROM node:22-alpine AS frontend-build

WORKDIR /frontend

# Copy frontend package files
COPY Frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY Frontend/ ./

# Generate production build
RUN npm run build


# Stage 2: Setup Node.js backend
FROM node:22-alpine

WORKDIR /app

# Copy backend package files
COPY server/package*.json ./

# Install backend dependencies
RUN npm install --omit=dev

# Copy backend source code
COPY server/ ./

# Remove old frontend build
RUN rm -rf ./public

# Copy newly generated React build
COPY --from=frontend-build /frontend/dist ./public

EXPOSE 8080

CMD ["node", "server.js"]
