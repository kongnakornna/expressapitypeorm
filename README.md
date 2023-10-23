# Express_TypeORM_mysql PORT : 8032

This project created by Node JS version 14.17.0. Used Express framework for connect to server Coding by Typescript and Testing by Jest
Run on port 8032 this port is fix by bible team and infrastructor team so you should not change it


## Directory structure application MVC & CRUDC & TYPE MAPPING DATA
## โคงสร้างของ Code  MVC & CRUD & TypeORM Data Mapping  Mysql Suport  Graphql
<br/> src
<br/> ├─app.ts
<br/> ├─server.ts
<br/> ├─config
<br/> │ ├── config.ts
<br/> │ ├── your.config
<br/> ├─rounts
<br/> │ ├── index
<br/> │ ├── xxx.rounts
<br/> │ ├── xxx.rounts
<br/> ├─schemas
<br/> │ ├── file schemas
<br/> ├─constanst
<br/> │ ├── file constanst
<br/> ├─controllers
<br/> │ ├── auth.controller
<br/> │ ├── authapikey.controller
<br/> │ ├── file your controllers
<br/> ├─entities // TYPE ORM Struct from Data base table
<br/> │ ├── auth.entities
<br/> │ ├── your.entities
<br/> │ ├── CmsCategory.entity //exp sample = cms_category
<br/> ├─interfaces // static data
<br/> │ ├── xxx.interface
<br/> │ ├── your.interface
<br/> ├─repositories // sql query builder
<br/> │ ├── CmsCategory.repository // = cms_category restpon from ─entities data mapping to query builder
<br/> │ ├── UserType.repository // exp sample= user_type
<br/> │ ├── your.repository
<br/> ├─schemas // schemas validate
<br/> │ ├── bodySchema.ts // = validate structure
<br/> │ ├── yourSchema.ts
<br/> ├─services // file services
<br/> │ ├── function.services // = services
<br/> │ ├── your.services
<br/> ├─utils // file middlewares / helpers function
<br/> │ ├─ modules cache
<br/> │ | ├── cache serviced
<br/> │ | ├── responsecache.helper.ts
<br/> │ ├─display<br/>response
<br/> │ | ├── response (function response)
<br/> │ | ├── models (your custom database function)
<br/> │ ├─function
<br/> │ | ├── file.function (your main function)
<br/> │ | ├── xx.function (your custom database function)
<br/> │ ├─helpers
<br/> │ | ├── helpers (helpers main function)
<br/> │ | ├── function.helpers (your helpers function)
<br/> │ | └── allfunction.helpers
<br/> │ └──system
<br/> ├──types // type data control validate all any application
<br/> ├─.env
<br/> ├─.gitignore
<br/> ├─nodemon.json
<br/> ├─tsconfig.json
<br/> └─package.json

## โคงสร้างของ Code
src
├─app.ts
├─server.ts
├─config
│ ├── config.ts
│ ├── your.config
├─rounts
│ ├── index
│ ├── xxx.rounts
│ ├── xxx.rounts
├─schemas
│ ├── file schemas
├─constanst
│ ├── file constanst
├─controllers
│ ├── auth.controller
│ ├── authapikey.controller
│ ├── file your controllers
├─entities // TYPE ORM Struct from Data base table
│ ├── auth.entities
│ ├── your.entities
│ ├── CmsCategory.entity //exp sample = cms_category
├─interfaces // static data
│ ├── xxx.interface
│ ├── your.interface
├─repositories // sql query builder
│ ├── CmsCategory.repository // = cms_category restpon from ─entities data mapping to query builder
│ ├── UserType.repository // exp sample= user_type
│ ├── your.repository
├─schemas // schemas validate
│ ├── bodySchema.ts // = validate structure
│ ├── yourSchema.ts
├─services // file services
│ ├── function.services // = services
│ ├── your.services
├─utils // file middlewares / helpers function
│ ├─ modules cache
│ | ├── cache serviced
│ | ├── responsecache.helper.ts
│ ├─display-response
│ | ├── response (function response)
│ | ├── models (your custom database function)
│ ├─function
│ | ├── file.function (your main function)
│ | ├── xx.function (your custom database function)
│ ├─helpers
│ | ├── helpers (helpers main function)
│ | ├── function.helpers (your helpers function)
│ | └── allfunction.helpers
│ └──system
├──types // type data control validate all any application
├─.env
├─.gitignore
├─nodemon.json
├─tsconfig.json
└─package.json
 

