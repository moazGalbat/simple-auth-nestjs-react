FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine As production
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]