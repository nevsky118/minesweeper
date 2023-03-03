FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn global add pnpm && pnpm i --frozen-lockfile
RUN pnpm build

CMD ["pnpm", "start"]