## Base URL

This project have 3 step running such as [http://localhost:8032/demo/](localhost:8032), [dev](https://apidev-aws/demo/), [production](https://api-aws/demo)

About dev which is private url you must connect Pulse Secure before running

## Database

Database as MySQL version 5.6.20 on trueplookpanya
 
# install project

- Run `npm install -g nodemon` # install nodemon
- Run `npm install` or Run `npm i`

## Development server

Run `npm start` for a dev server. Navigate `localhost:8032`. The app will automatically reload if you change any of the source files.

 
## Testing

Run `npm test` for a test available my code should run this commnad for sure before deploy on dev or production

## Deploy on Dev

Before Deploy you should change version in base url as GET. This project is CI/CD and Jenkins. So you can deploy on Dev via push code to gid branch name `dev` and build in Jenkins

## Deploy on Production

Before Deploy you should change version in base url as GET. This project is CI/CD and Jenkins. So you can deploy on Production via push code to gid branch name `main` and build in Jenkins

# Developed by

## Kongnakorn jantakun

## email :kongnakornna@gmail.com

## Tip

- Run `npm install` and Run `npm install -g nodemon`

## install redis

- Run `npm install redis`

## Development server

- Run `npx nodemon` for a dev server.

- Run `npm install -s npx`

## Build Source Code on production

- Run `npx gulp`

# Deploy on Dev or production

Step Deploy you should change version in base url as GET. This project is CI/CD and Jenkins.
So you can deploy on Dev via push code to gid branch name `dev` and build in Jenkins

# Deploy on Production

Before Deploy you should change version in base url as GET. This project is CI/CD and Jenkins.
So you can deploy on Production via push code to gid branch name `master` and build in Jenkins
About dev which is private url you must connect Pulse Secure before running

# PM2 TEST RUN dev ใช้ทดสอบ CMD start ใน localhost

- Run `pm2 list`
- Run `pm2 delete demo`
- Run `pm2 flush demo`
- Run `pm2 start dist/server.js --name "demo"` # ติดตั้ง service demo ใหม่ บน pm2

# PM2 TEST RUN dev # ทดสอบ โดย CMD END

# https://pm2.keymetrics.io/docs/usage/quick-start/

# 8032/demo

- Run `pm2 list`
- Run `pm2 delete all`
- Run `pm2 flush all`

- Run `pm2 delete 8032/demo`
- Run `pm2 flush 8032/demo`
- Run `pm2 start dist/server.js --name 8032/demo`

* Run `npm install md5-typescript -save`
* Run `npm install email-validator -save`

# Access API

## Authorization Access API

- gen token by api_key or user data

## authorization for headers cons Token

- Authorization Type : Beare Token , value Token =xxx
- example Token= xxxxxxxxxxxxxxxxxx

## Documentation

- https://crimson-resonance-426952.postman.co/workspace/7a519d81-fe32-432f-8214-945aa0c699ec/documentation/367727-143cea54-54e1-4989-bf75-f927a46241e8

# API Document

## Swagger UI Express

-Run `npm install swagger-ui-express -S`

- const express = require('express');
- const app = express();
- const swaggerUi = require('swagger-ui-express');
- const swaggerDocument = require('./document/swagger.json');
- var options = {
- customCss: '.swagger-ui .topbar { display: none }'
- };
- app.use('/apidocument', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));-

* http://localhost:8001/demo/apidocument

- const swaggerUi = require('swagger-ui-express');
- const swaggerDocument = require('../document/apidocument.json');
- router.use('/api-docs', swaggerUi.serve);
- router.get('/api-docs', swaggerUi.setup(swaggerDocument));

# Node Error fix

