FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as production
WORKDIR /app
COPY . .
RUN cd nextjs-app && npm install
RUN cd nextjs-app && npm run build

# FROM base as production
# WORKDIR /app

ENV NODE_ENV=development
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]
CMD cd nextjs-app && npm run dev
# RUN cd nextjs-app && npm ci

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs


# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public

# # CMD cd nextjs-app && npm start

FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev
