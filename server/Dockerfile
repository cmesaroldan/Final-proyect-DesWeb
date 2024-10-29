# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD [ "npm", "start" ]
