FROM oven/bun:latest

WORKDIR /app 
ENV PORT=5000

COPY package.json bun.lock ./
COPY src ./src
COPY prisma ./prisma
COPY .env ./

RUN bun install --frozen-lockfile 
RUN bun run build 

EXPOSE $PORT

CMD ["bun", "start"] 