- Run `npm audit`
- Run `npm install --global --production npm-windows-upgrade`
- Run `npm-windows-upgrade --npm-version latest`
- Run `npm -v`
- Run `node -v`
- Reference url `https://stackoverflow.com/questions/72401421/npm-warn-config-global-global-local-are-deprecated-use-location-glo`

## Node docs Reference fro project url

- `https://nodejs.org/dist./v4.5.0/docs/api/process.html`
- `https://www.w3schools.com/nodejs/met_buffer_fill.asp`
- `https://typeorm.io/#/`
- `https://www.tutorialspoint.com/typeorm/typeorm_connection_api.htm`
- `https://graphql.org/`
- `https://www.fastify.io/`
- `https://nextjs.org/`
- `https://expressjs.com/`
- `https://www.codegrepper.com/search.php?q=typeorm+nodejs&answer_removed=1`
- `https://knexjs.org/`
- `https://www.typescriptlang.org/`
- `https://deno.land/`
- `https://www.w3schools.com/nodejs/nodejs_raspberrypi_webserver_websocket.asp`
- `https://blog.logrocket.com/build-graphql-typegraphql-typeorm/`
- `https://typegraphql.com/docs/getting-started.html`
- `https://www.npmjs.com/package/typescript-json-schema`
- `https://www.imadatyat.me/guides/schema-validation-with-zod-and-expressjs`

# We apologize for any mistakes here.

## Thank you & Best regards,

## BY Kongnakorn Jantakun

 pm2 start ts-node --name=8032/demo -- -P tsconfig.json src/server.ts

- OR Run ` npm run start `
###  Run `cd /Data/app/demo` 
###  Run `npm install -s` 
###  Run `npm run start-dev `  Run ` npm run start-prod ` 
###  Run `npm run testpm2 ` 
###  Run `npm run start `  
###  Run ` pm2 monit ` 




Run `pm2 delete app`
Run `pm2 save`
Run `pm2 cleardump`


Run `pm2 delete 8032/demo `
Run `pm2 flush 8032/demo ` 
Run `npm run start-dev`
Run `npm run start-prod`


Run `pm2 stop index` // หยุดโปรแกรมตามชื่อที่กำหนด
Run `pm2 stop 0` //หยุดโปรแกรมตาม id ที่กำหนด
Run `pm2 stop all` //หยุดโปรแกรมทั้งหมด

Run `pm2 delete index` //ลบโปรแกรมตามชื่อที่กำหนด
Run `pm2 delete 0` //ลบโปรแกรมตาม id ที่กำหนด
Run `pm2 delete all` //ลบโปรแกรมทั้งหมด

Run `pm2 restart index` //restart โปรแกรมตามชื่อที่กำหนด
Run `pm2 restart 0` //restart โปรแกรมตาม id ที่กำหนด
Run `pm2 restart all` //restart โปรแกรมทั้งหมด

Run `pm2 reload index` //reload โปรแกรมตามชื่อที่กำหนด
Run `pm2 reload 0` //reload โปรแกรมตาม id ที่กำหนด
Run `pm2 reload all` //reload โปรแกรมทั้งหมด

Run `pm2 info index` // แสดง information ของ program ตามชื่อที่กำหนด
Run `pm2 info 0` // แสดง information ของ program ตาม id ที่กำหนด

Run `pm2 flush`

Run `pm2 startup` // หมายถึงเมื่อมีการ start server ให้ program เรา start ด้วย
Run `pm2 save` // หมายถึงให้ pm2 เก็บข้อมูลทั้งหมดเพื่อใช้ตอน start

Run `pm2 monit ` // เมื่อต้องการดูว่าตอนนี้ program เราทำงานเป็นยังไงใช้ ram กับ cpu เป็นอย่างไรบ้างแบบ real time สามารถทำได้โดยใช้คำสั่ง

- OR Run ` npm run start `
###  Run `cd /Data/app/demo` 
###  Run `npm install -s` 
###  Run `npm run start-dev `  Run ` npm run start-prod ` 
###  Run `npm run testpm2 ` 
###  Run `npm run start `  
###  Run ` pm2 monit ` 

###  Run ` pm2 start ts-node --name=8032/demo-- -P tsconfig.json src/server.ts ` 

