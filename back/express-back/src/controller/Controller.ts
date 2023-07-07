import { NonstandardSku } from '../database/entity/NonstandardSku';
import { DataBase } from '../database/DataBase';
import { StandardSku } from '../database/entity/StandardSku';
import { StandardKitList } from './Lists/StandardKitList';
import { NonStandardKitList } from './Lists/NonStandardKitList';
import { Kits } from './Types';

//на выходе должны получить массив с json обектами { name: amount: }

// type Kit = {
//     [model: string]: number;
// }

// type Kits = {
//     [name: string]: Kit;
// }




// async function service() {
//     // получаем массив объектов с артикулами
//     allStandartSku = await getAllStandartSku;
// }

export class Controller {
    dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }

    async init() {
        await this.dataBase.openConnectionToDB();
    }

    async getArrayOfKits(): Promise<Kits> {
        const standardSkus: Array<StandardSku> = await this.dataBase.find(StandardSku);
        const standardKitList = new StandardKitList(standardSkus);
        // console.log("-----------------------------------------------------");
        //console.log(standardKitList.convertSkuTBL_to_KitsList());
        // console.log("-----------------------------------------------------");
        const non_standardSkus: Array<NonstandardSku> = await this.dataBase.find(NonstandardSku);
        const non_standardKitList = new NonStandardKitList(non_standardSkus);
        return Object.assign(standardKitList.convertSkuTBL_to_KitsList(), non_standardKitList.convertSkuTBL_to_KitsList())

        // console.log("-----------------------------------------------------");
        // console.log(non_standardKitList.convertSkuTBL_to_KitsList());
        // console.log("-----------------------------------------------------");
    }

    comparison_filter(kits: Kits, identifier: string, operator: string, quantity: number): Kits {
        let _kits: Kits = {};        
        for (let item in kits) {
            const eval_str = kits[item].identifier + operator + quantity.toString();
            //console.log(kits[item].D5);
            console.log(identifier);
            let comparison = eval(eval_str);

            if (comparison) {
                _kits[item] = kits[item];
                _kits[item].amount = 0;
            }
        }
        return _kits;
    }

    filter(kits: Kits, identifier: string): Kits {
        let _kits: Kits = {};
        for (let item in kits) {
            if (kits[item].hasOwnProperty(identifier)) {
                _kits[item] = kits[item];
                _kits[item].amount = 0;
            }
        }
        return _kits;
    }

    // allStandartSku: Array<Sku>;

    // constructor(skuTable: Array<Sku>) {
    //     this.allStandartSku = skuTable;
    // }

    // // [
    // //   "SC-P10-321-K6-156--":
    // // {
    // //     P10:321,
    // //     K6:156  
    // // }
    // // ]
    // // получаем объект с обектами артикул: {модель: количество в комплекте, модель: количество в комплекте}

    // parseAllStandartSku(){
    //     let allKits: Kits;
    //     this.allStandartSku.forEach((sku) => {
    //         // получаем массив строк с совпадениями Модель-Количество в комплекте  
    //         const models_amounts = sku.name.match(/\w\d+\-\d+/g);
    //         if (models_amounts) {
    //             let kit: Kit = {};
    //             models_amounts.forEach((model_amount) => {
    //                 let [model, amount] = model_amount;
    //                 kit[model] = Number(amount);
    //             })
    //             return allKits[sku.name] = kit;
    //         }

    //         throw Error('Артикулы не найдены');
    //     });
    // }


}

