FROM node:14.14.0-alpine
#Utilizamos la versión alpine que pesa solamente 117MB y es bastante rápido
LABEL version="1.0.8" maintainer="mingye@hotmail.es"

#Añadimos un grupo con el nombre bateyeg y un usuario con el nombre bateye
RUN addgroup -S bateyeg && adduser -S bateye -G bateyeg

#Copiamos ficheros de dependencias e instalamos las dependencias
COPY package*.json ./
RUN npm install

#Eliminamos el fichero de dependencias
RUN rm package*.json

#Instalamos gulp
RUN npm install -g gulp

#Usamos node como usuario ya que ya no nos hace falta permisos de superusuario.
#USER node

#Cambiamos al usuario bateye
USER bateye

VOLUME /test
WORKDIR /test

CMD ["gulp","test"]
