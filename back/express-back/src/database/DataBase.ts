import 'dotenv/config'
import "reflect-metadata";
import { DataSource, EntityTarget } from "typeorm"
import { connectionSource } from './ormconfig';
import { StandardSku } from './entity/StandardSku';
import { Sku } from './entity/Sku';

export class DataBase {
    private AppDataSource: DataSource;

    constructor() {
        this.AppDataSource = connectionSource;
    }

    connectionToDB = async() => {
        try{
            await this.AppDataSource.initialize();
            console.log("Data Source has been initialized!");
        }catch(err){
            throw new Error(`Error during Data Source initialization: `+ err)      
        }
    }

    find = async (Entity: any) => {
        try {
            const res: Array<any> = await this.AppDataSource.manager.find(Entity);
            // const res = this.AppDataSource.getRepository(Entity);
            // const sku = new StandardSku();
            // sku.name = "SC-D5-1-K8-10--";
            // await res.save(sku);            
            // const sku = new StandardSku();
            // sku.name = "SC-D5-1-K8-10--";
            // await skuRepository.save(sku);
            return res;
        }catch(err){
            throw new Error(`Non found entities or non made Data Source initialization`);      
        }

    }
}