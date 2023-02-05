FROM oraclelinux:8.7

# Install Oracle Client
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

# Install NodeJs
RUN dnf module enable nodejs:16 -y
RUN dnf module install nodejs -y

ENV PORT=5000 
ENV DB_USER=SYSTEM 
ENV DB_PASSWORD=MyPassw0rd 
ENV DB_SERVER=104.198.104.29 
ENV DB_DATABASE=ORCLPDB1 
ENV DB_SCHEMA=BUDGET 
ENV DB_PORT=1521 
ENV JWT_KEY=$2a$10$85Tiwn.PCBp2X9A.31n48umVZxAiHxm8PMfZVyC4oA3UHZC4nkFjm 
ENV KEY_FIXER=adYH8BRfqFnlZyDAT4D2MB4rpRGcZwBw 
ENV API_FIXER=https://api.apilayer.com/fixer
# APP Copy
COPY . /opt/app

# Cambiar de directorio
WORKDIR /opt/app

# Dependencias
RUN npm install

CMD [ "npm", "start" ]