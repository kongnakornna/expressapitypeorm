import dotenv from "dotenv";
import "reflect-metadata"; 
const packageJSON = require('../../package.json')
if (process.env.NODE_ENV === "production") {
	dotenv.config();	
	var HOSTDB = process.env.HOST
	var PORTDB = Number(process.env.PORTDB) || Number(3306) || Number(3308)
	var USERSDB = process.env.USERS
	var PASSWORDDB = process.env.PASSWORD
	var DATABASE = process.env.DATABASE
} else {
	dotenv.config({ path: "../.env" });
	var HOSTDB = process.env.HOST_DEV || process.env.HOST_LOCAL
	var PORTDB = Number(process.env.PORTDB) || Number(3306) || Number(3308)
	var USERSDB = process.env.USERS_DEV || process.env.USERS_LOCAL
	var PASSWORDDB = process.env.PASSWORD_DEV || process.env.PASSWORD_LOCAL
	var DATABASE = process.env.DATABASE_DEV || process.env.DATABASE_LOCAL
} 
const knex = require('knex')
/*
module.exports =  async (app: any, opts: any, done: any) => {
  try {
    const connection = await knex(opts.options)
	app.decorate(opts.connectionName, connection)
       done()
      console.log('knex database connection mysql node name:' + opts.connectionName+' db_Name :' + opts.options.connection.database+' host :'+ opts.options.connection.host+' port :'+ opts.options.connection.port)
  } catch (error) {
      done(error)
      console.log('knex database connection error ' + error)
  }
}
 */
const config = {
	client: "mysql",
	connection: {
	  host : HOSTDB,
		  port: Number(PORTDB) || 3306, 		
		  user : USERSDB,
		  password : PASSWORDDB,
		  database : DATABASE,
	},
  };
const db = knex(config);
console.log("knex config", config) 
console.log("knex Mysql isConnection", db) 
module.exports = db;
 
