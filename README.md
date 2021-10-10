# Url-Shortener
A service that encode or decode URLs, shows the statistics of shortened URL and more.

# Application installation Process

## Prerequisites

1. Installed Node version >= 10
2. Installed npm version >= 5.6
3. Installed git

## 1. Clone the Url-Shortener from [repository](https://github.com/Lekens/Url-Shortener)

```bash
git clone https://github.com/Lekens/Url-Shortener.git
```

go inside the folder:

```bash
cd Url-Shortener
```

## 2. Run the project:

1. Copy env.example and insert it in the root directory;
2. Rename it with .env
3. Note that the content of .env.example are actual secret but are included just for the purpose of the examiner
   For example:

```
NODE_ENV=env_name
DB_NAME_DEV='DB_name'
DB_NAME_PROD='Db_name_prod'
CONNECTION_STRING='url-to-db-mongo'
PORT='8090'
BASE_URL='/api/'
APIKEY='check_swagger_doc'
APP_BASE_URL='http://localhost:port'

```

Then run the following commands:

```bash
npm install
```

```bash
nodemon bin/www.js 
```
or

```bash
npm start
```

App will be available [here](http://localhost:8090)

## 3. Open the app for usage

Navigate to [here](http://localhost:8090/swagger/documentation) to use the swagger doc or open a postman to test endpoints.

## 4. Runing test cases: jest

On the terminal, run the command to start testing


```bash
npm test
```
