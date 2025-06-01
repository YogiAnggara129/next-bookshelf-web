FROM node:20

# 1. Set working directory
WORKDIR /app

# 2. Install dependencies
COPY package*.json ./
RUN npm install

# 3. Copy source
COPY . .

# 4. Build Next.js app
RUN npm run build

# 5. Add entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# 6. Expose port & define entrypoint
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
