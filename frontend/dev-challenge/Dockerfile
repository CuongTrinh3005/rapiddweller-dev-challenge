FROM node:18

WORKDIR /app

COPY package.json .

# RUN npm install --legacy-peer-deps
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
