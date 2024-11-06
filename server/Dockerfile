# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración y de la aplicación
COPY package*.json ./
RUN npm install

# Copia todo el contenido del servidor al contenedor
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD [ "npm", "start" ]
