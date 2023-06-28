import { DataBase } from '../database/DataBase';
import { StandardSku } from '../database/entity/StandardSku';
import { StandardKitList } from './Lists/StandardKitList';

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

    async getArrayOfKits() {
        const standardSkus: Array<StandardSku> = await this.dataBase.find(StandardSku);
        const standardKitList = new StandardKitList(standardSkus);
        console.log(standardKitList.kitList);
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

