From node:8
WORKDIR /LIBRARY/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4545
CMD ["npm","start"]