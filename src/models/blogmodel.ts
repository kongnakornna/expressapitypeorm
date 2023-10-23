import { NextFunction, Request, Response } from "express";
import { knex } from 'knex';
// import * as Knex from 'knex';
interface cmsblog_details {
  idx: number; 
}
export class BlogModel {
  async list(filter: any) {  
    try {
        const idx= filter.idx; 
        var query = await knex('cmsblog_details as c')
        query.select('c.description_short,c.title,c.description_short'); 
        if (idx == null) { }else{
          query.where('c.idx', idx);
        }     
        query.limit(10);
        return query;
    } catch (err) {
      // error handling
    }
  } 
}