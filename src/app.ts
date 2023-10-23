import express, { NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import { createConnection } from 'typeorm';
import dotenv from "dotenv";
import "reflect-metadata";
import Routes from "./routes";
/*************************/
const packageJSON = require('../package.json')
if (process.env.NODE_ENV === "production") {
	dotenv.config();	
	var HOSTDB = process.env.HOST
	var PORTDB = Number(process.env.PORTDB) || Number(3306) || Number(3308)
	var USERSDB = process.env.USERS
	var PASSWORDDB = process.env.PASSWORD
	var DATABASE = process.env.DATABASE
} else {
	dotenv.config({ path: ".env" });
	var HOSTDB = process.env.HOST_DEV || process.env.HOST_LOCAL
	var PORTDB = Number(process.env.PORTDB) || Number(3306) || Number(3308)
	var USERSDB = process.env.USERS_DEV || process.env.USERS_LOCAL
	var PASSWORDDB = process.env.PASSWORD_DEV || process.env.PASSWORD_LOCAL
	var DATABASE = process.env.DATABASE_DEV || process.env.DATABASE_LOCAL
} 
/*************************/
const app = express();
// app.use(json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	origin: '*'
}));
app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});
/*************************/
/**/
const knex = require('knex');
const config = {
	client: "mysql",
	connection: {
	  host : HOSTDB,
		  port: Number(PORTDB) || 3306, 		
		  user : USERSDB,
		  password : PASSWORDDB,
		  database : DATABASE,
		},
		pool: { min: 0, max: 7 }
  };
const db = knex(config);
app.use(db);
console.log("knex config", config) 
console.log("knex Mysql isConnection", db) 
/*
/*************************/
createConnection({
	type: "mysql",
	host: HOSTDB,
	port: PORTDB,
	username: USERSDB,
	password: PASSWORDDB,
	database: DATABASE,
	entities: [
		"src/entities/*{.ts,.js}"
	],
	// logging: true,
	// synchronize: true
}).then(connection => {
	console.log("TypeORM isConnection", connection.isConnected) 
}).catch(error => console.log('MySQL isConnection error', error));
/*************************/ 
app.use(`${packageJSON.endPoint}`, Routes); // from  package.json
export default app;