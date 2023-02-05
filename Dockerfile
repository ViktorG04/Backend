FROM oraclelinux:8.7

# Install Oracle Client
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

# Install NodeJs
RUN dnf module enable nodejs:16 -y
RUN dnf module install nodejs -y

ENV PORT=
ENV DB_USER= 
ENV DB_PASSWORD= 
ENV DB_SERVER= 
ENV DB_DATABASE= 
ENV DB_SCHEMA=
ENV DB_PORT= 
ENV JWT_KEY= 
ENV KEY_FIXER= 
ENV API_FIXER=
# APP Copy
COPY . /opt/app

# Cambiar de directorio
WORKDIR /opt/app

# Dependencias
RUN npm install

CMD [ "npm", "start" ]