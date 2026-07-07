
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


FROM node:20-alpine AS build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Supabase credentials are needed at BUILD TIME because
# generateStaticParams() fetches real cabin data from Supabase
# to pre-render /cabins/[cabinId] pages. Placeholders won't work.
ARG SUPABASE_URL
ARG SUPABASE_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_KEY=$SUPABASE_KEY

# Auth vars are only used at RUNTIME (by NextAuth when handling requests),
# so placeholders are fine here — real values come via --env-file.
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=placeholder-secret
ENV AUTH_GOOGLE_ID=placeholder-id
ENV AUTH_GOOGLE_SECRET=placeholder-secret

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/.next/standalone ./

COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
