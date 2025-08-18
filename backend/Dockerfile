FROM node:18-bullseye

# Install system deps for languages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 python3-pip \
      g++ \
      default-jdk && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV PORT=5111
ENV NODE_ENV=production

EXPOSE 5111

CMD ["node", "server.js"]


