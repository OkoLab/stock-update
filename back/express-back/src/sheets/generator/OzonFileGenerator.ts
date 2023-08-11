import { OZONFactory } from "../templates/ozon/OZON"
import { readFile, writeFile, set_fs, utils, WorkBook, WorkSheet } from 'xlsx';
// For Node ESM, fs must be loaded manually
import * as fs from 'fs';
import { NEWAMOUNTS, OZONOPTIONS } from "../Interfaces";
import { getCellAddress, getCellIndex } from "../Modules";
set_fs(fs);

export class OzonFileGenerator {
    protected _workbook: WorkBook;
    private _sheet: WorkSheet;
    protected date:string;
    private _ozon_options: OZONOPTIONS;
    private _name: string;
    private _new_amounts: NEWAMOUNTS;

    constructor(file_name: string, ozon_options: string, new_amounts: NEWAMOUNTS) {
        this._ozon_options = OZONFactory.getOzon(ozon_options).getValues();
        this._workbook = readFile(this._ozon_options.template_name);
        this._sheet = this._workbook.Sheets[this._ozon_options.sheet_name];
        this.date = this.getDate();
        this._name = this._ozon_options.out_path + file_name;
        this._new_amounts = new_amounts;
    }

    getDate(): string {
        const date = new Date();
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes();
    }

    //abstract start(kitList: any, out_file_name: string):any;
    start() {
        try {
            this.fillStockAddress();
            this.fillStockRC();
            this.createWorkBook();
            writeFile(this._workbook, `${this._name}-${this.date}.xlsx`);
        } catch (error) {
            console.error('Error: #21042023926', error);
        }
    }

    private fillStockAddress() {
        let stock_index = getCellIndex(this._ozon_options.stock_address);
        
        for(let item in this._new_amounts) {
            this._sheet[getCellAddress(stock_index)] = {t: 's', v: this._ozon_options.stock_name };
            stock_index.r++;
        }
    }

    // Заполнение обязательных ячеек  
    private fillStockRC() {
        let rc_index = getCellIndex(this._ozon_options.rc_address);
        
        for(let item in this._new_amounts) {
            this._sheet[getCellAddress(rc_index)] = {t: 's', v: this._ozon_options.rc };
            rc_index.r++;
        }
    }

            // начало генерации файла для озона. 
    createWorkBook() {
        // new_amount { product: amount}
        let articall_address = getCellIndex(this._ozon_options.artical_address);
        let amount_address = getCellIndex(this._ozon_options.amount_address);
        
        for(let item in this._new_amounts) {
            this._sheet[getCellAddress(articall_address)] = {t: 's', v: item };
            this._sheet[getCellAddress(amount_address)] = {t: 's', v: this._new_amounts[item] };
            articall_address.r++;
            amount_address.r++;
        }
        
    }
}

    // start(kitList): Object, out_file_name: string {
    //     try {
    //         const name = AON_OZON.OUT_PATH + out_file_name;
    //         this.createWorkBook(new_prices);
    //         const date = this.getDate();
    //         writeFile(this._workbook, `${name}-${date}.xlsx`);
    //     } catch (error) {
    //         console.error('Error: #21042023926', error);
    //     }
    // }

    //     // начало генерации файла для озона. 
    // private createWorkBook(new_prices: Array<Product>, address:string = OZON.ARTICLE_ADDRESS):WorkBook {
    //     let index = getCellIndex(address);
    //     //Берем артикул товара из файла для Озон (конечный)
    //     const sku = this.sheet[address];
        
    //     if(sku === undefined) {
    //         return this.workbook;
    //     }
    //     else {
    //         // Ищем этот артикул в файле исходнике (файл себестоимость). Возвращаем объект {артикул, цена, цена со скидкой}
    //        const product = new_prices.find(c => c.sku.toLowerCase() === sku.v.toLowerCase());
    //        // Если находим, то вставляем новые цены в файл для озона
    //        if(product) {
    //         if(product.price || product.salePrice){
    //             // надо выставить индекс на колонку J price
    //             this.sheet[this.getCellAddressForNewPrice(index.r)] = {t: 's', v: product.price };
    //             this.sheet[this.getCellAddressForNewSale(index.r)] = {t: 's', v: product.salePrice };
    //         }
    //        }

    //        index.r++;
    //        return this.createWorkBook(new_prices, getCellAddress(index));
    //     }
    // }


// export class AONOzonFileGenerator extends OzonFileGenerator {
//     constructor() {
//         super(AON_OZON.TEMPLATE_NAME, AON_OZON.SHEET_NAME);
//     }

//     start(str:string){

//     }
// }

// export class DPIOzonFileGenerator extends OzonFileGenerator {
//     constructor() {
//         super(DPI_OZON.TEMPLATE_NAME, DPI_OZON.SHEET_NAME);
//     }

//     start(str:string){
        
//     }
// }


