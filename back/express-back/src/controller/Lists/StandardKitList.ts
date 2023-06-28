import { Sku } from "src/database/entity/Sku";
import { KitList } from "../KitList";
import { Kit, Kits } from "../Types";
import { IKitList } from "./IKitList";

//SC-P10-1-K23-5--
export class StandardKitList extends KitList implements IKitList {
    kitList: Kits;
    
    constructor(skuTable: Array<Sku>) {
        super();
        this.kitList = this.convertSkuTBL_to_KitsList(skuTable);
    }

    // [
    //   "SC-P10-321-K6-156--":
    // {
    //     P10:321,
    //     K6:156  
    // }
    // ]
    // получаем объект с обектами артикул: {модель: количество в комплекте, модель: количество в комплекте}
    convertSkuTBL_to_KitsList(skuTable: Array<Sku>):Kits {
        let allKits: Kits = {};
        skuTable.forEach((sku) => {
            // получаем массив строк с совпадениями Модель-Количество в комплекте  
            const models_amounts = sku.name.match(/\w\d+\-\d+/g);
            if (models_amounts) {
                let kit: Kit = {};
                models_amounts.forEach((model_amount) => {
                    let [model, amount] = model_amount.split('-');
                    kit[model] = Number(amount);
                });
                allKits[sku.name] = kit;
            }
        });
        return allKits;
    }
}