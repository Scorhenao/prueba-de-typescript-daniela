import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Dialect } from 'sequelize';
import { strUnd } from '../helpers/helperTypes';
import { UserModel } from '../models/userModel';

config({path: resolve(__dirname, "../../.env")});

const dialectDB: Dialect = process.env.DB_DIALECT as Dialect;
const hostDB: strUnd = process.env.DB_HOST;
const passwordDB: strUnd = process.env.DB_PASSWORD;
const nameDB: strUnd = process.env.DB_NAME;

console.log(dialectDB, hostDB, passwordDB, nameDB);


if(!dialectDB || !hostDB || !passwordDB || !nameDB) throw new Error("There aren't all enviroment variables");

const sequelize = new Sequelize({
    dialect: dialectDB,
    host: hostDB,
    username: nameDB,
    password: passwordDB,
    database: nameDB,
    models:[UserModel]
})

export default sequelize;