# Multi-stage build for production-ready SPA
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy redirects for Netlify-style hosting (if needed)
COPY public/_redirects /usr/share/nginx/html/_redirects

# Add health check script
RUN echo '#!/bin/sh\necho "healthy"' > /usr/share/nginx/html/health && chmod +x /usr/share/nginx/html/health

# Expose port
EXPOSE 80

# Add labels for better container management
LABEL maintainer="JobBlox Team"
LABEL version="1.0.0"
LABEL description="JobBlox Frontend - Multi-tenant Construction CRM"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
