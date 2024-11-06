FROM node:18
<<<<<<< HEAD
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
=======

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración y de la aplicación
COPY package*.json ./
RUN npm install

# Copia todo el contenido del servidor al contenedor
COPY . .

# Expone el puerto de la aplicación
>>>>>>> 1bb3beacb28d1c71e98f2d3e5c41a47023a27d65
EXPOSE 3000
CMD [ "node", "app.js" ]
