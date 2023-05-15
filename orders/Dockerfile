From node:8
WORKDIR /LIBRARY/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7777
CMD ["npm","start"]