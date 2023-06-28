import 'dotenv/config'
import "reflect-metadata";
import { DataSource } from "typeorm"
import { NonstandardSku } from './entity/NonstandardSku';
import { SeedStandartSku1687847696858 } from './migrations/1687847696858-SeedStandartSku';
import { StandardSku } from './entity/StandardSku';
import { SeedNonStandardSku1687932649911 } from './migrations/1687932649911-SeedNonStandardSku';

export const connectionSource = new DataSource({
    type: 'mysql',
    host: process.env.SQL_DB_HOST as string,
    port: parseInt(process.env.SQL_DB_PORT as string, 10) as number,
    username: process.env.SQL_DB_USER as string,
    password: process.env.SQL_DB_PASSWORD as string,
    database: process.env.SQL_DB_DATABASE as string,
    synchronize: true,
    logging: false,
    entities: [ StandardSku,  NonstandardSku],
    migrations: [ SeedStandartSku1687847696858, SeedNonStandardSku1687932649911 ],
});