From node:8
WORKDIR /LIBRARY/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5555
CMD ["npm","start"]