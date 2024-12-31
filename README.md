```bash
# entra na pasta raiz da aplicação
$ cd backend

# copia as variaveis de ambiente default para .env
$ cp .env.example .env

# sobe o postgresql no container docker
$ docker-compose up -d

# baixa as dependencias
$ yarn

# roda a aplicação em desenvolvimento
$ yarn start:dev
```
