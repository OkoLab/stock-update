import { Sku } from "src/database/entity/Sku";
import { Kits } from "../Types";

export interface IKitList{
    convertSkuTBL_to_KitsList(skuTable: Array<Sku>):Kits; 
}