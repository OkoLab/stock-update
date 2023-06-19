import 'dotenv/config'
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm"
import { Sku } from "./entity/Sku"

const dataSourceOptions = {
    type: 'mysql',
    host: process.env.SQL_DB_HOST as string,
    port: parseInt(process.env.SQL_DB_PORT as string, 10) as number,
    username: process.env.SQL_DB_USER as string,
    password: process.env.SQL_DB_PASSWORD as string,
    database: process.env.SQL_DB_DATABASE as string,
    synchronize: true,
    logging: false,
    entities: [ Sku ],
    migrations: []
} as DataSourceOptions;

// export function test(){
//     console.log(dataSourceOptions.entities);
// }
export const AppDataSource = new DataSource(dataSourceOptions);

// entities: [__dirname + "/entity/*{.js,.ts}"],
// migrations: [__dirname + "/migrations/*{.js,.ts}"]