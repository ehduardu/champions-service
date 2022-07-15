# Image that will be used as builder (to avoid sending TypeScript files to the container)
FROM node:16-alpine as builder
WORKDIR /usr

# Copying to the container
COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./
COPY tsconfig.json ./
COPY jest.config.js ./
COPY swagger.json ./
COPY src ./src
COPY .credentials ./.credentials

# Installing dependencies and building the app
RUN yarn install
RUN yarn build

# Image that will actually run
FROM node:16-alpine as starter
WORKDIR /usr

# Copying to the container
COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./

# Installing dependencies
RUN yarn install

# Copying bundled files
COPY --from=builder /usr/dist ./dist

# Starts the application in container
CMD ["yarn", "start"]